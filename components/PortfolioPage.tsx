import { useRouter } from 'next/router'
import { useState } from 'react'
import { H_SCHARF, HeroRubrik, Pille, Zeilen } from './c2/Bausteine'
import { RisoFilterDefs, RisoKachel, RisoUmschalter } from './c2/RisoKachel'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { Zaehlwerk } from './c2/Zaehlwerk'
import { Fliesstext } from '../lib/c2Text'
import { c2Kachel } from '../lib/c2Projekte'
import { normalizeLocale } from '../lib/i18n'
import { portfolioCases } from '../lib/portfolioCases'
import { startseiteInhalt } from '../lib/startseiteInhalt'
import { gemeinsam, pick, pickZ, referenzen as t } from '../lib/unterseitenInhalt'

/**
 * /referenzen (DE) und /en/projects (EN) – Board „C2plus-ecommlab-Referenzen“ / „C2m-ecommlab-Referenzen“.
 * Hero Tinte mit Zählwerk „300+“ (Desktop Orchidee rechts, mobil hell darunter) · alle Projekte als Riso-Kacheln
 * (Desktop zweispaltig 4:3 mit Metazeile „Technologie · Ort“) · Schlussband „Mehr Umsatz …“.
 * Reihenfolge = lib/portfolioCases.ts. Der frühere Tag-Filter entfällt (sechs Projekte, ruhige Seite).
 */
export function PortfolioPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const basis = locale === 'en' ? '/projects' : '/referenzen'
  const [riso, setRiso] = useState(true)
  const s = startseiteInhalt(locale)

  return (
    <SeitenRahmen
      feld="tinte"
      bereich="/referenzen"
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
            zeilen={pickZ(locale, t.titelZeilen)}
            className="mt-[20px] text-balance text-[40px] leading-[1.04] tracking-[-0.03em] lg:mt-[28px] lg:text-[length:min(80px,5.556vw)] lg:leading-none"
          />
          <div className="mt-[28px] lg:absolute lg:right-[64px] lg:top-[192px] lg:mt-0 lg:w-[min(302px,21vw)]" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(2)}ms both` }}>
            <Zaehlwerk
              value={300}
              label={pick(locale, t.erfolgreich)}
              durations={[1100, 1000, 900]}
              starts={[560, 440, 320]}
              zahlKlasse="lg:text-[color:var(--c2-orchid)]"
              linieKlasse="order-2 mt-[10px] block h-[3px] w-[180px] lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:mt-0 lg:h-[1px] lg:w-auto lg:!bg-[#3A322A]"
            />
          </div>
        </>
      )}
    >
      {/* ============ PROJEKTE ============ */}
      <section id="projekte" aria-labelledby="c2-proj" className="flex flex-col px-[24px] pb-[48px] pt-[40px] lg:px-[80px] lg:py-[120px]">
        <RisoFilterDefs />
        <h2 id="c2-proj" className="m-0 text-[14px] font-semibold leading-[1.3] lg:sr-only">
          {pick(locale, t.projekte)}
        </h2>
        <div className="mt-[16px] flex lg:mt-0">
          <RisoUmschalter riso={riso} onToggle={() => setRiso((r) => !r)} labelOn={s.referenzen.originalfarben} labelOff={s.referenzen.risodruck} />
        </div>
        <div className="mt-[24px] flex flex-col gap-[28px] lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[56px]">
          {portfolioCases.map((c) => {
            const bild = c2Kachel[c.slug] ?? { src: c.imageSrc, alt: { de: c.title, en: c.title } }
            const meta = [c.meta.technology, c.meta.location].filter(Boolean).join(' · ')
            return (
              <RisoKachel
                key={c.slug}
                variante="liste"
                href={`${basis}/${c.slug}`}
                src={bild.src}
                alt={pick(locale, bild.alt)}
                name={c.title}
                crop={bild.crop}
                objectPosition={bild.pos}
                riso={riso}
                meta={meta}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            )
          })}
        </div>
      </section>

      {/* ============ SCHLUSSBAND ============ */}
      <section aria-labelledby="c2-schluss" className="px-[24px] pb-[56px] pt-[16px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
          <h2 id="c2-schluss" className={`${H_SCHARF} text-balance text-[30px] leading-[1.06] tracking-[-0.025em] lg:col-span-6 lg:whitespace-nowrap lg:text-[length:min(52px,3.611vw)] lg:leading-[1.04]`}>
            <Zeilen zeilen={pickZ(locale, gemeinsam.mehrUmsatzZeilen)} />
          </h2>
          <div className="flex flex-col items-start lg:col-span-5 lg:col-start-8 lg:gap-[28px]">
            <p className="m-0 mt-[14px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[20px] lg:leading-[1.5]">
              <Fliesstext text={pick(locale, gemeinsam.mehrUmsatzText)} />
            </p>
            <div className="mt-[24px] flex w-full lg:mt-0 lg:w-auto">
              <Pille href="/kontakt" art="ink" voll>
                {pick(locale, gemeinsam.kontaktierenSieUns)}
              </Pille>
            </div>
          </div>
        </div>
      </section>
    </SeitenRahmen>
  )
}
