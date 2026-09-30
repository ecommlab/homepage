import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { HeroRubrik } from './Bausteine'
import { SchaerfeTitel } from './SchaerfeTitel'
import { SeitenRahmen } from './SeitenRahmen'
import { normalizeLocale } from '../../lib/i18n'
import { pick } from '../../lib/unterseitenInhalt'

/**
 * Rahmen der Rechtsseiten (Impressum, Datenschutz, AGB) – Boards „C2plus-ecommlab-Impressum/-Datenschutz/-AGB“ und „C2m-…“.
 * Hero Tinte: Rubrik „Rechtliches“, Titel 112 px (mobil 56 px) ·
 * Desktop: Karteikarte mit drei Reitern (Links zwischen den Rechtsseiten; aktiv mit der Karte verschmolzen, inaktiv 6 px tiefer,
 * Hover 3 px) · Karte 1.5-px-Rand, Radius 24, innen 54,5 px · Zeilen im 12er-Raster: Randtitel Spalten 1–4 (18 px / 700),
 * Text Spalten 5–10 (19 / 1,6, max. 68ch), Haarlinien 1,5 px --c2-line.
 * Mobil: Reiter als Pillen (aktiv Tinte), Zeilen untereinander (Titel über dem Text).
 * Die Texte selbst stehen in den Seiten (pages/impressum.tsx usw.) und bleiben dort unverändert.
 */
export type RechtZeile = { titel?: ReactNode; inhalt: ReactNode }
type Aktiv = 'impressum' | 'datenschutz' | 'agb'

const REITER: { key: Aktiv; href: string; label: { de: string; en: string } }[] = [
  { key: 'impressum', href: '/impressum', label: { de: 'Impressum', en: 'Legal notice' } },
  { key: 'datenschutz', href: '/datenschutzbestimmungen', label: { de: 'Datenschutz', en: 'Privacy' } },
  { key: 'agb', href: '/nutzungsbedingungen', label: { de: 'AGB', en: 'Terms' } },
]

export function RechtSeite({ aktiv, zeilen, lang = false }: { aktiv: Aktiv; zeilen: RechtZeile[]; /** lange Texte (Datenschutz, AGB): mobil Titel 18 / Text 16 px */ lang?: boolean }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [hover, setHover] = useState<Aktiv | null>(null)
  const titel = pick(locale, REITER.find((r) => r.key === aktiv)!.label)

  return (
    <SeitenRahmen
      feld="tinte"
      heroLabelledBy="c2-h1"
      heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[72px] lg:pt-[136px]"
      hero={(feldRef) => (
        <>
          <HeroRubrik hell style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
            {pick(locale, { de: 'Rechtliches', en: 'Legal' })}
          </HeroRubrik>
          <SchaerfeTitel
            id="c2-h1"
            areaRef={feldRef}
            zeilen={[titel]}
            className="mt-[20px] text-[56px] leading-[0.96] tracking-[-0.03em] lg:mt-[28px] lg:text-[length:min(112px,7.778vw)]"
          />
        </>
      )}
    >
      <div className="px-[24px] pb-[56px] pt-[32px] lg:px-[80px] lg:py-[120px]">
        <nav aria-label={pick(locale, { de: 'Rechtliches', en: 'Legal' })} className="c2-motion relative flex flex-wrap gap-[8px] lg:-mb-[1.5px] lg:flex-nowrap lg:pl-[36px]">
          {REITER.map((r) => {
            const ist = r.key === aktiv
            const y = ist ? 0 : hover === r.key ? 3 : 6
            return (
              <Link
                key={r.key}
                href={r.href}
                aria-current={ist ? 'page' : undefined}
                onMouseEnter={() => setHover(r.key)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.key)}
                onBlur={() => setHover(null)}
                className={`relative inline-flex h-[44px] flex-none items-center whitespace-nowrap rounded-full px-[16px] text-[15px] font-semibold leading-none no-underline lg:h-[56px] lg:rounded-none lg:rounded-t-[16px] lg:border-[1.5px] lg:border-b-0 lg:border-[color:var(--c2-line)] lg:px-[20px] lg:text-[18px] lg:font-bold lg:[font-variation-settings:'SHRP'_50] lg:[transform:translateY(var(--c2-y))] lg:[transition:transform_160ms_var(--c2-ease-out)] ${
                  ist
                    ? 'z-[3] bg-[color:var(--c2-ink)] text-[color:var(--c2-surface)] lg:bg-[color:var(--c2-surface)] lg:text-[color:var(--c2-ink)]'
                    : 'z-[1] shadow-[inset_0_0_0_2px_var(--c2-ink)] lg:bg-[color:var(--c2-paper)] lg:shadow-none'
                }`}
                style={{ '--c2-y': `${y}px` } as CSSProperties}
              >
                {pick(locale, r.label)}
                {ist ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="absolute bottom-0 left-[-17.5px] hidden overflow-visible lg:block">
                      <path d="M0,18 H18 V0 A18,18 0 0 1 0,18 Z" fill="var(--c2-surface)" />
                      <path d="M16.75,1.25 A16,16 0 0 1 0.75,17.25" fill="none" stroke="var(--c2-line)" strokeWidth="1.5" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="absolute bottom-0 right-[-17.5px] hidden overflow-visible lg:block">
                      <path d="M18,18 H0 V0 A18,18 0 0 0 18,18 Z" fill="var(--c2-surface)" />
                      <path d="M1.25,1.25 A16,16 0 0 0 17.25,17.25" fill="none" stroke="var(--c2-line)" strokeWidth="1.5" />
                    </svg>
                  </>
                ) : null}
              </Link>
            )
          })}
        </nav>
        <div className="relative z-[2] mt-[24px] border-b-[1.5px] border-[color:var(--c2-line)] lg:mt-0 lg:rounded-[24px] lg:border-[1.5px] lg:bg-[color:var(--c2-surface)] lg:px-[54.5px] lg:py-[28px]">
          {zeilen.map((z, i) => (
            <div
              key={i}
              className={`flex flex-col gap-[6px] border-t-[1.5px] border-[color:var(--c2-line)] py-[18px] lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-x-[24px] lg:gap-y-0 lg:py-[28px] ${i === 0 ? 'lg:border-t-0' : ''}`}
            >
              {z.titel ? (
                <h2 className={`m-0 font-bold lg:col-span-4 lg:text-[18px] lg:leading-[1.35] lg:[font-variation-settings:'SHRP'_50] ${lang ? 'text-[18px] leading-[1.3]' : 'text-[16px] leading-[1.35]'}`}>
                  {z.titel}
                </h2>
              ) : null}
              <div
                className={`flex flex-col gap-[12px] lg:col-span-6 lg:col-start-5 lg:max-w-[68ch] lg:gap-[16px] lg:text-[19px] lg:leading-[1.6] ${lang ? 'text-[16px] leading-[1.6]' : 'text-[17px] leading-[1.6]'}`}
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {z.inhalt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SeitenRahmen>
  )
}

/** Liste mit hängendem Halbgeviertstrich (Abstand 8 px) */
export function RechtListe({ punkte }: { punkte: ReactNode[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
      {punkte.map((p, i) => (
        <li key={i} className="flex gap-[10px]">
          <span aria-hidden className="flex-none font-semibold">
            –
          </span>
          <span className="text-pretty">{p}</span>
        </li>
      ))}
    </ul>
  )
}

/** Textlink in Rechtstexten (halbfett, unterstrichen) */
export function RechtLink({ href, children, extern = false }: { href: string; children: ReactNode; extern?: boolean }) {
  return (
    <a href={href} className="c2-textlink font-semibold" {...(extern ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  )
}
