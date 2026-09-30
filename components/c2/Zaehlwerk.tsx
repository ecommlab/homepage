import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Zählwerk für „15+“ und „300+“ (Sektion „Was machen wir“).
 *
 * Ruhezustand (SSR, ohne JS, prefers-reduced-motion): die echte Zahl steht einfach da – identisch zur Referenz.
 *
 * Desktop (≥ 1024 px) – wie Board C2plus-ecommlab:
 *   Linie 2 px OBEN (absolut, Abstand zur Zahl 22 px) · Zahl 112 px / −0,03em · 10 px · Beschriftung 18/22 px.
 *   Animation: jede Ziffer rollt einmal durch 0–9 und rastet ein (c2-roll), Linie zieht auf (c2-linie 400 ms, Stanz-Kurve),
 *   „+“ stempelt (c2-plus 260 ms, Snap-Kurve, ab 1300 ms). Hover/Fokus spielt es erneut ab (frühestens nach 1500 ms).
 * Mobil (< 1024 px) – wie Board C2m-ecommlab:
 *   Zahl 64 px / −0,04em · Linie 3 px DARUNTER (10 px Abstand) · 10 px · Beschriftung 15 px / 1,3.
 *   Animation: keine Ziffernrolle; Linie zieht auf (600 ms, ab 400 ms), „+“ erscheint (260 ms, ab 900 ms).
 *
 * Ausgelöst, sobald die Zahl zur Hälfte sichtbar ist (IntersectionObserver).
 * Werte aus dem Board:  15 → durations [1000, 900],       starts [320, 200],      offset 0
 *                      300 → durations [1100, 1000, 900], starts [560, 440, 320], offset 120
 */
export type ZaehlwerkProps = {
  value: number
  label: ReactNode
  durations: number[]
  starts: number[]
  offset?: number
  className?: string
  /** Zusatzklassen der Zahl, z. B. Farbe im Tintenfeld (Referenzen: Desktop Orchidee) */
  zahlKlasse?: string
  /** Ersetzt die Klassen der Linie (Referenzen: Desktop 1 px #3A322A, mobil 180 px breit) */
  linieKlasse?: string
  /** Zusatzklassen der Beschriftung */
  labelKlasse?: string
  /** Kleine Zeile über der Zahl (Team: „Über“) */
  vorsatz?: string
  /** „+“ hinter der Zahl (Standard) – Team: ohne */
  plus?: boolean
  /** Vorlesetext statt „<Zahl>+“ (z. B. der ganze Satz) */
  srText?: string
}

type Lauf = { n: number; desktop: boolean }

const LINIE = 'order-2 mt-[10px] block h-[3px] lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:mt-0 lg:h-[2px]'

export function Zaehlwerk({
  value,
  label,
  durations,
  starts,
  offset = 0,
  className = '',
  zahlKlasse = '',
  linieKlasse = LINIE,
  labelKlasse = '',
  vorsatz,
  plus = true,
  srText,
}: ZaehlwerkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [lauf, setLauf] = useState<Lauf>({ n: 0, desktop: true })
  const lastRun = useRef(0)
  const digits = String(value).split('').map(Number)

  const trigger = (nurDesktop: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    if (nurDesktop && !desktop) return
    const now = Date.now()
    if (now - lastRun.current < 1500) return
    lastRun.current = now
    setLauf((l) => ({ n: l.n + 1, desktop }))
  }

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trigger(false)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
    // trigger liest nur Refs und matchMedia; bewusst nur beim Mount beobachten
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const an = lauf.n > 0
  const d = lauf.desktop
  const linieAnim = !an ? 'none' : d ? `c2-linie 400ms var(--c2-ease-stanz) ${offset}ms both` : 'c2-linie 600ms var(--c2-ease-out) 400ms both'
  const plusAnim = !an ? 'none' : d ? `c2-plus 260ms var(--c2-ease-snap) ${1300 + offset}ms both` : 'c2-plus 260ms var(--c2-ease-out) 900ms both'

  return (
    <div
      ref={ref}
      className={`c2-motion relative flex flex-col lg:pt-[22px] ${className}`}
      onMouseEnter={() => trigger(true)}
      onFocus={() => trigger(true)}
    >
      {/* Linie: mobil unter der Zahl (order-2), Desktop oben absolut */}
      <span
        key={`linie-${lauf.n}`}
        aria-hidden
        className={linieKlasse}
        style={{ background: 'currentColor', transformOrigin: '0 50%', animation: linieAnim }}
      />
      {vorsatz ? (
        <p aria-hidden className="order-1 m-0 text-[18px] font-semibold leading-[22px]">
          {vorsatz}
        </p>
      ) : null}
      <p
        className={`order-1 m-0 whitespace-nowrap ${vorsatz ? 'mt-[4px]' : ''} text-[64px] font-extrabold leading-none tracking-[-0.04em] lg:text-[112px] lg:tracking-[-0.03em] ${zahlKlasse}`}
        style={{ fontVariationSettings: "'SHRP' 100", fontVariantNumeric: 'tabular-nums' }}
      >
        <span className="sr-only">{srText ?? `${value}${plus ? '+' : ''}`}</span>
        <span aria-hidden className="inline-flex align-top">
          {digits.map((z, i) => (
            <span key={`${i}-${lauf.n}`} className="inline-block overflow-hidden align-top" style={{ height: '1em' }}>
              <span
                className="flex flex-col"
                style={
                  {
                    lineHeight: '1em',
                    '--c2-roll-from': `${-z}em`,
                    '--c2-roll-to': `${-(z + 10)}em`,
                    transform: `translateY(${-(z + 10)}em)`,
                    animation: an && d ? `c2-roll ${durations[i]}ms var(--c2-ease-out) ${starts[i]}ms both` : 'none',
                  } as CSSProperties
                }
              >
                {Array.from({ length: 20 }, (_, k) => (
                  <span key={k}>{k % 10}</span>
                ))}
              </span>
            </span>
          ))}
          {plus ? (
            <span key={`plus-${lauf.n}`} className="inline-block" style={{ animation: plusAnim, ...(d ? {} : { '--c2-plus-y': '-10px' }) } as CSSProperties}>
              +
            </span>
          ) : null}
        </span>
      </p>
      <p aria-hidden={srText ? true : undefined} className={`order-3 m-0 mt-[10px] text-[15px] font-semibold leading-[1.3] lg:text-[18px] lg:leading-[22px] ${labelKlasse}`}>
        {label}
      </p>
    </div>
  )
}
