import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'

/**
 * Seiten-H1 der Unterseiten mit „Schärfe pro Zeile“ (gleiches Prinzip wie die Schärfe-Treppe der Startseite).
 *
 * - Auftritt: jede Zeile (bzw. jedes Wort bei `woerter`) gleitet von links ein: c2-rise 500 ms, Versatz 300 + 120 ms · i.
 * - Schärfe: Nahe am Zeiger wird die SHRP-Achse weich (0), weiter weg scharf (100):
 *   SHRP = round5(100 · clamp((d − 24) / 216, 0, 1)), d = Abstand Zeiger ↔ Zeilenbox. Höchstens alle 60 ms, Übergang 380/600 ms.
 * - Nur mit feinem Zeiger und ohne prefers-reduced-motion. Der Zeiger wird im ganzen Hero-Feld verfolgt (`areaRef`).
 *
 * Desktop (≥ 1024 px): Zeilen wie im Board fest umbrochen (`zeilen`), white-space: nowrap.
 * Mobil: ein Absatz, der frei umbricht (text-wrap: balance). Wörter mit Bindestrich brechen am Bindestrich.
 */
export function SchaerfeTitel({
  zeilen,
  areaRef,
  id,
  className = '',
  woerter = false,
  frei = false,
  mobilGestapelt = false,
  mobilTreppe,
  as: Tag = 'h1',
}: {
  zeilen: readonly ReactNode[]
  areaRef: RefObject<HTMLElement>
  id?: string
  /** Größe, Zeilenhöhe, Farbe usw. (Tailwind), getrennt für mobil und lg: */
  className?: string
  /** Wörter statt Zeilen: Schärfe und Auftritt pro Wort (Plakat-H1 Karriere, Titel aus Daten) */
  woerter?: boolean
  /** Desktop ohne feste Zeilen: Umbruch frei (text-wrap: balance), z. B. Titel aus lib/leistungDetails.ts */
  frei?: boolean
  /** mobil jedes Wort in eigener Zeile (Referenz-Titel „Bär / Schuhe“) */
  mobilGestapelt?: boolean
  /** mobil gestapelt mit Treppen-Einzug in px je Wort (Karriere: 20) */
  mobilTreppe?: number
  as?: 'h1' | 'h2'
}) {
  const teile = useRef<Array<HTMLSpanElement | null>>([])
  const n = zeilen.length
  const voll = useCallback(() => Array.from({ length: n }, () => 100), [n])
  const [sh, setSh] = useState<number[]>(voll)
  const [weich, setWeich] = useState(false)
  const last = useRef(0)
  const timer = useRef<number | null>(null)
  const next = useRef<number[] | null>(null)

  const apply = useCallback(() => {
    timer.current = null
    if (!next.current) return
    last.current = Date.now()
    setSh(next.current)
    setWeich(true)
  }, [])

  useEffect(() => {
    const area = areaRef.current
    if (!area) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduced.matches) return
      next.current = teile.current.slice(0, n).map((el) => {
        if (!el) return 100
        const r = el.getBoundingClientRect()
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
        const d = Math.hypot(dx, dy)
        return Math.round((100 * Math.min(Math.max((d - 24) / 216, 0), 1)) / 5) * 5
      })
      const wait = 60 - (Date.now() - last.current)
      if (wait <= 0) apply()
      else if (timer.current === null) timer.current = window.setTimeout(apply, wait)
    }
    const onLeave = () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = null
      next.current = null
      setSh(voll())
      setWeich(false)
    }
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [areaRef, apply, n, voll])

  return (
    // hyphens-auto: mobil dürfen sehr lange Wörter („benutzerfreundliche“) getrennt werden (html lang kommt aus next i18n)
    <Tag id={id} className={`c2-motion m-0 font-extrabold hyphens-auto [font-variation-settings:'SHRP'_100] lg:hyphens-manual ${frei ? 'text-balance' : 'lg:whitespace-nowrap'} ${className}`}>
      {zeilen.map((z, i) => (
        <span key={i}>
          <span
            ref={(el) => {
              teile.current[i] = el
            }}
            data-c2-shrp=""
            // mobil immer inline, damit lange Komposita am Bindestrich umbrechen können
            className={`${woerter ? (mobilGestapelt || mobilTreppe ? 'block lg:inline-block' : 'lg:inline-block') : 'lg:block'} ${mobilTreppe ? 'pl-[var(--c2-stufe)] lg:pl-0' : ''}`}
            style={{
              ...(mobilTreppe ? ({ '--c2-stufe': `${i * mobilTreppe}px` } as CSSProperties) : {}),
              fontVariationSettings: `'SHRP' ${sh[i] ?? 100}`,
              transition: `font-variation-settings ${weich ? 380 : 600}ms var(--c2-ease-out)`,
              animation: `c2-rise 500ms var(--c2-ease-out) ${woerter ? 300 + Math.min(60 * i, 480) : 300 + 120 * i}ms both`,
            }}
          >
            {z}
          </span>
          {i < n - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}

/** Verzögerung für Lead/Buttons im Hero nach einem Titel mit `n` Zeilen (Board: 300 + 120 · n + 260 ms). */
export function heroFadeDelay(n: number) {
  return 300 + 120 * n + 260
}
