import fs from 'node:fs'
import path from 'node:path'

/**
 * Pfad der kyrillischen Geologica-Datei – nur für den Preload auf bulgarischen Seiten (pages/_document.tsx).
 *
 * next/font lädt nur die in lib/fonts.ts genannten Schnitte vor (latin, latin-ext), und zwar auf jeder Seite.
 * Die kyrillische Datei steht zwar im CSS (unicode-range), der Browser entdeckt sie aber erst, wenn er
 * kyrillischen Text setzen will: Auf /bg erschiene die ganze Seite zuerst in der Ersatzschrift und spränge dann um.
 * 'cyrillic' in lib/fonts.ts einzutragen würde die Datei auch auf den deutschen und englischen Seiten vorladen.
 * Deshalb hier: Datei aus dem gebauten CSS lesen und nur auf /bg vorladen. next/font gibt den Dateinamen
 * (Inhalts-Hash) nicht heraus; findet sich nichts (z. B. im Dev-Server), entfällt der Preload einfach.
 */
let gefunden: string | null = null

export function kyrillischeSchriftdatei(): string | null {
  if (gefunden) return gefunden
  try {
    const dir = path.join(process.cwd(), '.next', 'static', 'css')
    for (const datei of fs.readdirSync(dir)) {
      const css = fs.readFileSync(path.join(dir, datei), 'utf8')
      for (const block of css.match(/@font-face\{[^}]*\}/g) ?? []) {
        // Grundbereich Kyrillisch (U+0400–045F); „cyrillic-ext“ beginnt bei U+0460 und ist für Bulgarisch nicht nötig.
        if (!/unicode-range:[^;}]*u\+0400-045f/i.test(block)) continue
        const m = block.match(/url\((\/_next\/static\/media\/[^)]+\.woff2)\)/)
        if (m) return (gefunden = m[1])
      }
    }
  } catch {
    // kein gebautes CSS vorhanden – ohne Preload weiter
  }
  return null
}
