import { useRouter } from 'next/router'
import { useState } from 'react'
import { H_HALB, H_SCHARF, HeroRubrik, Pille, Zeilen } from './c2/Bausteine'
import { RisoBild, RisoFilterDefs, RisoUmschalter } from './c2/RisoKachel'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Zaehlwerk } from './c2/Zaehlwerk'
import { Fliesstext } from '../lib/c2Text'
import { normalizeLocale } from '../lib/i18n'
import { startseiteInhalt } from '../lib/startseiteInhalt'
import { getInitials, team } from '../lib/team'
import { pick, pickZ, teamFotos, teamSeite as t } from '../lib/unterseitenInhalt'

/**
 * /team – Board „C2plus-ecommlab-Team“ / „C2m-ecommlab-Team“.
 * Hero Orchidee (Plakat-H1 112 px + Einleitung) · Geschäftsführung (Desktop: Zählwerk „Über 30 Jahre“ rechts;
 * mobil: Satz als Überschrift) mit Riso-Porträts · „Das Team“ als Namensregister (mobil mit Monogrammen) ·
 * „Werden Sie Teil unseres Teams“ (mobil im Pflaume-Kasten). Personen aus lib/team.ts; Porträts nur für die Geschäftsführung.
 * Das frühere Modal („mehr erfahren“) entfällt – die Bios stehen direkt auf der Seite.
 */
