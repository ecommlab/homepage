import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { H_SCHARF, ZurueckLink } from './c2/Bausteine'
import { RisoBild, RisoFilterDefs, RisoKachel, RisoUmschalter } from './c2/RisoKachel'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Fliesstext, satz } from '../lib/c2Text'
import { c2BildAlt, c2Kachel } from '../lib/c2Projekte'
import { normalizeLocale } from '../lib/i18n'
import { getCaseBySlug, portfolioCases } from '../lib/portfolioCases'
import type { KeyFactRow } from '../lib/portfolioCases'
import { startseiteInhalt } from '../lib/startseiteInhalt'
import { pick, referenzen as t } from '../lib/unterseitenInhalt'

/**
 * /referenzen/<slug> (DE) und /en/projects/<slug> (EN) – Board „C2plus-ecommlab-Referenz-*“ / „C2m-ecommlab-Referenz-*“.
 * Hero Tinte: Zurück-Link, Projektname (Plakat 112 px), Zusammenfassung, Eckdaten (Service · Technologie · Datum · Ort) ·
 * Keyfacts mit Riso-Bild (Systemnamen fett) · optionale Zusatzbilder (Bär Schuhe) · Nachbarn (im Kreis) · Fuß.
 * Inhalte aus lib/portfolioCases.ts. Die frühere Teilen-Leiste entfällt.
 */
