import { useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

/**
 * „Signal-Register“ der Stellenseiten (Desktop, Board „C2plus-ecommlab-Stelle-*“): Karteikarte mit drei Reitern.
 *
 * - WAI-ARIA Tabs: tablist/tab/tabpanel, Klick/Enter/Leertaste, ← → zyklisch, Pos1/Ende, roving tabindex.
 * - Aktiver Reiter: Fläche surface, hebt sich um 6 px (160 ms), Innenrundungen links/rechts 18 px mit Kantenlinie.
 *   Inaktive Reiter: Papier, 6 px tiefer; Hover hebt 3 px.
 * - Karte: min. 560 hoch, Rand 1,5 px --c2-line, Radius 24, Riesenziffer 280 px in Pflaume unten links (ragt 118 px hinaus).
 * - Wechsel: Ziffer gleitet 40 % hoch (320 ms), Text blendet ein (200 ms). Grundzustand ohne Animation.
 */
export type RegisterTab = { titel: string; inhalt: ReactNode }

export function Signalregister({ tabs, idPrefix, labelledBy }: { tabs: RegisterTab[]; idPrefix: string; labelledBy: string }) {
  const [sel, setSel] = useState(0)
  const [wechsel, setWechsel] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const waehle = (i: number, fokus: boolean) => {
    if (i !== sel) {
      setSel(i)
      setWechsel((w) => w + 1)
    }
    if (fokus) refs.current[i]?.focus()
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = tabs.length
    let z: number | null = null
    if (e.key === 'ArrowRight') z = (sel + 1) % n
    else if (e.key === 'ArrowLeft') z = (sel + n - 1) % n
    else if (e.key === 'Home') z = 0
    else if (e.key === 'End') z = n - 1
    if (z === null) return
    e.preventDefault()
    waehle(z, true)
  }

  return (
    <div className="c2-motion relative">
      <div role="tablist" aria-labelledby={labelledBy} onKeyDown={onKey} className="relative -mb-[1.5px] flex gap-[8px] pl-[40px]">
        {tabs.map((t, i) => {
          const aktiv = i === sel
          const y = aktiv ? 0 : hover === i ? 3 : 6
          return (
            <button
              key={t.titel}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${i + 1}`}
              aria-selected={aktiv}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={aktiv ? 0 : -1}
              onClick={() => waehle(i, false)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative inline-flex h-[56px] flex-none items-center gap-[10px] rounded-t-[16px] border-[1.5px] border-b-0 py-0 pl-[14px] pr-[20px]"
              style={{
                zIndex: aktiv ? 3 : 1,
                borderColor: 'var(--c2-line)',
                background: aktiv ? 'var(--c2-surface)' : 'var(--c2-paper)',
                color: 'var(--c2-ink)',
                fontFamily: 'inherit',
                transform: `translateY(${y}px)`,
                transition: 'transform 160ms var(--c2-ease-out), background-color 160ms var(--c2-ease-out)',
              }}
            >
              <span
                aria-hidden
                className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full text-[15px] font-bold leading-none"
                style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)', fontVariantNumeric: 'tabular-nums' }}
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap text-[18px] font-bold leading-none [font-variation-settings:'SHRP'_50]">{t.titel}</span>
              {aktiv ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="absolute bottom-0 left-[-17.5px] block overflow-visible">
                    <path d="M0,18 H18 V0 A18,18 0 0 1 0,18 Z" fill="var(--c2-surface)" />
                    <path d="M16.75,1.25 A16,16 0 0 1 0.75,17.25" fill="none" stroke="var(--c2-line)" strokeWidth="1.5" />
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="absolute bottom-0 right-[-17.5px] block overflow-visible">
                    <path d="M18,18 H0 V0 A18,18 0 0 0 18,18 Z" fill="var(--c2-surface)" />
                    <path d="M1.25,1.25 A16,16 0 0 0 17.25,17.25" fill="none" stroke="var(--c2-line)" strokeWidth="1.5" />
                  </svg>
                </>
              ) : null}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${idPrefix}-panel`}
        aria-labelledby={`${idPrefix}-tab-${sel + 1}`}
        tabIndex={0}
        className="relative z-[2] min-h-[560px] overflow-hidden rounded-[24px] border-[1.5px] p-[28px]"
        style={{ borderColor: 'var(--c2-line)', background: 'var(--c2-surface)' }}
      >
        <span
          key={`ziffer-${wechsel}`}
          aria-hidden
          className="absolute bottom-[-118px] left-[28px] text-[280px] font-extrabold leading-none tracking-[-0.03em] [font-variation-settings:'SHRP'_100]"
          style={{ color: 'var(--c2-pflaume)', fontVariantNumeric: 'tabular-nums', animation: wechsel ? 'c2-ziffer 320ms var(--c2-ease-out) both' : 'none' }}
        >
          {sel + 1}
        </span>
        <div key={`text-${wechsel}`} className="relative min-h-[501px]" style={{ animation: wechsel ? 'c2-fade 200ms var(--c2-ease-out) both' : 'none' }}>
          {tabs[sel].inhalt}
        </div>
      </div>
    </div>
  )
}