export function TeamPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [riso, setRiso] = useState(true)
  const s = startseiteInhalt(locale)
  const gf = team.filter((m) => m.bio)
  const rest = team.filter((m) => !m.bio)

  const bioAbsaetze = (bio: string) => {
    const marke = pick(locale, t.schwerpunkte)
    const k = bio.indexOf(marke)
    return k > 0 ? [bio.slice(0, k).trim(), bio.slice(k).trim()] : [bio]
  }

  return (
    <SeitenRahmen
      feld="orchidee"
      bereich="/team"
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
            className="mt-[20px] text-balance text-[40px] leading-[1.04] tracking-[-0.03em] lg:mt-[28px] lg:text-[length:min(112px,7.778vw)] lg:leading-[0.96]"
          />
          <p
            className="m-0 mt-[18px] text-pretty text-[17px] leading-[1.55] lg:mt-[28px] lg:max-w-[min(737px,51.2vw)] lg:text-[20px] lg:font-medium lg:leading-[1.5]"
            style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(2)}ms both` }}
          >
            {pick(locale, t.intro)}
          </p>
        </>
      )}
    >
      <RisoFilterDefs />

      {/* ============ GESCHÄFTSFÜHRUNG ============ */}
      <section id="geschaeftsfuehrung" aria-labelledby="c2-gf" className="flex flex-col px-[24px] pb-[40px] pt-[48px] lg:px-[80px] lg:py-[120px]">
        {/* mobil: Rubrik + Satz als Überschrift */}
        <div className="flex flex-col lg:hidden">
          <p className="m-0 text-[14px] font-semibold leading-[1.3]">{pick(locale, t.gf)}</p>
          <h2 id="c2-gf" className={`${H_SCHARF} mt-[12px] text-balance text-[26px] leading-[1.06] tracking-[-0.025em]`}>
            <Fliesstext text={pick(locale, t.gfSatz)} />
          </h2>
          <div className="mt-[20px] flex">
            <RisoUmschalter riso={riso} onToggle={() => setRiso((r) => !r)} labelOn={s.referenzen.originalfarben} labelOff={s.referenzen.risodruck} />
          </div>
        </div>
        {/* Desktop: Überschrift + Zählwerk „Über 30“ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
          <h2 className={`${H_SCHARF} col-span-7 whitespace-nowrap text-[length:min(56px,3.889vw)] leading-[1.02] tracking-[-0.025em]`}>{pick(locale, t.gf)}</h2>
          <div className="col-span-4 col-start-9">
            <Zaehlwerk
              value={30}
              plus={false}
              vorsatz={pick(locale, t.ueber)}
              srText={pick(locale, t.gfSatz)}
              label={<Zeilen zeilen={pickZ(locale, t.jahreZeilen)} />}
              labelKlasse="lg:whitespace-nowrap lg:text-[length:min(18px,1.25vw)] lg:leading-[1.35]"
              durations={[1000, 900]}
              starts={[320, 200]}
            />
          </div>
        </div>

        <div className="mt-[24px] flex flex-col gap-[32px] lg:mt-[56px] lg:gap-[64px]">
          {gf.map((m) => {
            const foto = teamFotos[m.slug]
            const absaetze = m.bio ? bioAbsaetze(m.bio[locale]) : []
            return (
              <article
                key={m.slug}
                className="flex flex-col gap-[14px] border-t-2 pt-[24px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:gap-y-0 lg:border-t-0 lg:pt-0"
                style={{ borderColor: 'var(--c2-ink)' }}
              >
                {foto ? (
                  <RisoBild
                    src={foto.src}
                    alt={pick(locale, foto.alt)}
                    riso={riso}
                    lasche={m.name}
                    objektKlasse={`lg:object-center ${foto.mobilPos === '40% 20%' ? 'object-[40%_20%]' : 'object-[50%_20%]'}`}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="aspect-[342/300] rounded-[24px] lg:col-span-4 lg:aspect-square"
                  />
                ) : null}
                <div className="flex flex-col lg:col-span-6 lg:col-start-6">
                  <h3 className={`${H_SCHARF} mt-[4px] text-[24px] leading-[1.1] lg:mt-0 lg:whitespace-nowrap lg:text-[36px] lg:font-bold lg:tracking-[-0.015em] lg:[font-variation-settings:'SHRP'_50]`}>{m.name}</h3>
                  <p className="m-0 mt-[8px] text-[15px] font-semibold leading-[1.3] text-[color:var(--c2-muted)] lg:text-[18px] lg:leading-[1.4] lg:text-[color:var(--c2-ink)]">{m.role[locale]}</p>
                  {absaetze.map((a, k) => (
                    <p key={k} className={`m-0 text-pretty text-[16px] leading-[1.55] lg:max-w-[62ch] lg:text-[19px] ${k === 0 ? 'mt-[14px] lg:mt-[24px]' : 'mt-[14px] lg:mt-[16px]'}`}>
                      <Fliesstext text={a} />
                    </p>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ============ DAS TEAM ============ */}
      <section id="team" aria-labelledby="c2-team" className="flex flex-col px-[24px] pb-[40px] pt-[24px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
          <h2 id="c2-team" className={`${H_SCHARF} text-[30px] leading-[1.06] tracking-[-0.025em] lg:col-span-7 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
            {pick(locale, t.teamTitel)}
          </h2>
          <p className="m-0 mt-[12px] text-pretty text-[17px] leading-[1.55] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{pick(locale, t.teamText)}</p>
        </div>
        <ul className="m-0 mt-[20px] list-none border-b-[1.5px] p-0 lg:mt-[56px] lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:border-b-0" style={{ borderColor: 'var(--c2-line)' }}>
          {rest.map((m, i) => (
            <li
              key={m.slug}
              className={`flex min-h-[64px] items-center gap-[14px] border-t-[1.5px] lg:grid lg:h-[88px] lg:grid-cols-6 lg:gap-x-[24px] lg:gap-y-0 lg:border-t-2 lg:!border-t-[color:var(--c2-ink)] ${
                i >= rest.length - 2 ? 'lg:border-b-2 lg:!border-b-[color:var(--c2-ink)]' : ''
              }`}
              style={{ borderColor: 'var(--c2-line)' }}
            >
              <span
                aria-hidden
                className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[14px_14px_14px_4px] text-[15px] font-extrabold shadow-[inset_0_0_0_1.5px_#1F1A15] lg:hidden"
                style={{ background: i % 2 === 0 ? 'var(--c2-orchid)' : '#F4EEE5', color: '#1F1A15' }}
              >
                {getInitials(m.name)}
              </span>
              <span className="flex flex-col gap-[3px] lg:contents">
                <span className={`${H_HALB} text-[17px] leading-[1.2] lg:col-span-3 lg:whitespace-nowrap lg:text-[24px] lg:tracking-[-0.01em]`}>
                  {m.name}
                  <span className="sr-only">, </span>
                </span>
                <span className="text-[14px] leading-[1.3] text-[color:var(--c2-muted)] lg:col-span-3 lg:whitespace-nowrap lg:text-[17px] lg:font-medium lg:leading-[1.4]">{m.role[locale]}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ MITMACHEN ============ */}
      <section id="mitmachen" aria-labelledby="c2-mit" className="px-[16px] pb-[40px] lg:px-[80px] lg:pb-[120px]">
        <div data-dark="" className="flex flex-col rounded-[28px] bg-[color:var(--c2-pflaume)] px-[24px] py-[40px] text-[#F4EEE5] lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px] lg:rounded-none lg:bg-transparent lg:p-0 lg:text-[color:var(--c2-ink)]">
          <h2 id="c2-mit" className={`${H_SCHARF} text-balance text-[28px] leading-[1.06] tracking-[-0.025em] lg:col-span-6 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
            <Zeilen zeilen={pickZ(locale, t.mitZeilen)} />
          </h2>
          <div className="flex flex-col lg:col-span-5 lg:col-start-8 lg:gap-[24px]">
            <p className="m-0 mt-[14px] text-pretty text-[16px] leading-[1.55] lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{pick(locale, t.mitText)}</p>
            <div className="mt-[20px] flex flex-col gap-[12px] lg:hidden">
              <Pille href="/karriere" art="papier" voll>
                {pick(locale, t.offenePositionen)}
              </Pille>
              <Pille href="mailto:hello@ecommlab.io" art="papier-line" voll>
                {pick(locale, t.emailSchreiben)}
              </Pille>
            </div>
            <div className="hidden items-center gap-[12px] lg:flex">
              <Pille href="/karriere" art="ink">
                {pick(locale, t.offenePositionen)}
              </Pille>
              <Pille href="mailto:hello@ecommlab.io" art="line">
                {pick(locale, t.emailSchreiben)}
              </Pille>
            </div>
          </div>
        </div>
      </section>
    </SeitenRahmen>
  )
}
