import { Fragment } from 'react'
import type { ReactNode } from 'react'

/**
 * Satzregeln der C2-Unterseiten – genau die Korrekturen, die das Canvas gegenüber den Repo-Daten anwendet.
 * Die Datendateien (lib/leistungDetails.ts, lib/portfolioCases.ts, lib/jobs.ts …) bleiben unverändert;
 * korrigiert wird beim Anzeigen.
 *
 * 1. U+2011 (geschützter Bindestrich) → normaler Bindestrich: Geologica hat kein eigenes Zeichen dafür.
 *    Damit Komposita trotzdem zusammenbleiben, schützt <Fliesstext> sie mit white-space: nowrap.
 * 2. Rechtschreibung/Stil (DE): Marketing-Integration, Tracking-Integration, Marketing-Automation, Scrum,
 *    Giftcard-Management-System, „von der ersten Interaktion“, „; entwirf“, „z. B.“ (mit geschütztem Leerzeichen).
 * 3. Gedankenstriche hängen mit geschütztem Leerzeichen am vorigen Wort.
 */
const ERSETZUNGEN: ReadonlyArray<[string, string]> = [
  ['\u2011', '-'],
  ['Marketing Integration', 'Marketing-Integration'],
  ['Tracking Integration', 'Tracking-Integration'],
  ['Marketing Automation', 'Marketing-Automation'],
  ['SCRUM', 'Scrum'],
  ['Giftcard Management System', 'Giftcard-Management-System'],
  ['von den ersten Interaktion', 'von der ersten Interaktion'],
  ['; Entwerfe ', '; entwirf '],
  ['z.B.', 'z.\u00a0B.'],
  // Stellentitel: „Developer“ großgeschrieben (Board)
  [' developer (m/w/d)', ' Developer (m/w/d)'],
  // Gedankenstrich bleibt beim vorigen Wort (keine Zeile beginnt mit „–“)
  [' – ', '\u00a0– '],
  [' — ', '\u00a0— '],
]

export function satz(text: string): string {
  let t = text
  for (const [a, b] of ERSETZUNGEN) t = t.split(a).join(b)
  return t
}

/** Systemnamen, die in Referenz-Keyfacts fett gesetzt werden (Board: font-weight 600), längste zuerst. */
const FETT = [
  'Microsoft Dynamics NAV', 'Amazon Pay', 'Cloudflare', 'Varnish', 'Redis', 'OpCache', 'Google Tag Manager',
  'Google Analytics Enhanced Ecommerce', 'Google', 'Facebook', 'Instagram', 'Criteo', 'Cleverreach', 'Idealo',
  'Mailchimp', 'Awin', 'Consors Finanz', 'HIW', 'Elastic Search', 'Klarna', 'PayOne', 'PayPal Checkout', 'PayPal',
  'Brickfox', 'Pixi', 'Futura', 'Findologic', 'Plentymarkets', 'Roqqio ERP', 'Heidelpay', 'SAP Emarsys',
  'Magento 2 Commerce', 'Magento 2', 'Shopware', 'Pingdom', 'Tideways',
].sort((a, b) => b.length - a.length)

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const FETT_RE = new RegExp(`(${FETT.map(esc).join('|')})`, 'g')
/** Komposita mit Bindestrich (E-Commerce, UX/UI-Strategien, Online-Shop-Entwicklung …) */
// ohne Lookbehind (ältere Safari-Versionen kennen ihn nicht)
const KOMPOSITUM_RE = /([\p{L}\p{N}/]+(?:-[\p{L}\p{N}/]+)+)/gu

/** Komposita bis 20 Zeichen bleiben zusammen; längere („Giftcard-Management-System“) dürfen am Bindestrich umbrechen. */
const MAX_GESCHUETZT = 20

function schuetzen(text: string, key: string): ReactNode[] {
  return text.split(KOMPOSITUM_RE).map((teil, i) =>
    i % 2 === 1 && teil.length <= MAX_GESCHUETZT ? (
      <span key={`${key}-${i}`} className="whitespace-nowrap">
        {teil}
      </span>
    ) : (
      <Fragment key={`${key}-${i}`}>{teil}</Fragment>
    ),
  )
}

/**
 * Fließtext nach den C2-Satzregeln: Korrekturen, Komposita zusammenhalten, optional Systemnamen fett.
 * Für Überschriften NICHT verwenden – dort sollen lange Komposita (mobil) am Bindestrich umbrechen dürfen.
 */
export function Fliesstext({ text, fett = false }: { text: string; fett?: boolean }) {
  const t = satz(text)
  if (!fett) return <>{schuetzen(t, 'k')}</>
  return (
    <>
      {t.split(FETT_RE).map((teil, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-semibold">
            {teil}
          </span>
        ) : (
          <Fragment key={i}>{schuetzen(teil, `f${i}`)}</Fragment>
        ),
      )}
    </>
  )
}

/**
 * Ein Wort einer großen Überschrift: Komposita mit Ein-Buchstaben-Präfix („E-Commerce“, „E-Mail“) bleiben zusammen,
 * längere Komposita dürfen mobil am Bindestrich umbrechen („E-Commerce-|Lösungen“).
 */
export function TitelWort({ wort }: { wort: string }) {
  const teile = wort.split(/(\p{Lu}-\p{L}+)/u)
  return (
    <>
      {teile.map((t, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {t}
          </span>
        ) : (
          <Fragment key={i}>{t}</Fragment>
        ),
      )}
    </>
  )
}
