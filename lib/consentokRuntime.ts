/**
 * Kopie der ConsentOK-Runtime (cs.js) im Prozess — gemeinsam genutzt von
 * pages/_document.tsx (inline im HTML) und pages/api/consentok-cs.ts
 * (externes Skript als Rückfall).
 *
 * Warum inline: Das Skript muss vor dem ersten Paint laufen (Banner und
 * Consent-Mode-Vorgaben gehören zum ersten Bild), darum stand es synchron im
 * <head> — und war damit die teuerste render-blockierende Anfrage der Seite
 * (Lighthouse mobil: ~500–800 ms). Eingebettet kostet es nur noch seine
 * Bytes (~16 KB gzip), keinen Round-Trip und keine Priorisierung. Die
 * ConsentOK-Plugins für Shops betten das Skript aus demselben Grund inline
 * ein; der Banner-Build stellt sicher, dass es keine HTML-gefährlichen
 * Folgen (</script, <!--) enthält.
 *
 * Frische: 60 s, danach Nachfrage mit ETag. Statische Seiten erhalten die
 * Kopie über ISR (lib/isr.ts, alle fünf Minuten im Hintergrund), serverseitig
 * gerenderte Seiten beim Rendern. Ist consentok.eu nicht erreichbar, bleibt
 * die letzte Kopie im Einsatz.
 */
// CONSENTOK_HOST nur für lokale Messungen gegen eine selbst gebaute Runtime.
const HOST = process.env.CONSENTOK_HOST || 'https://consentok.eu'
const FRISCH_MS = 60_000
const ABRUF_TIMEOUT_MS = 3000

export type Kopie = { body: string; etag: string; zeit: number }
const kopien = new Map<string, Kopie>()
const laufend = new Map<string, Promise<void>>()

export function istSiteKey(id: string): boolean {
  return /^[A-Za-z0-9]{16}$/.test(id)
}

async function abrufen(id: string): Promise<void> {
  const kopie = kopien.get(id)
  try {
    const r = await fetch(`${HOST}/cs.js?id=${id}`, {
      headers: kopie ? { 'If-None-Match': kopie.etag } : {},
      signal: AbortSignal.timeout(ABRUF_TIMEOUT_MS),
    })
    if (r.status === 304 && kopie) {
      kopie.zeit = Date.now()
    } else if (r.ok) {
      const body = await r.text()
      if (body.startsWith('/*! consentok')) {
        kopien.set(id, { body, etag: r.headers.get('etag') ?? '', zeit: Date.now() })
      }
    }
  } catch {
    // consentok.eu nicht erreichbar — letzte Kopie weiter nutzen.
  }
}

/** Abruf höchstens einmal gleichzeitig je Schlüssel. */
function erneuern(id: string): Promise<void> {
  let p = laufend.get(id)
  if (!p) {
    p = abrufen(id).finally(() => laufend.delete(id))
    laufend.set(id, p)
  }
  return p
}

/**
 * Liefert die Kopie. Ist sie älter als FRISCH_MS, wird erst erneuert (höchstens
 * ABRUF_TIMEOUT_MS; scheitert der Abruf, bleibt die alte Kopie). Warten statt
 * Hintergrund-Erneuerung, weil der Aufrufer bei statischen Seiten die
 * ISR-Neuerzeugung ist — die rendert im Hintergrund und würde mit einer
 * sofort gelieferten alten Kopie genau das HTML erzeugen, das die nächsten
 * fünf Minuten liegt. null nur, wenn es keine Kopie gibt und der Abruf
 * scheitert.
 */
export async function consentokRuntime(id: string): Promise<Kopie | null> {
  if (!istSiteKey(id)) return null
  const kopie = kopien.get(id)
  if (!kopie || Date.now() - kopie.zeit > FRISCH_MS) await erneuern(id)
  return kopien.get(id) ?? null
}

/**
 * Darf der Text ungeschützt in ein <script> im HTML? Der HTML-Parser kennt
 * keinen JavaScript-Kontext: „</script“ beendet das Skript, „<!--“ öffnet
 * einen Kommentar-Sonderfall. ConsentOK prüft das beim Build, wir prüfen es
 * trotzdem — und fallen sonst auf das externe Tag zurück.
 */
export function inlineSicher(body: string): boolean {
  const s = body.toLowerCase()
  return !s.includes('</script') && !s.includes('<!--') && !s.includes('<script')
}
