import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { Koernung } from './EtikettFeld'
import { Pfeil } from './Icons'

/**
 * „Farbe bekennen“ – Referenzkachel.
 *
 * - Ruhe: Foto als Zweifarb-Risodruck (Tinte/Papier) über den SVG-Filter #c2-riso (<RisoFilterDefs/> einmal pro Seite).
 * - Hover: Die Originalfarbe flutet kreisförmig vom Eintrittspunkt des Zeigers (clip-path circle, 480 ms),
 *   beim Verlassen zieht sie sich zum Austrittspunkt zurück (360 ms). Tastaturfokus flutet von unten links. Bild zoomt auf 1,03.
 * - `riso={false}` zeigt die Originalfarben (Touch-Umschalter, siehe <RisoUmschalter/>).
 * - `crop` für Motive mit eingebrannten Badges (Pfundskerl): Bild 142,86 % breit, nach oben versetzt.
 *
 * Desktop (≥ 1024 px, Board C2plus): Kachel 4:3, Radius 24, Name auf Papier-Lasche unten links
 *   (48 px hoch, 20 px/700, Lasche = Textbreite + 16 px, bei Hover/Fokus + 36 px mit Pfeil).
 * Mobil (< 1024 px, Board C2m): Kachel quadratisch, Radius 20, Name UNTER dem Bild (16 px/700) mit Pfeil rechts, Abstand 10 px.
 */
export type RisoKachelProps = {
  href: string
  src: string
  alt: string
  name: string
  objectPosition?: string
  crop?: boolean
  riso?: boolean
  sizes?: string
  /**
   * Format (Boards): 'start' Startseite (mobil quadratisch, Radius 20, Name 16 px) ·
   * 'liste' Referenzen-Übersicht (mobil 342 × 260, Radius 24, Name 20 px + Metazeile; Desktop Metazeile unter der Kachel) ·
   * 'nachbar' Nachbarn auf Referenzseiten (mobil 165 × 140, Radius 24, Name 16 px). Desktop immer 4:3 mit Papier-Lasche.
   */
  variante?: 'start' | 'liste' | 'nachbar'
  /** Metazeile „Technologie · Ort“ (nur 'liste') */
  meta?: string
}

const FIGUR: Record<NonNullable<RisoKachelProps['variante']>, string> = {
  start: 'aspect-square rounded-[20px]',
  liste: 'aspect-[342/260] rounded-[24px]',
  nachbar: 'aspect-[165/140] rounded-[24px]',
}

