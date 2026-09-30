import Link from 'next/link'
import { Fragment } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Pfeil } from './Icons'

/**
 * Wiederkehrende Bausteine der C2-Unterseiten (Maße aus den Boards „C2plus-ecommlab-*“ / „C2m-ecommlab-*“).
 * Alle Maße in px (Seite hat html { font-size: 18/19px }), Desktop-Werte mit lg:.
 */

export const H_SCHARF = "m-0 font-extrabold [font-variation-settings:'SHRP'_100]"
export const H_HALB = "m-0 font-bold [font-variation-settings:'SHRP'_50]"

/** Überschriftenzeilen: Umbruch nur ab 1024 px (Desktop-Board), mobil fließt der Text. */
export function Zeilen({ zeilen }: { zeilen: readonly ReactNode[] }) {
  return (
    <>
      {zeilen.map((z, i) => (
        <Fragment key={i}>
          {z}
          {i < zeilen.length - 1 ? (
            <>
              {' '}
              <br className="hidden lg:inline" />
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  )
}

/** Tinten-Rubrik auf Papier (Desktop 34 hoch / 14 px). Mobil wird sie zur schlichten Zeile 14 px (Board C2m). */
export function Rubrik({ children, mobilPille = false }: { children: ReactNode; mobilPille?: boolean }) {
  return mobilPille ? (
    <p
      className="m-0 inline-flex h-[30px] items-center self-start whitespace-nowrap rounded-full px-[12px] text-[13px] font-semibold leading-none lg:h-[34px] lg:px-[14px] lg:text-[14px]"
      style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)' }}
    >
      {children}
    </p>
  ) : (
    <p className="m-0 text-[14px] font-semibold leading-[1.3] lg:inline-flex lg:bg-[color:var(--c2-ink)] lg:text-[color:var(--c2-surface)] lg:h-[34px] lg:items-center lg:self-start lg:whitespace-nowrap lg:rounded-full lg:px-[14px] lg:leading-none">
      {children}
    </p>
  )
}

/**
 * Dachzeile im Hero-Feld.
 * Orchidee: Desktop Tinten-Pille (34 / 14 px), mobil Umriss 1,5 px (32 hoch).
 * Tinte/Pflaume: Papier-Umriss 1,5 px (Desktop 34, mobil 32 hoch).
 */
export function HeroRubrik({ children, hell, style }: { children: ReactNode; hell: boolean; style?: CSSProperties }) {
  return (
    <p
      className={`m-0 inline-flex h-[32px] items-center self-start whitespace-nowrap rounded-full px-[14px] text-[14px] font-semibold leading-none shadow-[inset_0_0_0_1.5px_currentColor] lg:h-[34px] ${
        hell ? '' : 'lg:bg-[color:var(--c2-field-text)] lg:text-[#FBF8F3] lg:shadow-none'
      }`}
      style={style}
    >
      {children}
    </p>
  )
}

/** „← Zurück zu …“ – Textlink 15 px / 600, unterstrichen, Pfeil 18 px (Desktop 20 px), Trefferfläche 44 px. */
export function ZurueckLink({ href, children, style, className = '' }: { href: string; children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-[44px] items-center gap-[8px] self-start text-[15px] font-semibold leading-none no-underline lg:gap-[10px] ${className}`} style={style}>
      <Pfeil size={20} strokeWidth={2.5} className="h-[18px] w-[18px] rotate-180 transition-transform duration-200 group-hover:-translate-x-[3px] lg:h-[20px] lg:w-[20px]" />
      <span className="c2-textlink">{children}</span>
    </Link>
  )
}

type PillArt = 'feld' | 'feld-line' | 'papier' | 'papier-line' | 'ink' | 'line'
const PILL: Record<PillArt, string> = {
  feld: 'c2-pill-feld',
  'feld-line': 'c2-pill-feld-line',
  papier: 'c2-pill-papier',
  'papier-line': 'c2-pill-papier-line',
  ink: 'c2-pill-ink',
  line: 'c2-pill-line',
}

/** Pillen-Link: mobil 52 hoch / 24 px Innenabstand, Desktop 56 / 28 px, 17 px / 600. `voll` = mobil volle Breite. */
export function Pille({ href, art, children, voll = false, className = '' }: { href: string; art: PillArt; children: ReactNode; voll?: boolean; className?: string }) {
  const extern = /^(mailto:|tel:|https?:)/.test(href)
  const klasse = `${PILL[art]} inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full px-[24px] text-[17px] font-semibold leading-none no-underline lg:h-[56px] lg:px-[28px] ${
    voll ? 'w-full lg:w-auto' : ''
  } ${className}`
  return extern ? (
    <a href={href} className={klasse}>
      {children}
    </a>
  ) : (
    <Link href={href} className={klasse}>
      {children}
    </Link>
  )
}

/**
 * Abschnittskopf „links Titel, rechts Text“ (Desktop 12er-Raster: Titel Spalten 1–7, Text 9–12, unten bündig).
 * Mobil: Label (14 px) · Titel · Text untereinander.
 */
export function AbschnittKopf({
  id,
  rubrik,
  zeilen,
  text,
  link,
  titelKlasse = 'text-[30px] lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]',
  rechts,
}: {
  id: string
  rubrik?: ReactNode
  zeilen: readonly ReactNode[]
  text?: ReactNode
  link?: { href: string; label: string; mobil?: 'pille' | 'aus' }
  titelKlasse?: string
  rechts?: ReactNode
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
      <div className="flex flex-col lg:col-span-7">
        {rubrik ? <Rubrik>{rubrik}</Rubrik> : null}
        <h2 id={id} className={`${H_SCHARF} ${rubrik ? 'mt-[12px] lg:mt-[24px]' : ''} text-balance leading-[1.06] tracking-[-0.025em] lg:whitespace-nowrap ${titelKlasse}`}>
          <Zeilen zeilen={zeilen} />
        </h2>
      </div>
      {text || link || rechts ? (
        <div className="flex flex-col lg:col-span-4 lg:col-start-9 lg:gap-[4px]">
          {text ? <p className="m-0 mt-[14px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{text}</p> : null}
          {link ? (
            <>
              <Link href={link.href} className="c2-textlink hidden min-h-[44px] items-center self-start text-[17px] font-semibold lg:inline-flex">
                {link.label}
              </Link>
              {link.mobil === 'pille' ? (
                <div className="mt-[20px] flex lg:hidden">
                  <Pille href={link.href} art="line">
                    {link.label}
                  </Pille>
                </div>
              ) : null}
            </>
          ) : null}
          {rechts}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Schlussband mit Kontakt-Aufruf (Desktop: Titel links Spalten 1–7, rechts Text + Tinten-Pille, unten bündig; 0/120 Abstand).
 * Mobil: Titel 30 px, Text 17 px, Pille 52 hoch (Board C2m: padding 32 24 56).
 */
export function KontaktBand({
  id,
  zeilen,
  text,
  pille,
  zusatz,
  titelKlasse = 'text-[30px] lg:text-[length:min(52px,3.611vw)] lg:leading-[1.04]',
  className = 'px-[24px] pb-[56px] pt-[32px] lg:px-[80px] lg:pb-[120px] lg:pt-0',
}: {
  id: string
  zeilen: readonly ReactNode[]
  text: ReactNode
  pille: { href: string; label: string }
  zusatz?: ReactNode
  titelKlasse?: string
  className?: string
}) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
        <h2 id={id} className={`${H_SCHARF} text-balance leading-[1.06] tracking-[-0.025em] lg:col-span-7 lg:whitespace-nowrap ${titelKlasse}`}>
          <Zeilen zeilen={zeilen} />
        </h2>
        <div className="flex flex-col lg:col-span-4 lg:col-start-9 lg:gap-[24px]">
          <p className="m-0 mt-[14px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{text}</p>
          <div className="mt-[20px] flex lg:mt-0">
            <Pille href={pille.href} art="ink">
              {pille.label}
            </Pille>
          </div>
          {zusatz}
        </div>
      </div>
    </section>
  )
}

/** Register-Zeile mit Pfeil (Leistungen, Stellen): Hover Orchidee-hell, Pfeil schiebt 4 px (tokens.css .c2-reg). */
export function RegisterPfeil() {
  return (
    <>
      <Pfeil size={20} strokeWidth={2.2} className="lg:hidden" />
      <Pfeil size={28} strokeWidth={2.5} className="hidden lg:block" />
    </>
  )
}
