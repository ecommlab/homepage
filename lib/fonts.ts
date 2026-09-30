import { Geologica } from 'next/font/google'

/**
 * Geologica – variabel (wght 100–900) plus Schärfe-Achse SHRP (0–100).
 *
 * Über next/font selbst gehostet: Zur Laufzeit geht kein Aufruf an Google (DSGVO; passt zu Cookiebot/ConsentOK).
 * Ohne `weight` liefert next/font die variable Fassung; `axes: ['SHRP']` lädt die Schärfe-Achse zusätzlich.
 *
 * Einbinden in pages/_app.tsx:
 *   import { geologica } from '../lib/fonts'
 *   <div className={geologica.variable}> … </div>   (oder am <html> über _document)
 * und in tailwind.config.js:  fontFamily.c2 = ['var(--font-geologica)', 'Avenir Next', 'Segoe UI', 'system-ui', 'sans-serif']
 */
export const geologica = Geologica({
  subsets: ['latin', 'latin-ext'],
  axes: ['SHRP'],
  variable: '--font-geologica',
  display: 'swap',
  // next/font kennt für Geologica keine Fallback-Metriken („Failed to find font override values“) → Anpassung aus, sonst Fehlermeldung im Build
  adjustFontFallback: false,
})
