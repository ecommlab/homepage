import type { CSSProperties, ReactNode } from 'react'
import { useId } from 'react'

/**
 * C2-Farbfeld mit Papier-„Etikett“ oben links (Familiensignatur).
 *
 * Reines CSS (tokens.css: .c2-field, .c2-tab, .c2-stanz): funktioniert serverseitig, braucht keine Messung
 * und wächst mit dem Inhalt. Das Etikett ist so breit wie sein Inhalt + Innenabstand, dadurch passt es für DE und EN.
 * Das Feld hat oben links bewusst den Radius 0 – das Etikett deckt die Ecke ab.
 *
 * Referenzmaße (Desktop ≥ 1024 / mobil):
 *   Hero + Fuß (Logo 160 / 124 px):  h 96 / 64 · pl 64 / 16 · pr 40 / 16   → 264 × 96 / 156 × 64
 *   Rubrik-Etiketten (Text 16 / 13 px, 600):  h 64 / 44 · pl 64 / 20 · pr 40 / 32
 */
export type EtikettMass = { h: number; pl: number; pr: number }

export type EtikettFeldProps = {
  /** Feldfarbe, z. B. 'var(--c2-orchid)' oder 'var(--c2-ink-field)' */
  color: string
  /** Textfarbe im Feld: 'var(--c2-field-text)' (Orchidee) oder 'var(--c2-on-ink)' (Tinte) */
  textColor: string
  /** Tintenfeld: Körnung hell (screen) statt dunkel (multiply), Kante im Dunkelmodus */
  dark?: boolean
  /** Etikett mobil / ab 1024 px */
  tab: EtikettMass
  tabLg?: EtikettMass
  /** Stanz-Auftakt beim Laden (nur Hero) */
  stanz?: boolean
  /** Etikett gibt 8 px nach (Hover/Fokus auf dem Logo) – vom Aufrufer gesteuert */
  lasche?: boolean
  /** Etikett nur ab 1024 px; mobil ein rundum gerundetes Feld ohne Etikett (Unterseiten-Tintenfelder) */
  tabNurLg?: boolean
  /** Inhalt des Etiketts (Logo oder Rubrik-Label) */
  etikett: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: 'section' | 'div' | 'footer'
  id?: string
  'aria-labelledby'?: string
}

export function EtikettFeld({
  color,
  textColor,
  dark = false,
  tab,
  tabLg,
  stanz = false,
  lasche = false,
  tabNurLg = false,
  etikett,
  children,
  className = '',
  style,
  as: Tag = 'div',
  id,
  'aria-labelledby': labelledBy,
}: EtikettFeldProps) {
  const vars = {
    '--c2-tab-h': `${tab.h}px`,
    '--c2-tab-pl': `${tab.pl}px`,
    '--c2-tab-pr': `${tab.pr}px`,
    ...(tabLg ? { '--c2-tab-h-lg': `${tabLg.h}px`, '--c2-tab-pl-lg': `${tabLg.pl}px`, '--c2-tab-pr-lg': `${tabLg.pr}px` } : {}),
    background: color,
    color: textColor,
    boxShadow: dark ? 'inset 0 0 0 1.5px var(--c2-ink-field-border)' : undefined,
    ...style,
  } as CSSProperties

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-lasche={lasche ? 'true' : 'false'}
      data-tab-nur-lg={tabNurLg ? 'true' : undefined}
      className={`c2-field c2-motion ${className}`}
      style={vars}
      {...(dark ? { 'data-dark': '' } : { 'data-auf-farbe': '' })}
    >
      <Koernung dark={dark} opacity={dark ? 0.1 : 0.12} className="z-0" />
      <div className="c2-tab">
        {stanz ? <span aria-hidden className="c2-stanz" style={{ background: color }} /> : null}
        <div className="c2-tab-inhalt">{etikett}</div>
      </div>
      <div className="relative z-[2]">{children}</div>
    </Tag>
  )
}

/**
 * Körnung: 160-px-Kachel aus feTurbulence (einmal gerendert, dann gekachelt).
 * Tinte + multiply auf Papier/Farbe, Papier + screen auf Tinte. Liegt absolut über dem Elternelement (position: relative nötig).
 */
export function Koernung({ dark = false, opacity, className = 'z-0' }: { dark?: boolean; opacity: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  const [r, g, b] = dark ? ['.957', '.933', '.898'] : ['.122', '.102', '.082']
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
      style={{ mixBlendMode: dark ? 'screen' : 'multiply', opacity }}
    >
      <defs>
        <filter id={`${id}-f`} filterUnits="userSpaceOnUse" x="0" y="0" width="160" height="160">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values={`0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 .55 0`} />
        </filter>
        <pattern id={`${id}-p`} patternUnits="userSpaceOnUse" width="160" height="160">
          <rect width="160" height="160" fill="#FFFFFF" filter={`url(#${id}-f)`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-p)`} />
    </svg>
  )
}
