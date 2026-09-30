import { useRouter } from 'next/router'
import { H_SCHARF, HeroRubrik } from './c2/Bausteine'
import { Kontaktformular } from './c2/Kontaktformular'
import { SchaerfeTitel, heroFadeDelay } from './c2/SchaerfeTitel'
import { SeitenRahmen } from './c2/SeitenRahmen'
import { normalizeLocale } from '../lib/i18n'
import { startseiteInhalt } from '../lib/startseiteInhalt'
import { firma, kontaktSeite as t, pick, pickZ } from '../lib/unterseitenInhalt'

/**
 * /kontakt – Board „C2plus-ecommlab-Kontakt“ / „C2m-ecommlab-Kontakt“.
 * Hero Orchidee: Rubrik, H1 (Frage, 4 Zeilen à 52 px), Lead · Formularplatte (Logik = Startseite, components/c2/Kontaktformular.tsx)
 * liegt auf Desktop im Feld (Spalten 7–12), mobil als Karte unter dem Feld · „Direkter Kontakt“: E-Mail, Telefon, Adresse.
 * Kontakt-Pille im Kopf als Umriss mit aria-current (kein Reiter).
 */
export function KontaktPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const s = startseiteInhalt(locale)

  const zellen = [
    { dt: pick(locale, t.email), dtLg: pick(locale, t.email), dd: <a href={`mailto:${firma.email}`} className="c2-textlink font-semibold lg:font-bold">{firma.email}</a> },
    { dt: pick(locale, t.telefon), dtLg: pick(locale, t.telefon), dd: <a href={firma.telefonHref} className="c2-textlink whitespace-nowrap font-semibold lg:font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>{firma.telefon}</a> },
    {
      dt: pick(locale, t.adresse),
      dtLg: firma.name,
      dd: (
        <>
          <span className="lg:hidden">
            {firma.name}
            <br />
          </span>
          {firma.strasse}
          <br />
          {firma.ort}
        </>
      ),
    },
  ]

  return (
    <SeitenRahmen
      feld="orchidee"
      bereich="/kontakt"
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
            className="mt-[20px] text-balance text-[34px] leading-[1.06] tracking-[-0.025em] lg:mt-[28px] lg:text-[length:min(52px,3.611vw)] lg:leading-[1.04]"
          />
          <p className="m-0 mt-[16px] text-pretty text-[19px] font-medium leading-[1.55] lg:mt-[28px] lg:max-w-[min(628px,43.6vw)] lg:text-[20px] lg:font-normal lg:leading-[1.5]" style={{ animation: `c2-fade 300ms ease-out ${heroFadeDelay(4)}ms both` }}>
            {pick(locale, t.lead)}
          </p>
        </>
      )}
      heroNeben={
        <Kontaktformular
          t={s.kontakt}
          titelAls="h2"
          className="mx-[24px] mb-[24px] mt-[32px] flex flex-col rounded-[24px] border-[1.5px] border-[color:var(--c2-line)] bg-[color:var(--c2-raised)] px-[20px] py-[24px] lg:m-0 lg:rounded-[32px] lg:border-0 lg:bg-[color:var(--c2-surface)] lg:p-[40px]"
        />
      }
    >
      {/* ============ DIREKTER KONTAKT ============ */}
      <section aria-labelledby="c2-direkt" className="flex flex-col px-[24px] pb-[48px] pt-[32px] lg:px-[80px] lg:py-[120px]">
        <h2
          id="c2-direkt"
          className={`${H_SCHARF} text-[28px] leading-[1.06] tracking-[-0.025em] lg:inline-flex lg:h-[34px] lg:items-center lg:self-start lg:whitespace-nowrap lg:rounded-full lg:bg-[color:var(--c2-ink)] lg:px-[14px] lg:text-[14px] lg:font-semibold lg:leading-none lg:tracking-normal lg:text-[color:var(--c2-surface)] lg:[font-variation-settings:'SHRP'_0]`}
        >
          {pick(locale, t.direkt)}
        </h2>
        <address className="mt-[20px] not-italic lg:mt-[40px]">
          <dl className="m-0 border-b-2 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:border-b-0" style={{ borderColor: 'var(--c2-ink)' }}>
            {zellen.map((z) => (
              <div key={z.dt} className="grid grid-cols-[96px_1fr] items-baseline gap-[12px] border-t-2 py-[16px] lg:col-span-4 lg:block lg:pb-0 lg:pt-[20px]" style={{ borderColor: 'var(--c2-ink)' }}>
                <dt className="m-0 text-[14px] font-semibold leading-[1.3] text-[color:var(--c2-muted)] lg:text-[15px] lg:leading-[20px]">
                  <span className="lg:hidden">{z.dt}</span>
                  <span className="hidden lg:inline">{z.dtLg}</span>
                </dt>
                <dd className="m-0 text-[17px] leading-[1.5] lg:mt-[8px] lg:text-[28px] lg:font-bold lg:leading-[1.2] lg:[font-variation-settings:'SHRP'_50]">{z.dd}</dd>
              </div>
            ))}
          </dl>
        </address>
      </section>
    </SeitenRahmen>
  )
}
