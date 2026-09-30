import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Desktop-Hauptnavigation im Farbfeld mit „Reiter“: Unter dem Punkt, auf dem Zeiger oder Fokus liegt,
 * fährt eine Papier-Lasche aus der Feldoberkante (78 px hoch, unten 16 px gerundet, oben 12-px-Innenrundungen)
 * – Board C2plus: Lasche = Linkbreite + 2 × 12 px –
 * und gleitet beim Wechsel zum Nachbarn (left/width 240 ms), statt neu einzufahren.
 * Einfahren 180 ms, Ausfahren 160 ms, ease-out. Linktext auf der Lasche immer Tinte.
 *
 * Unterseiten: `active` = href des aktuellen Bereichs. Der Reiter steht dann in Ruhe unter diesem Punkt,
 * gleitet bei Hover zum Nachbarn und beim Verlassen zurück. Übersichtsseiten `aktivTyp="page"`, Detailseiten `"true"`.
 * Bis zur ersten Messung (SSR, vor der Hydration) zeichnet der aktive Link seinen Reiter selbst (statisch, gleiche Geometrie).
 *
 * Voraussetzung: Die Navigation sitzt `topOffset` px unter der Feldoberkante (Board: 26 px) und das Feld hat overflow:hidden.
 */
export type ReiterItem = { href: string; label: string }

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function ReiterNav({
  items,
  active,
  aktivTyp = 'page',
  topOffset = 26,
  ariaLabel,
  textFarbe = 'var(--c2-field-text)',
}: {
  items: ReiterItem[]
  active?: string
  aktivTyp?: 'page' | 'true'
  topOffset?: number
  ariaLabel: string
  /** Linkfarbe neben dem Reiter: Orchidee 'var(--c2-field-text)', Tinte/Pflaume 'var(--c2-on-ink)' */
  textFarbe?: string
}) {
  const navRef = useRef<HTMLElement>(null)
  const [hover, setHover] = useState<{ x: number; w: number; href: string } | null>(null)
  const [gleit, setGleit] = useState(false)
  const [ruhe, setRuhe] = useState<{ x: number; w: number } | null>(null)
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  const measure = (el: HTMLElement) => ({ x: el.offsetLeft - 12, w: el.offsetWidth + 24 })

  const beschriftung = items.map((it) => it.label).join('\0')

  useIsoLayoutEffect(() => {
    if (!active) return
    const messen = () => {
      if (activeRef.current) setRuhe(measure(activeRef.current))
    }
    messen()
    window.addEventListener('resize', messen)
    document.fonts?.ready.then(messen).catch(() => undefined)
    return () => window.removeEventListener('resize', messen)
  }, [active, beschriftung])

  const show = (el: HTMLElement, href: string) => {
    setGleit(hover !== null || Boolean(ruhe))
    setHover({ ...measure(el), href })
  }
  const pos = hover ?? ruhe
  const sichtbar = Boolean(pos)
  const aufReiter = hover?.href ?? active

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className="c2-motion relative flex items-center gap-[28px]"
      onMouseLeave={() => setHover(null)}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node | null)) setHover(null)
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute z-0 block rounded-b-[16px]"
        style={{
          top: -topOffset,
          height: 78,
          left: pos?.x ?? 0,
          width: pos?.w ?? 0,
          background: 'var(--c2-paper)',
          transform: `translateY(${sichtbar ? 0 : -78}px)`,
          transition: `${sichtbar && gleit ? 'left 240ms var(--c2-ease-out), width 240ms var(--c2-ease-out), ' : ''}transform ${sichtbar ? 180 : 160}ms var(--c2-ease-out)`,
        }}
      >
        <Innenecken />
      </span>
      {items.map((it) => {
        const istAktiv = it.href === active
        return (
          <Link
            key={it.href}
            href={it.href}
            ref={istAktiv ? activeRef : undefined}
            aria-current={istAktiv ? aktivTyp : undefined}
            onMouseEnter={(e) => show(e.currentTarget, it.href)}
            onFocus={(e) => show(e.currentTarget, it.href)}
            className="relative z-[1] inline-flex min-h-[44px] items-center text-[16px] font-medium leading-none no-underline"
            // Auf der Papier-Lasche Tinte (kippt im Dunkelmodus mit dem Papier), sonst Feldtext
            style={{ color: it.href === aufReiter ? 'var(--c2-ink)' : textFarbe, transition: 'color 120ms var(--c2-ease-out) 60ms' }}
          >
            {istAktiv && !ruhe ? (
              <span
                aria-hidden
                className="pointer-events-none absolute -left-[12px] -right-[12px] -z-[1] block h-[78px] rounded-b-[16px]"
                // Der Link ist 44 px hoch und beginnt an der Oberkante der Navigation → Feldkante liegt topOffset darüber
                style={{ top: -topOffset, background: 'var(--c2-paper)' }}
              >
                <Innenecken />
              </span>
            ) : null}
            {it.label}
          </Link>
        )
      })}
    </nav>
  )
}

function Innenecken() {
  return (
    <>
      <span className="absolute -left-[12px] top-0 block h-[12px] w-[12px]" style={{ background: 'radial-gradient(circle at 0 100%, transparent 11.5px, var(--c2-paper) 12px)' }} />
      <span className="absolute -right-[12px] top-0 block h-[12px] w-[12px]" style={{ background: 'radial-gradient(circle at 100% 100%, transparent 11.5px, var(--c2-paper) 12px)' }} />
    </>
  )
}