export function RisoKachel({
  href,
  src,
  alt,
  name,
  objectPosition = '50% 50%',
  crop = false,
  riso = true,
  sizes = '(min-width: 1024px) 420px, 50vw',
  variante = 'start',
  meta,
}: RisoKachelProps) {
  const [an, setAn] = useState(false)
  const [org, setOrg] = useState<[number, number]>([0, 100])

  const punkt = (e: PointerEvent<HTMLElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect()
    const k = (v: number) => Math.max(0, Math.min(100, Math.round(v)))
    return [k(((e.clientX - r.left) / r.width) * 100), k(((e.clientY - r.top) / r.height) * 100)]
  }

  const bild = (mitFilter: boolean) => {
    const filter: CSSProperties = mitFilter && riso ? { filter: 'url(#c2-riso)' } : {}
    const zoom = 'transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]'
    return crop ? (
      <span className={`absolute left-0 block aspect-square w-[142.86%] lg:top-[-5.84%] ${variante === 'start' ? 'top-[-4.24%]' : 'top-[-5.84%]'}`}>
        <Image src={src} alt={mitFilter ? alt : ''} fill sizes={sizes} className={`object-cover ${zoom}`} style={filter} />
      </span>
    ) : (
      <Image src={src} alt={mitFilter ? alt : ''} fill sizes={sizes} className={`object-cover ${zoom}`} style={{ objectPosition, ...filter }} />
    )
  }

  const flut: CSSProperties = {
    clipPath: `circle(${an ? '150%' : '0%'} at ${org[0]}% ${org[1]}%)`,
    transition: `clip-path ${an ? 480 : 360}ms var(--c2-ease-out)`,
  }

  return (
    <Link
      href={href}
      className={`c2-motion group flex flex-col no-underline lg:block ${variante === 'liste' ? 'gap-[12px]' : 'gap-[10px]'}`}
      style={{ color: 'var(--c2-ink)' }}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        setOrg(punkt(e))
        setAn(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        setOrg(punkt(e))
        setAn(false)
      }}
      onFocus={() => {
        setOrg([0, 100])
        setAn(true)
      }}
      onBlur={() => setAn(false)}
    >
      <figure className={`relative m-0 overflow-hidden lg:aspect-[4/3] lg:rounded-[24px] ${FIGUR[variante]}`} style={{ background: 'var(--c2-line)' }}>
        {bild(true)}
        {riso ? (
          <span aria-hidden className="absolute inset-0 block" style={flut}>
            {bild(false)}
          </span>
        ) : null}
        <Koernung opacity={0.12} className="z-[1]" />
        {/* Desktop: Papier-Lasche mit Namen (unten links) */}
        <figcaption
          className="absolute bottom-0 left-0 z-[2] hidden h-[48px] items-center pt-[2px] text-[20px] font-bold leading-none tracking-[-0.01em] lg:flex"
          style={{
            background: 'var(--c2-paper)',
            borderTopRightRadius: 16,
            paddingRight: an ? 52 : 16,
            transition: 'padding-right 240ms var(--c2-ease-out)',
          }}
        >
          <span className="whitespace-nowrap">{name}</span>
          <span
            aria-hidden
            className="absolute right-[16px] flex"
            style={{ opacity: an ? 1 : 0, transform: `translateX(${an ? 0 : -4}px)`, transition: 'opacity 160ms, transform 240ms var(--c2-ease-out)' }}
          >
            <Pfeil size={20} strokeWidth={2} />
          </span>
          {/* Innenrundungen der Lasche: rechts unten und über der Lasche links */}
          <span aria-hidden className="absolute bottom-0 left-full block h-[16px] w-[16px]" style={{ background: 'radial-gradient(circle at 100% 0, transparent 15.5px, var(--c2-paper) 16px)' }} />
          <span aria-hidden className="absolute bottom-full left-0 block h-[16px] w-[16px]" style={{ background: 'radial-gradient(circle at 100% 0, transparent 15.5px, var(--c2-paper) 16px)' }} />
        </figcaption>
      </figure>
      {/* Mobil: Name unter dem Bild */}
      {variante === 'liste' ? (
        <span className="flex items-center justify-between gap-[12px] lg:hidden">
          <span className="flex flex-col gap-[4px]">
            <span className="text-[20px] font-bold leading-[1.2]">{name}</span>
            {meta ? <span className="text-[14px] leading-[1.4] text-[color:var(--c2-muted)]">{meta}</span> : null}
          </span>
          <Pfeil size={20} strokeWidth={2.2} />
        </span>
      ) : (
        <span className="flex items-center justify-between text-[16px] font-bold leading-[1.2] lg:hidden">
          {name}
          <Pfeil size={18} strokeWidth={2.2} />
        </span>
      )}
      {/* Desktop: Metazeile unter der Kachel (Referenzen-Übersicht) */}
      {variante === 'liste' && meta ? (
        <span className="mt-[16px] hidden text-[15px] font-medium leading-[20px] text-[color:var(--c2-muted)] lg:block">{meta}</span>
      ) : null}
    </Link>
  )
}

/**
 * Einzelnes Riso-Foto ohne Link (Keyfacts-Bild, großes Zusatzbild der Referenzseiten): Zweifarbdruck, bei Hover flutet die
 * Originalfarbe vom Zeiger aus (480/360 ms), Körnung 12 %. Größe/Seitenverhältnis/Radius über `className`.
 */
