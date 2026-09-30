import Link from 'next/link'
import { useRouter } from 'next/router'
import { H_HALB, H_SCHARF, HeroRubrik, Pille, RegisterPfeil } from './c2/Bausteine'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Fliesstext, satz } from '../lib/c2Text'
import { normalizeLocale } from '../lib/i18n'
import { jobs } from '../lib/jobs'
import { karriere as t, pick } from '../lib/unterseitenInhalt'

/**
 * /karriere – Board „C2plus-ecommlab-Karriere“ / „C2m-ecommlab-Karriere“. Farbe Pflaume = Karriere („du“).
 * Hero: Plakat-H1 „Komm in unser Team“ (Desktop eine Zeile 112 px, mobil Treppe 56 px) + Lead + Papier-Pille ·
 * Arbeitsweise (zwei Absätze, Desktop mit Schnellkontakt-Karte rechts) · Offene Positionen (Register aus lib/jobs.ts) ·
 * mobil: Schnellkontakt-Karte unter den Positionen.
 */
function Schnellkontakt({ locale, className }: { locale: 'de' | 'en'; className: string }) {
  return (
    <div className={`flex flex-col items-start rounded-[24px] border-[1.5px] ${className}`} style={{ borderColor: 'var(--c2-line)' }}>
      <p className="m-0 text-[14px] font-semibold leading-[1.3] text-[color:var(--c2-muted)] lg:inline-flex lg:h-[34px] lg:items-center lg:rounded-full lg:bg-[color:var(--c2-ink)] lg:px-[14px] lg:leading-none lg:text-[color:var(--c2-surface)]">
        {pick(locale, t.schnellkontakt)}
      </p>
      <h2 className={`${H_SCHARF} mt-[10px] text-[26px] leading-[1.06] tracking-[-0.025em] lg:mt-[20px] lg:text-[28px] lg:font-bold lg:leading-[1.15] lg:tracking-[-0.015em] lg:[font-variation-settings:'SHRP'_50]`}>
        {pick(locale, t.passt)}
      </h2>
      <p className="m-0 mt-[10px] text-pretty text-[16px] leading-[1.55] lg:mt-[12px] lg:text-[18px] lg:leading-[1.5]">{pick(locale, t.passtText)}</p>
      <div className="mt-[18px] flex lg:mt-[24px]">
        <Pille href="mailto:hello@ecommlab.io" art="ink">
          {pick(locale, t.emailSchreiben)}
        </Pille>
      </div>
    </div>
  )
}

export function KarrierePage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const woerter = locale === 'en' ? t.titelWoerter.en : t.titelWoerter.de

  return (
    <SeitenRahmen
      feld="pflaume"
      bereich="/karriere"
      heroLabelledBy="c2-h1"
      heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[72px] lg:pt-[136px]"
      hero={(feldRef) => (
        <>
          <HeroRubrik hell style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
            {pick(locale, t.rubrik)}
          </HeroRubrik>
          <SchaerfeTitel
            id="c2-h1"
            areaRef={feldRef}
            woerter
            mobilTreppe={20}
            zeilen={woerter}
            className="mt-[20px] text-[56px] leading-[0.98] tracking-[-0.03em] lg:mt-[28px] lg:text-[length:min(112px,7.778vw)] lg:leading-[0.96]"
          />
          <div className="flex flex-col items-start lg:mt-[28px] lg:max-w-[min(737px,51.2vw)] lg:gap-[40px]" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(2)}ms both` }}>
            <p className="m-0 mt-[20px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[22px] lg:font-medium lg:leading-[1.45]">{pick(locale, t.lead)}</p>
            <div className="mt-[24px] flex lg:mt-0">
              <Pille href="#offene-positionen" art="papier">
                {pick(locale, t.offenePositionen)}
              </Pille>
            </div>
          </div>
        </>
      )}
    >
      {/* ============ ARBEITSWEISE ============ */}
      <section aria-label={pick(locale, t.arbeitsweise)} className="px-[24px] pb-[24px] pt-[40px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[80px] lg:py-[120px]">
        <div className="flex flex-col gap-[16px] text-[18px] leading-[1.55] lg:col-span-7 lg:gap-[24px] lg:text-[20px] lg:leading-[1.6]">
          {t.absaetze.map((a) => (
            <p key={a.de} className="m-0 text-pretty">
              <Fliesstext text={pick(locale, a)} />
            </p>
          ))}
        </div>
        <Schnellkontakt locale={locale} className="hidden bg-[color:var(--c2-surface)] p-[32px] lg:col-span-4 lg:col-start-9 lg:flex" />
      </section>

      {/* ============ OFFENE POSITIONEN ============ */}
      <section id="offene-positionen" aria-labelledby="c2-pos" className="px-[24px] pb-[24px] pt-[32px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
          <h2 id="c2-pos" className={`${H_SCHARF} text-[30px] leading-[1.06] tracking-[-0.025em] lg:col-span-7 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
            {pick(locale, t.offenePositionen)}
          </h2>
          <p className="m-0 mt-[12px] text-pretty text-[17px] leading-[1.55] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{pick(locale, t.positionenText)}</p>
        </div>
        <ul className="m-0 mt-[20px] list-none border-b-2 p-0 lg:mt-[56px]" style={{ borderColor: 'var(--c2-ink)' }}>
          {jobs.map((j) => (
            <li key={j.slug} className="block">
              <Link
                href={`/karriere/${j.slug}`}
                className="c2-reg flex min-h-[76px] items-center justify-between gap-[16px] border-t-2 py-[12px] no-underline lg:grid lg:h-[104px] lg:grid-cols-12 lg:gap-x-[24px] lg:py-0"
                style={{ borderColor: 'var(--c2-ink)', color: 'var(--c2-ink)' }}
              >
                <span className={`${H_HALB} text-[19px] leading-[1.25] lg:col-span-9 lg:whitespace-nowrap lg:text-[length:min(36px,2.5vw)] lg:leading-[1.1] lg:tracking-[-0.015em]`}>{satz(j.title[locale])}</span>
                <span className="flex lg:col-start-12 lg:justify-self-end">
                  <RegisterPfeil />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* mobil: Schnellkontakt unter den Positionen */}
      <div className="px-[24px] pb-[56px] pt-[16px] lg:hidden">
        <Schnellkontakt locale={locale} className="bg-[color:var(--c2-raised)] px-[20px] py-[24px]" />
      </div>
    </SeitenRahmen>
  )
}
