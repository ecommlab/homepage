import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * ConsentOK-Runtime über die eigene Domain (/consentok/cs.js → hierher, siehe
 * next.config.js). Der Browser nutzt die Verbindung der Seite weiter, statt
 * eine neue zu consentok.eu aufzubauen — auf mobilen Netzen spart das mehrere
 * hundert Millisekunden „Rendering blockiert“.
 *
 * Eigene Route statt reinem Proxy: So bestimmen WIR die Cache-Dauer. Ein
 * Proxy reicht die Header von consentok.eu durch (Edge 1 Stunde), und dessen
 * Cache-Leerung beim Veröffentlichen erreicht die Cloudflare-Zone von
 * ecommlab.io nicht. Mit 5 Minuten kommen Banner-Änderungen zügig an.
 *
 * Kopie im Prozess, 60 s frisch, danach Nachfrage mit ETag. Ist consentok.eu
 * nicht erreichbar, bleibt die letzte Kopie im Einsatz; ohne Kopie leiten wir
 * auf das Original um, damit das Banner nie fehlt.
 */
const HOST = 'https://consentok.eu'
const FRISCH_MS = 60_000

type Kopie = { body: string; etag: string; zeit: number }
const kopien = new Map<string, Kopie>()

export default async function consentokCs(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id ?? '')
  if (!/^[A-Za-z0-9]{16}$/.test(id)) {
    res.status(400).setHeader('Content-Type', 'application/javascript; charset=utf-8').send('/* consentok: ungültiger Schlüssel */\n')
    return
  }
  const jetzt = Date.now()
  let kopie = kopien.get(id)
  if (!kopie || jetzt - kopie.zeit > FRISCH_MS) {
    try {
      const r = await fetch(`${HOST}/cs.js?id=${id}`, {
        headers: kopie ? { 'If-None-Match': kopie.etag } : {},
        signal: AbortSignal.timeout(3000),
      })
      if (r.status === 304 && kopie) {
        kopie.zeit = jetzt
      } else if (r.ok) {
        const body = await r.text()
        if (body.startsWith('/*! consentok')) {
          kopie = { body, etag: r.headers.get('etag') ?? '', zeit: jetzt }
          kopien.set(id, kopie)
        }
      }
    } catch {
      // consentok.eu nicht erreichbar — letzte Kopie weiter nutzen.
    }
  }
  if (!kopie) {
    res.redirect(307, `${HOST}/cs.js?id=${id}`)
    return
  }
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600')
  if (kopie.etag) res.setHeader('ETag', kopie.etag)
  if (kopie.etag && req.headers['if-none-match'] === kopie.etag) {
    res.status(304).end()
    return
  }
  res.status(200).send(kopie.body)
}
