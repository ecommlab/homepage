import Head from 'next/head'
import { useRouter } from 'next/router'
import { H_HALB, H_SCHARF, Pille, ZurueckLink, Zeilen } from './c2/Bausteine'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Fliesstext, TitelWort, satz } from '../lib/c2Text'
import { normalizeLocale } from '../lib/i18n'
import type { LeistungDetail } from '../lib/leistungDetails'
import { gemeinsam, leistungDetail as t, pick, pickZ } from '../lib/unterseitenInhalt'

/**
 * /leistungen/<slug> (10 Seiten) – Board „C2plus-ecommlab-Leistung-*“ / „C2m-ecommlab-Leistung-*“.
 * Hero Orchidee mit Zurück-Link, Titel (Schärfe pro Wort, Umbruch ausgeglichen), zwei Pillen ·
 * Einleitung (Lead) · Abschnitte als nummeriertes Register · Schlussband „Mehr Umsatz …“.
 * Alle Inhalte aus lib/leistungDetails.ts, gesetzt nach den C2-Satzregeln (lib/c2Text.tsx).
 */
export function LeistungDetailPage({ leistung }: { leistung: LeistungDetail }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const titel = satz(leistung.title[locale])
  const woerter = titel.split(' ')

  return (
    <>
      <Head>
        <title>{`${titel} – Ecommlab`}</title>
        <meta name="description" content={satz(leistung.intro[locale])} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SeitenRahmen
        feld="orchidee"
        bereich="/leistungen"
        aktivTyp="true"
        heroLabelledBy="c2-h1"
        heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[72px] lg:pt-[131px]"
        hero={(feldRef) => (
          <>
            <ZurueckLink href="/leistungen" style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
              {pick(locale, t.zurueck)}
            </ZurueckLink>
            <SchaerfeTitel
              id="c2-h1"
              areaRef={feldRef}
              woerter
              frei
              zeilen={woerter.map((w, i) => <TitelWort key={i} wort={w} />)}
              className="mt-[16px] text-[36px] leading-[1.04] tracking-[-0.03em] lg:mt-[23px] lg:max-w-[min(1080px,75vw)] lg:text-[length:min(72px,5vw)] lg:leading-none"
            />
            <div className="mt-[24px] flex flex-col gap-[12px] lg:mt-[48px] lg:flex-row" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(3)}ms both` }}>
              <Pille href="/kontakt" art="feld" voll>
                {pick(locale, gemeinsam.kontaktAufnehmen)}
              </Pille>
              <Pille href="/referenzen" art="feld-line" voll>
                {pick(locale, gemeinsam.referenzenAnsehen)}
              </Pille>
            </div>
          </>
        )}
      >
        {/* ============ EINLEITUNG ============ */}
        <div className="px-[24px] pb-[24px] pt-[40px] lg:grid lg:grid-cols-12 lg:gap-x-[24px] lg:px-[80px] lg:pb-[64px] lg:pt-[120px]">
          <p className="m-0 text-pretty text-[20px] font-medium leading-[1.4] lg:col-span-8 lg:text-[length:min(28px,1.944vw)] lg:leading-[1.35] lg:tracking-[-0.01em]">
            <Fliesstext text={leistung.intro[locale]} />
          </p>
        </div>

        {/* ============ ABSCHNITTE (nummeriertes Register) ============ */}
        <div className="px-[24px] pb-[48px] pt-[16px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
          <ol className="m-0 list-none border-b-2 p-0" style={{ borderColor: 'var(--c2-ink)' }}>
            {leistung.sections.map((s, i) => (
              <li
                key={s.title.de}
                className="flex flex-col gap-[10px] border-t-2 pb-[24px] pt-[20px] lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-x-[24px] lg:gap-y-0 lg:pb-[40px] lg:pt-[28px]"
                style={{ borderColor: 'var(--c2-ink)' }}
              >
                <div className="flex items-start gap-[12px] lg:relative lg:col-span-5 lg:block lg:pl-[44px]">
                  <span
                    aria-hidden
                    className="mt-[1px] flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full text-[15px] font-bold leading-none lg:absolute lg:left-0 lg:top-[3px] lg:mt-0"
                    style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {i + 1}
                  </span>
                  <h2 className={`${H_HALB} text-balance text-[21px] leading-[1.25] lg:max-w-[460px] lg:text-[28px] lg:leading-[1.2] lg:tracking-[-0.01em]`}>{satz(s.title[locale])}</h2>
                </div>
                <p className="m-0 text-pretty text-[16px] leading-[1.55] lg:col-span-6 lg:col-start-7 lg:max-w-[60ch] lg:text-[19px]">
                  <Fliesstext text={s.body[locale]} />
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ============ SCHLUSSBAND ============ */}
        <section aria-labelledby="c2-schluss" className="px-[24px] pb-[56px] pt-[16px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
            <h2 id="c2-schluss" className={`${H_SCHARF} text-balance text-[30px] leading-[1.06] tracking-[-0.025em] lg:col-span-6 lg:whitespace-nowrap lg:text-[length:min(52px,3.611vw)] lg:leading-[1.04]`}>
              <Zeilen zeilen={pickZ(locale, gemeinsam.mehrUmsatzZeilen)} />
            </h2>
            <div className="flex flex-col items-start lg:col-span-5 lg:col-start-8">
              <p className="m-0 mt-[14px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[20px] lg:leading-[1.5]">
                <Fliesstext text={pick(locale, gemeinsam.mehrUmsatzText)} />
              </p>
              <div className="mt-[24px] flex w-full flex-col gap-[12px] lg:w-auto lg:gap-[16px]">
                <Pille href="/kontakt" art="ink" voll>
                  {pick(locale, gemeinsam.kontaktAufnehmen)}
                </Pille>
                <ZurueckLink href="/leistungen">{pick(locale, t.zurueck)}</ZurueckLink>
              </div>
            </div>
          </div>
        </section>
      </SeitenRahmen>
    </>
  )
}
