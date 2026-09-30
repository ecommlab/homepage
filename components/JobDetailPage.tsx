import { useRouter } from 'next/router'
import { H_HALB, H_SCHARF, Pille, ZurueckLink } from './c2/Bausteine'
import { Plus } from './c2/Icons'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Signalregister } from './c2/Signalregister'
import { Fliesstext, TitelWort, satz } from '../lib/c2Text'
import { normalizeLocale } from '../lib/i18n'
import type { JobPosting, JobSection } from '../lib/jobs'
import { karriere as t, pick } from '../lib/unterseitenInhalt'

/** Punkte bzw. Absätze eines Stellenabschnitts (Desktop 18 px zweispaltig, mobil 16 px einspaltig) */
function Liste({ s, gross, locale }: { s: JobSection; gross: boolean; locale: 'de' | 'en' }) {
  return (
    s.type === 'bullets' ? (
      <ul className={`m-0 list-none p-0 ${gross ? 'text-[18px] leading-[1.5] [column-count:2] [column-gap:24px]' : 'flex flex-col gap-[10px] text-[16px] leading-[1.5]'}`}>
        {s.items.map((it) => (
          <li key={it.de} className={`flex gap-[10px] ${gross ? 'mb-[12px] [break-inside:avoid]' : ''}`}>
            <span aria-hidden className="flex-none font-semibold">
              –
            </span>
            <span className="text-pretty">
              <Fliesstext text={it[locale]} />
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <div className={gross ? 'flex flex-col gap-[12px] text-[18px] leading-[1.5]' : 'flex flex-col gap-[10px] text-[16px] leading-[1.5]'}>
        {s.items.map((it) => (
          <p key={it.de} className="m-0 text-pretty">
            <Fliesstext text={it[locale]} />
          </p>
        ))}
      </div>
    )
  )
}

/**
 * /karriere/<slug> (3 Stellen) – Board „C2plus-ecommlab-Stelle-*“ / „C2m-ecommlab-Stelle-*“. Farbe Pflaume.
 * Hero: Zurück-Link, Stellentitel (72 px), Papier-Pille „Bewerben“ (mailto mit Betreff) · Einleitung (Lead) ·
 * Desktop: Signal-Register mit drei Reitern · mobil: Akkordeon (erster Abschnitt offen) ·
 * Bewerben (Desktop Papier-Band, mobil Tintenkasten). Inhalte aus lib/jobs.ts.
 */
export function JobDetailPage({ job }: { job: JobPosting }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const titel = satz(job.title[locale])
  const betreff = `mailto:${job.applyEmail}?subject=${encodeURIComponent(`${pick(locale, t.betreff)}: ${titel}`)}`
  const mail = `mailto:${job.applyEmail}`

  const abschnitte = job.sections.filter((s) => s.title)

  return (
    <SeitenRahmen
      feld="pflaume"
      bereich="/karriere"
      aktivTyp="true"
      heroLabelledBy="c2-h1"
      heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[74px] lg:pt-[131px]"
      hero={(feldRef) => (
        <>
          <ZurueckLink href="/karriere" style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
            {pick(locale, t.zurueck)}
          </ZurueckLink>
          <SchaerfeTitel
            id="c2-h1"
            areaRef={feldRef}
            woerter
            frei
            zeilen={titel.split(' ').map((w, i) => <TitelWort key={i} wort={w} />)}
            className="mt-[16px] text-[34px] leading-[1.04] tracking-[-0.03em] lg:mt-[23px] lg:max-w-[min(1080px,75vw)] lg:text-[length:min(72px,5vw)] lg:leading-none"
          />
          <div className="mt-[24px] flex lg:mt-[48px]" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(2)}ms both` }}>
            <Pille href={betreff} art="papier" voll>
              {pick(locale, t.bewerben)}
            </Pille>
          </div>
        </>
      )}
    >
      {/* ============ EINLEITUNG ============ */}
      <div className="flex flex-col px-[24px] pb-[24px] pt-[40px] lg:grid lg:grid-cols-12 lg:gap-x-[24px] lg:px-[80px] lg:pb-[64px] lg:pt-[120px]">
        <div className="flex flex-col gap-[14px] lg:col-span-8 lg:gap-[16px]">
          {job.intro.map((p, i) => (
            <p
              key={p.de}
              className={`m-0 text-pretty lg:text-[24px] lg:font-medium lg:leading-[1.45] ${i === 0 ? 'text-[18px] font-medium leading-[1.5]' : 'text-[17px] leading-[1.5]'}`}
            >
              <Fliesstext text={p[locale]} />
            </p>
          ))}
        </div>
      </div>

      {/* ============ ABSCHNITTE: Desktop Signal-Register ============ */}
      <div className="hidden px-[80px] pb-[120px] lg:block">
        <Signalregister
          idPrefix="c2-stelle"
          labelledBy="c2-h1"
          tabs={abschnitte.map((s) => ({
            titel: s.title ? s.title[locale] : '',
            inhalt: (
              <div className="grid grid-cols-12 items-start gap-x-[24px]">
                <h2 className={`${H_HALB} col-span-4 text-balance text-[36px] leading-[1.1] tracking-[-0.015em]`}>{s.title ? s.title[locale] : ''}</h2>
                <div className="col-span-8 col-start-5">
                  <Liste s={s} gross locale={locale} />
                </div>
              </div>
            ),
          }))}
        />
      </div>

      {/* ============ ABSCHNITTE: mobil Akkordeon ============ */}
      <div className="px-[24px] pb-[40px] pt-[16px] lg:hidden">
        <div className="border-b-2" style={{ borderColor: 'var(--c2-ink)' }}>
          {abschnitte.map((s, i) => (
            <details key={s.title?.de ?? i} open={i === 0} className="c2-motion border-t-2" style={{ borderColor: 'var(--c2-ink)' }}>
              <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-[16px]">
                <span className="flex items-center gap-[12px]">
                  <span aria-hidden className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-[15px] font-bold" style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)' }}>
                    {i + 1}
                  </span>
                  <span className="text-[20px] font-bold leading-[1.2]">{s.title ? s.title[locale] : ''}</span>
                </span>
                <Plus size={20} strokeWidth={2.4} className="transition-transform duration-200" />
              </summary>
              <div className="mb-[20px]">
                <Liste s={s} gross={false} locale={locale} />
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ============ BEWERBEN ============ */}
      <section aria-labelledby="c2-bewerben" className="px-[24px] pb-[56px] lg:px-[80px] lg:pb-[120px]">
        <div
          data-dark=""
          className="flex flex-col rounded-[24px] bg-[color:var(--c2-ink-field)] px-[24px] py-[28px] text-[#F4EEE5] lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px] lg:rounded-none lg:bg-transparent lg:p-0 lg:text-[color:var(--c2-ink)]"
        >
          <h2 id="c2-bewerben" className={`${H_SCHARF} text-[28px] leading-[1.06] lg:col-span-7 lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02] lg:tracking-[-0.025em]`}>
            {pick(locale, t.bewerben)}
          </h2>
          <div className="flex flex-col items-start lg:col-span-4 lg:col-start-9 lg:gap-[24px]">
            <p className="m-0 mt-[12px] text-pretty text-[17px] leading-[1.5] lg:mt-0 lg:text-[19px]">
              {pick(locale, t.bewirbDich)}{' '}
              <a href={mail} className="c2-textlink font-bold lg:font-semibold">
                {job.applyEmail}
              </a>
              .
            </p>
            <div className="mt-[20px] flex w-full lg:hidden">
              <Pille href={mail} art="papier" voll>
                {pick(locale, t.emailSchreiben)}
              </Pille>
            </div>
            <div className="hidden lg:flex">
              <Pille href={mail} art="ink">
                {pick(locale, t.emailSchreiben)}
              </Pille>
            </div>
          </div>
        </div>
      </section>
    </SeitenRahmen>
  )
}
