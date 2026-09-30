import Link from 'next/link'
import { useRouter } from 'next/router'
import { AbschnittKopf, H_HALB, H_SCHARF, HeroRubrik, KontaktBand, Pille, RegisterPfeil, Zeilen } from './c2/Bausteine'
import { EtikettFeld } from './c2/EtikettFeld'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Fliesstext } from '../lib/c2Text'
import { normalizeLocale } from '../lib/i18n'
import { leistungDetails } from '../lib/leistungDetails'
import { gemeinsam, leistungen as t, leistungsNamen, pick, pickZ } from '../lib/unterseitenInhalt'

/**
 * /leistungen – Board „C2plus-ecommlab-Leistungen“ (1440) / „C2m-ecommlab-Leistungen“ (390).
 * Hero Orchidee (Desktop 590 hoch) · „Alle Leistungen“ als Gruppen-Register · Tintenfeld „Strategisch“ · Erfahrung · Kontaktband.
 * Kurztexte im Register = Titel der jeweiligen Detailseite (lib/leistungDetails.ts).
 */
export function LeistungenPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const titel = (slug: string) => leistungDetails.find((l) => l.slug === slug)?.title

  return (
    <SeitenRahmen
      feld="orchidee"
      bereich="/leistungen"
      heroLabelledBy="c2-h1"
      heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[72px] lg:pt-[136px]"
      hero={(feldRef) => (
        <>
          <HeroRubrik hell={false} style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
            {pick(locale, t.rubrik)}
          </HeroRubrik>
          <SchaerfeTitel
            id="c2-h1"
            areaRef={feldRef}
            zeilen={pickZ(locale, t.titelZeilen)}
            className="mt-[20px] text-balance text-[32px] leading-[1.04] tracking-[-0.03em] lg:mt-[28px] lg:text-[length:min(72px,5vw)] lg:leading-none"
          />
          <div className="mt-[24px] flex flex-col gap-[12px] lg:mt-[48px] lg:flex-row" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(3)}ms both` }}>
            <Pille href="/kontakt" art="feld" voll>
              {pick(locale, gemeinsam.kontaktAufnehmen)}
            </Pille>
            <Pille href="#ueberblick" art="feld-line" className="hidden lg:inline-flex">
              {pick(locale, t.ueberblick)}
            </Pille>
          </div>
        </>
      )}
    >
      {/* ============ ALLE LEISTUNGEN ============ */}
      <section id="ueberblick" aria-labelledby="c2-alle" className="flex flex-col px-[24px] pb-[40px] pt-[48px] lg:px-[80px] lg:py-[120px]">
        <p className="m-0 text-[14px] font-semibold leading-[1.3] lg:hidden">{pick(locale, t.ueberblick)}</p>
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
          <h2 id="c2-alle" className={`${H_SCHARF} mt-[12px] text-[32px] leading-[1.06] tracking-[-0.025em] lg:col-span-7 lg:mt-0 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
            {pick(locale, t.alleTitel)}
          </h2>
          <p className="m-0 mt-[12px] text-pretty text-[17px] leading-[1.55] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{pick(locale, t.alleText)}</p>
        </div>
        <div className="lg:mt-[56px] lg:border-b-2" style={{ borderColor: 'var(--c2-ink)' }}>
          {t.gruppen.map((g) => (
            <div key={g.titel.de} className="mt-[28px] flex flex-col lg:mt-0 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:border-t-2" style={{ borderColor: 'var(--c2-ink)' }}>
              <h3 className="m-0 mb-[8px] text-[14px] font-semibold leading-[1.3] text-[color:var(--c2-muted)] lg:col-span-4 lg:mb-0 lg:whitespace-nowrap lg:pb-[24px] lg:pt-[28px] lg:text-[36px] lg:font-bold lg:leading-[1.05] lg:tracking-[-0.015em] lg:text-[color:var(--c2-ink)] lg:[font-variation-settings:'SHRP'_50]">
                <span className="lg:hidden">{pick(locale, g.titel)}</span>
                <span className="hidden lg:inline">
                  <Zeilen zeilen={pickZ(locale, g.titelZeilen)} />
                </span>
              </h3>
              <ul className="m-0 list-none border-b-[1.5px] p-0 lg:col-span-8 lg:col-start-5 lg:border-b-0" style={{ borderColor: 'var(--c2-line)' }}>
                {g.slugs.map((slug, i) => (
                  <li key={slug} className="block">
                    <Link
                      href={`/leistungen/${slug}`}
                      className={`c2-reg flex items-center gap-[14px] border-t-[1.5px] py-[16px] no-underline lg:grid lg:grid-cols-8 lg:gap-x-[24px] lg:gap-y-0 lg:py-[12px] ${
                        i === 0 ? 'lg:min-h-[102px] lg:border-t-0' : 'lg:min-h-[104px] lg:border-t-2 lg:!border-t-[color:var(--c2-ink)]'
                      }`}
                      style={{ borderColor: 'var(--c2-line)', color: 'var(--c2-ink)' }}
                    >
                      <span className="flex flex-1 flex-col gap-[4px] lg:contents">
                        <span className={`${H_HALB} text-[19px] leading-[1.2] lg:col-span-4 lg:whitespace-nowrap lg:text-[length:min(28px,1.944vw)] lg:leading-[1.1] lg:tracking-[-0.01em]`}>
                          {pick(locale, leistungsNamen[slug])}
                        </span>
                        <span className="text-pretty text-[15px] leading-[1.45] text-[color:var(--c2-muted)] lg:col-span-3 lg:col-start-5 lg:text-[17px] lg:text-[color:var(--c2-ink)]">
                          <Fliesstext text={pick(locale, titel(slug) ?? { de: '', en: '' })} />
                        </span>
                      </span>
                      <span className="flex lg:col-start-8 lg:justify-self-end">
                        <RegisterPfeil />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ============ STRATEGISCH (Tintenfeld) ============ */}
      <section aria-labelledby="c2-strat" className="px-[16px]">
        <EtikettFeld
          color="var(--c2-ink-field)"
          textColor="var(--c2-on-ink)"
          dark
          tabNurLg
          tab={{ h: 44, pl: 20, pr: 32 }}
          tabLg={{ h: 64, pl: 64, pr: 40 }}
          etikett={<p className="m-0 whitespace-nowrap text-[16px] font-semibold leading-none">{pick(locale, t.strategischRubrik)}</p>}
        >
          <div className="flex flex-col px-[24px] py-[40px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[64px] lg:pb-[90px] lg:pt-[112px]">
            <p className="m-0 text-[14px] font-semibold leading-[1.3] text-[color:var(--c2-muted-on-ink)] lg:hidden">{pick(locale, t.strategischRubrik)}</p>
            <h2 id="c2-strat" className={`${H_SCHARF} mt-[12px] text-balance text-[28px] leading-[1.06] tracking-[-0.025em] lg:col-span-10 lg:mt-0 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
              <Zeilen zeilen={pickZ(locale, t.strategischZeilen)} />
            </h2>
            <p className="m-0 mt-[14px] text-pretty text-[16px] leading-[1.55] lg:col-span-7 lg:col-start-1 lg:mt-[28px] lg:text-[20px] lg:leading-[1.5] lg:text-[color:var(--c2-muted-on-ink)]">
              <Fliesstext text={pick(locale, t.strategischText)} />
            </p>
            <div className="mt-[20px] flex lg:col-span-4 lg:col-start-1 lg:mt-[40px]">
              <Pille href="/leistungen/partners-und-tools" art="papier-line">
                {pick(locale, gemeinsam.mehrErfahren)}
              </Pille>
            </div>
          </div>
        </EtikettFeld>
      </section>

      {/* ============ ERFAHRUNG ============ */}
      <section aria-labelledby="c2-erf" className="px-[24px] pb-[24px] pt-[56px] lg:px-[80px] lg:py-[120px]">
        <AbschnittKopf
          id="c2-erf"
          rubrik={pick(locale, t.erfahrungRubrik)}
          zeilen={pickZ(locale, t.erfahrungZeilen)}
          text={<Fliesstext text={pick(locale, t.erfahrungText)} />}
          link={{ href: '/referenzen', label: pick(locale, gemeinsam.referenzenAnsehen), mobil: 'pille' }}
        />
      </section>

      {/* ============ KONTAKT ============ */}
      <KontaktBand
        id="c2-kontakt"
        zeilen={[pick(locale, gemeinsam.kontaktierenSieUns)]}
        text={pick(locale, t.kontaktText)}
        pille={{ href: '/kontakt', label: pick(locale, gemeinsam.zumKontakt) }}
      />
    </SeitenRahmen>
  )
}