export function PortfolioDetailPage({ slug }: { slug: string }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const basis = locale === 'en' ? '/projects' : '/referenzen'
  const [riso, setRiso] = useState(true)
  const s = startseiteInhalt(locale)
  const item = getCaseBySlug(slug)

  if (router.isFallback) return null
  if (!item) return null

  const i = portfolioCases.findIndex((c) => c.slug === item.slug)
  const n = portfolioCases.length
  const nachbarn = [portfolioCases[(i - 1 + n) % n], portfolioCases[(i + 1) % n]]
  const altVon = (src: string, fallback: string) => (c2BildAlt[src] ? pick(locale, c2BildAlt[src]) : c2Kachel[item.slug] && src === c2Kachel[item.slug].src ? pick(locale, c2Kachel[item.slug].alt) : fallback)
  const kachel = c2Kachel[item.slug]
  const eckdaten = [
    { dt: t.service, dd: item.meta.service },
    { dt: t.technologie, dd: item.meta.technology },
    { dt: t.datum, dd: item.meta.year },
    { dt: t.ort, dd: item.meta.location },
  ].filter((e) => e.dd)

  return (
    <>
      <Head>
        <title>{`${item.title} – Ecommlab`}</title>
        <meta
          name="description"
          content={item.summary?.[locale] ?? (locale === 'en' ? `${item.title} — a selected Ecommlab project.` : `${item.title} – Referenzprojekt von Ecommlab.`)}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SeitenRahmen
        feld="tinte"
        bereich="/referenzen"
        aktivTyp="true"
        heroLabelledBy="c2-h1"
        heroKlasse="flex flex-col px-[24px] pb-[32px] pt-[104px] lg:px-[64px] lg:pb-[72px] lg:pt-[131px]"
        hero={(feldRef) => (
          <>
            <ZurueckLink href={basis} style={{ animation: 'c2-fade 300ms ease-out 180ms both' }}>
              {pick(locale, t.zurueck)}
            </ZurueckLink>
            <SchaerfeTitel
              id="c2-h1"
              areaRef={feldRef}
              woerter
              mobilGestapelt
              zeilen={item.title.split(' ')}
              className="mt-[16px] text-[60px] leading-[0.96] tracking-[-0.03em] lg:mt-[23px] lg:text-[length:min(112px,7.778vw)]"
            />
            <div style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(1)}ms both` }}>
              {item.summary ? (
                <p className="m-0 mt-[20px] text-pretty text-[18px] font-medium leading-[1.45] lg:mt-[28px] lg:max-w-[min(737px,51.2vw)] lg:text-[22px]">
                  <Fliesstext text={item.summary[locale]} />
                </p>
              ) : null}
              <dl className="m-0 mt-[28px] grid grid-cols-2 gap-x-[16px] gap-y-[20px] lg:mt-[56px] lg:grid-cols-12 lg:gap-x-[24px] lg:gap-y-0">
                {eckdaten.map((e) => (
                  <div key={e.dt.de} className="border-t pt-[12px] lg:col-span-3 lg:pt-[20px]" style={{ borderColor: 'var(--c2-ink-field-line)' }}>
                    <dt className="m-0 text-[13px] font-semibold leading-[16px] text-[color:var(--c2-muted-on-ink)] lg:text-[14px] lg:leading-[17px]">{pick(locale, e.dt)}</dt>
                    <dd className="m-0 mt-[6px] text-[17px] font-bold leading-[1.25] [font-variation-settings:'SHRP'_50] lg:mt-[8px] lg:text-[22px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {e.dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        )}
      >
        <RisoFilterDefs />

        {/* ============ KEYFACTS ============ */}
        <section aria-labelledby="c2-kf" className="flex flex-col lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[80px] lg:py-[120px]">
          <div className="flex flex-col px-[24px] pb-[16px] pt-[32px] lg:col-span-5 lg:p-0">
            <div className="flex lg:hidden">
              <RisoUmschalter riso={riso} onToggle={() => setRiso((r) => !r)} labelOn={s.referenzen.originalfarben} labelOff={s.referenzen.risodruck} />
            </div>
            <RisoBild
              src={item.imageSrc}
              alt={altVon(item.imageSrc, item.title)}
              crop={kachel?.crop && item.imageSrc === kachel.src}
              objectPosition={kachel && item.imageSrc === kachel.src ? kachel.pos : '50% 50%'}
              riso={riso}
              className="mt-[16px] aspect-square rounded-[24px] lg:mt-0 lg:aspect-[519/550]"
            />
          </div>
          <div className="px-[24px] pb-[40px] pt-[40px] lg:col-span-6 lg:col-start-7 lg:p-0">
            <h2 id="c2-kf" className={`${H_SCHARF} text-[40px] leading-[1.06] tracking-[-0.025em] lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
              {pick(locale, t.keyfacts)}
            </h2>
            <ul className="m-0 mt-[24px] list-none border-b-2 p-0 lg:mt-[40px]" style={{ borderColor: 'var(--c2-ink)' }}>
              {item.keyFacts.map((f, k) => (
                <Keyfact key={k} fakt={f} erst={k === 0} locale={locale} />
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ZUSATZBILDER (nur wenn in den Daten vorhanden) ============ */}
        {item.beforeKeyfactsImageSrc ? (
          <div className="flex flex-col px-[24px] pb-[40px] pt-[8px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
            <RisoBild
              src={item.beforeKeyfactsImageSrc}
              alt={altVon(item.beforeKeyfactsImageSrc, item.beforeKeyfactsImageAlt ?? item.title)}
              objectPosition="50% 0%"
              riso={riso}
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="h-[220px] rounded-[24px] lg:h-auto lg:aspect-[1280/640]"
            />
            {item.beforeKeyfactsExtraImages?.length ? (
              <div className="flex flex-col gap-[12px] pt-[12px] lg:grid lg:grid-cols-2 lg:gap-[24px] lg:pt-[24px]">
                {item.beforeKeyfactsExtraImages.map((b) => (
                  <figure
                    key={b.src}
                    className="relative m-0 h-[210px] overflow-hidden rounded-[24px] border-[1.5px] lg:h-auto lg:aspect-[628/408]"
                    style={{ borderColor: 'var(--c2-line)', background: 'var(--c2-surface)' }}
                  >
                    <Image src={b.src} alt={altVon(b.src, b.alt ?? item.title)} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" style={{ objectPosition: '50% 0%' }} />
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* ============ NACHBARN ============ */}
        <nav aria-label={pick(locale, t.nachbarn)} className="flex flex-col items-start px-[24px] pb-[48px] pt-[8px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
          <ZurueckLink href={basis}>{pick(locale, t.zurueck)}</ZurueckLink>
          <div className="mt-[16px] grid w-full grid-cols-2 gap-[12px] lg:mt-[24px] lg:grid-cols-3 lg:gap-[24px]">
            {nachbarn.map((c) => {
              const b = c2Kachel[c.slug] ?? { src: c.imageSrc, alt: { de: c.title, en: c.title } }
              return (
                <RisoKachel
                  key={c.slug}
                  variante="nachbar"
                  href={`${basis}/${c.slug}`}
                  src={b.src}
                  alt={pick(locale, b.alt)}
                  name={c.title}
                  crop={b.crop}
                  objectPosition={b.pos}
                  riso={riso}
                />
              )
            })}
          </div>
        </nav>
      </SeitenRahmen>
    </>
  )
}

/** Eine Keyfact-Zeile: Text (erste Zeile halbfett) oder Gruppe mit Unterpunkten (Desktop zweispaltig mit Punkt, mobil „–“). */
function Keyfact({ fakt, erst, locale }: { fakt: KeyFactRow; erst: boolean; locale: 'de' | 'en' }) {
  const text = <Fliesstext text={fakt.text[locale]} fett />
  return (
    <li
      className={`border-t-2 pb-[18px] pt-[16px] text-[17px] leading-[1.5] lg:pb-[22px] lg:pt-[20px] lg:text-[20px] lg:leading-[29px] ${erst ? 'font-semibold' : ''}`}
      style={{ borderColor: 'var(--c2-ink)' }}
    >
      <span className={erst ? 'lg:block lg:text-balance' : undefined}>{text}</span>
      {fakt.type === 'group' ? (
        <ul className="m-0 mt-[10px] flex list-none flex-col gap-[6px] p-0 text-[16px] font-normal leading-[1.45] lg:mt-[12px] lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[8px] lg:text-[18px] lg:leading-[26px]">
          {fakt.items.map((it) => (
            <li key={it.de} className="flex items-start gap-[10px] lg:gap-[12px]">
              <span aria-hidden className="flex-none font-semibold lg:hidden">
                –
              </span>
              <span aria-hidden className="mt-[10px] hidden h-[6px] w-[6px] flex-none rounded-full lg:block" style={{ background: 'var(--c2-ink)' }} />
              <span className="lg:text-balance">
                <Fliesstext text={satz(it[locale])} fett />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