export function RisoBild({
  src,
  alt,
  objectPosition = '50% 50%',
  crop = false,
  riso = true,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  objektKlasse,
  lasche,
}: {
  src: string
  alt: string
  objectPosition?: string
  crop?: boolean
  riso?: boolean
  className?: string
  sizes?: string
  /** statt objectPosition: Tailwind-Klassen für den Bildausschnitt, z. B. 'object-[50%_20%] lg:object-center' */
  objektKlasse?: string
  /** Desktop: Name auf Papier-Lasche unten links (wie Referenzkachel, dekorativ, aria-hidden) */
  lasche?: string
}) {
  const [an, setAn] = useState(false)
  const [org, setOrg] = useState<[number, number]>([0, 100])
  const punkt = (e: PointerEvent<HTMLElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect()
    const k = (v: number) => Math.max(0, Math.min(100, Math.round(v)))
    return [k(((e.clientX - r.left) / r.width) * 100), k(((e.clientY - r.top) / r.height) * 100)]
  }
  const bild = (mitFilter: boolean) => {
    const filter: CSSProperties = mitFilter && riso ? { filter: 'url(#c2-riso)' } : {}
    return crop ? (
      <span className="absolute left-0 top-[-5.84%] block aspect-square w-[142.86%]">
        <Image src={src} alt={mitFilter ? alt : ''} fill sizes={sizes} className="object-cover" style={filter} />
      </span>
    ) : (
      <Image
        src={src}
        alt={mitFilter ? alt : ''}
        fill
        sizes={sizes}
        className={`object-cover ${objektKlasse ?? ''}`}
        style={objektKlasse ? filter : { objectPosition, ...filter }}
      />
    )
  }
  return (
    <figure
      className={`c2-motion relative m-0 overflow-hidden [isolation:isolate] ${className}`}
      style={{ background: 'var(--c2-line)' }}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        setOrg(punkt(e))
        setAn(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        setOrg(punkt(e))
        setAn(false)
      }}
    >
      {bild(true)}
      {riso ? (
        <span
          aria-hidden
          className="absolute inset-0 block"
          style={{ clipPath: `circle(${an ? '150%' : '0%'} at ${org[0]}% ${org[1]}%)`, transition: `clip-path ${an ? 480 : 360}ms var(--c2-ease-out)` }}
        >
          {bild(false)}
        </span>
      ) : null}
      <Koernung opacity={0.12} className="z-[1]" />
      {lasche ? (
        <figcaption
          aria-hidden
          className="absolute bottom-0 left-0 z-[2] hidden h-[48px] items-center pr-[16px] pt-[2px] text-[20px] font-bold leading-none tracking-[-0.01em] lg:flex"
          style={{ background: 'var(--c2-paper)', borderTopRightRadius: 16 }}
        >
          <span className="whitespace-nowrap">{lasche}</span>
          <span aria-hidden className="absolute bottom-0 left-full block h-[16px] w-[16px]" style={{ background: 'radial-gradient(circle at 100% 0, transparent 15.5px, var(--c2-paper) 16px)' }} />
          <span aria-hidden className="absolute bottom-full left-0 block h-[16px] w-[16px]" style={{ background: 'radial-gradient(circle at 100% 0, transparent 15.5px, var(--c2-paper) 16px)' }} />
        </figcaption>
      ) : null}
    </figure>
  )
}

/** Einmal pro Seite rendern (am Anfang der Referenz-Sektion). */
export function RisoFilterDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <filter id="c2-riso" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues=".122 .30 .78 .957" />
          <feFuncG type="table" tableValues=".102 .27 .75 .933" />
          <feFuncB type="table" tableValues=".082 .24 .71 .898" />
        </feComponentTransfer>
      </filter>
    </svg>
  )
}

/** Nur auf Touch-Geräten sichtbar (tokens.css: .c2-riso-toggle). Board C2m: 44 px hoch, Tinte, Symbol 32 px. */
export function RisoUmschalter({ riso, onToggle, labelOn, labelOff }: { riso: boolean; onToggle: () => void; labelOn: string; labelOff: string }) {
  return (
    <button
      type="button"
      aria-pressed={!riso}
      onClick={onToggle}
      className="c2-riso-toggle inline-flex h-[44px] items-center gap-[10px] self-start rounded-full border-0 pl-[6px] pr-[16px] text-[15px] font-semibold leading-none"
      style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)', fontFamily: 'inherit' }}
    >
      <span
        aria-hidden
        className="block h-[32px] w-[32px] rounded-full"
        style={{
          background: riso ? 'linear-gradient(135deg, #1F1A15 0 50%, #F4EEE5 50% 100%)' : 'conic-gradient(#D671C2 0 33%, #1D4ED8 0 66%, #D97706 0)',
          boxShadow: 'inset 0 0 0 2px var(--c2-surface)',
        }}
      />
      {riso ? labelOn : labelOff}
    </button>
  )
}
