import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Hero-H1 „Create. Inspire. Perform.“ als Treppe.
 *
 * - Auftritt: jedes Wort gleitet von links ein (c2-rise 500 ms, 300/420/540 ms Versatz; Weg 24 px Desktop / 16 px mobil über --c2-rise-x).
 * - Schärfe: Nahe am Zeiger wird die SHRP-Achse der Geologica weich (0), weiter weg scharf (100).
 *   Abstand wird live zu jeder Wortbox gemessen:  SHRP = round5(100 · clamp((d − 24) / 216, 0, 1)).
 *   Aktualisierung höchstens alle 60 ms; Übergang 380 ms (beim Verlassen 600 ms) ease-out.
 * - Nur mit feinem Zeiger (hover: hover, pointer: fine) und ohne prefers-reduced-motion.
 * - Der Satz verschiebt sich nie (nur font-variation-settings ändert sich; Geologica hält die Laufweite).
 *
 * `areaRef` ist das Element, in dem der Zeiger verfolgt wird (im Board: das ganze Hero-Feld).
 */
const WORDS = ['Create.', 'Inspire.', 'Perform.'] as const

export function SchaerfeTreppe({ areaRef, id = 'c2-hero-title' }: { areaRef: RefObject<HTMLElement>; id?: string }) {
  const spans = useRef<Array<HTMLSpanElement | null>>([])
  const [sh, setSh] = useState<[number, number, number]>([100, 100, 100])
  const [weich, setWeich] = useState(false)
  const last = useRef(0)
  const timer = useRef<number | null>(null)
  const next = useRef<[number, number, number] | null>(null)

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
      const vals = spans.current.map((el) => {
        if (!el) return 100
        const r = el.getBoundingClientRect()
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
        const d = Math.hypot(dx, dy)
        return Math.round((100 * Math.min(Math.max((d - 24) / 216, 0), 1)) / 5) * 5
      }) as [number, number, number]
      next.current = vals
      const wait = 60 - (Date.now() - last.current)
      if (wait <= 0) apply()
      else if (timer.current === null) timer.current = window.setTimeout(apply, wait)
    }
    const onLeave = () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = null
      next.current = null
      setSh([100, 100, 100])
      setWeich(false)
    }
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [areaRef, apply])

  return (
    <h1
      id={id}
      // Größe aus tokens.css (.c2-treppe --c2-hero-fs): mobil 60 px / 0,98 / −0,03em (Board C2m); ab 1024 px clamp(120px, 12,8vw, 184px) / 0,92 / −0,035em (Board C2plus)
      className="c2-motion c2-treppe m-0 whitespace-nowrap text-[length:var(--c2-hero-fs)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:leading-[0.92] lg:tracking-[-0.035em]"
      style={{ color: 'var(--c2-field-text)' }}
    >
      {WORDS.map((w, i) => (
        <span
          key={w}
          ref={(el) => {
            spans.current[i] = el
          }}
          data-c2-shrp=""
          className="block"
          style={{
            // Treppe: Grundeinzug 64 px + Stufe 1,18em ab 1024 px (Board: 64 / 281 / 499 px bei 184 px), mobil 0 + .47em (= 0 / 28 / 56 px bei 60 px)
            paddingLeft: `calc(var(--c2-treppe-basis) + ${i} * var(--c2-treppe-stufe))`,
            fontVariationSettings: `'SHRP' ${sh[i]}`,
            transition: `font-variation-settings ${weich ? 380 : 600}ms var(--c2-ease-out)`,
            animation: `c2-rise 500ms var(--c2-ease-out) ${300 + 120 * i}ms both`,
          }}
        >
          {w}
        </span>
      ))}
    </h1>
  )
}
