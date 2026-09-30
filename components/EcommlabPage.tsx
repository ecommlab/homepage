import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { EtikettFeld, Koernung } from './c2/EtikettFeld'
import { Pfeil, Plus, Menue } from './c2/Icons'
import { Kontaktformular } from './c2/Kontaktformular'
import { EcommlabLogo } from './c2/Marken'
import { MobilMenue } from './c2/MobilMenue'
import { ReiterNav } from './c2/ReiterNav'
import { RisoFilterDefs, RisoKachel, RisoUmschalter } from './c2/RisoKachel'
import { SchaerfeTreppe } from './c2/SchaerfeTreppe'
import { StartFuss } from './c2/StartFuss'
import { useThema } from './c2/useThema'
import { Zaehlwerk } from './c2/Zaehlwerk'
import { geologica } from '../lib/fonts'
import { normalizeLocale } from '../lib/i18n'
import { servicePartners } from '../lib/servicePartners'
import { startseiteInhalt } from '../lib/startseiteInhalt'

/**
 * ecommlab.io – Startseite im Design C2 „Farbe bekennen“.
 *
 * Referenz (verbindlich):  handoff/ecommlab-startseite/referenz/startseite-desktop-1440.png  (Board C2plus-ecommlab, 1440 px)
 *                          handoff/ecommlab-startseite/referenz/startseite-mobil-390.png     (Board C2m-ecommlab, 390 px)
 * Umbruch Desktop/Mobil bei 1024 px (Tailwind `lg:`). Unter 1024 px gilt das Mobil-Board, ab 1024 px das Desktop-Board.
 * Große Desktop-Schriften sind die px-Werte der 1440er-Referenz und schrumpfen zwischen 1024 und 1440 px mit (min(px, vw)).
 * Die Seite ist auf 1440 px begrenzt und zentriert; der Papiergrund läuft über die volle Breite.
 *
 * Header und Footer der Startseite sind Teil dieser Seite (Logo-Etikett im Hero bzw. im Fuß).
 * pages/_app.tsx darf auf "/" KEINEN SiteFooter rendern (siehe README).
 */

const PROJEKTE = [
  { slug: 'pfundskerl-xxl-de', name: 'Pfundskerl', src: '/portfolio/pfundskerl.jpeg', crop: true, pos: '50% 50%', altDe: 'Pfundskerl – Model in olivgrüner Winterjacke vor Nebellandschaft', altEn: 'Pfundskerl – model in an olive winter jacket against a misty landscape' },
  { slug: 'riess-ambiente', name: 'Riess-Ambiente', src: '/portfolio/riess-ambiente.png', crop: false, pos: '50% 50%', altDe: 'Riess-Ambiente – dunkles Ledersofa im Wohnraum', altEn: 'Riess-Ambiente – dark leather sofa in a living room' },
  { slug: 'liquid-life', name: 'Liquid Life', src: '/portfolio/liquid-life.png', crop: false, pos: '50% 15%', altDe: 'Liquid Life – Mountainbiker im Sprung auf einem Waldtrail', altEn: 'Liquid Life – mountain biker jumping on a forest trail' },
  { slug: 'baer-schuhe', name: 'Bär Schuhe', src: '/portfolio/baer-schuhe.png', crop: false, pos: '50% 35%', altDe: 'Bär Schuhe – Frau mit Lederschuhen in beiden Händen', altEn: 'Bär Schuhe – woman holding leather shoes in both hands' },
  { slug: 'kaipara', name: 'Kaipara', src: '/portfolio/kaipara.jpg', crop: false, pos: '50% 40%', altDe: 'Kaipara – Mann im dunkelgrünen Longsleeve vor Bergkulisse', altEn: 'Kaipara – man in a dark green long-sleeve shirt against mountains' },
  { slug: 'newone', name: 'Newone', src: '/portfolio/newone.png', crop: false, pos: '50% 50%', altDe: 'Newone – Armbänder am Handgelenk im warmen Licht', altEn: 'Newone – bracelets on a wrist in warm light' },
] as const

/** Partner-Logos: ORIGINAL-Dateien aus public/partners (unverändert), Reihenfolge wie im Board. */
const PARTNER_NAMEN = ['Shopify', 'PayPal', 'Cloudflare', 'Magento', 'Shopware'] as const
/** Mobile Bildhöhe je Logo, damit die Zeichen trotz unterschiedlichem Leerraum in der SVG gleich groß wirken. */
const PARTNER_MOBIL_HOEHE = ['max-h-[29px]', 'max-h-[32px]', 'max-h-[32px]', 'max-h-[29px]', 'max-h-[32px]'] as const

/* ---------- kleine Bausteine ---------- */

/** Zeilen einer Überschrift: Umbruch nur ab 1024 px; `nowrap` hält ein Wort auch mobil zusammen. */
function Zeilen({ zeilen, nowrap }: { zeilen: readonly string[]; nowrap?: string }) {
  return (
    <>
      {zeilen.map((z, i) => {
        let inhalt: ReactNode = z
        if (nowrap && z.includes(nowrap)) {
          const [vor, nach] = z.split(nowrap)
          inhalt = (
            <>
              {vor}
              <span className="whitespace-nowrap">{nowrap}</span>
              {nach}
            </>
          )
        }
        return (
          <Fragment key={i}>
            {inhalt}
            {i < zeilen.length - 1 ? (
              <>
                {' '}
                <br className="hidden lg:inline" />
              </>
            ) : null}
          </Fragment>
        )
      })}
    </>
  )
}

/** Rubrik-Pille (Tinte): mobil 30 hoch / 13 px, Desktop 34 hoch / 14 px. */
function Rubrik({ children }: { children: ReactNode }) {
  return (
    <p
      className="m-0 inline-flex h-[30px] items-center self-start whitespace-nowrap rounded-full px-[12px] text-[13px] font-semibold leading-none lg:h-[34px] lg:px-[14px] lg:text-[14px]"
      style={{ background: 'var(--c2-ink)', color: 'var(--c2-surface)' }}
    >
      {children}
    </p>
  )
}

const H2_SCHARF = "m-0 font-extrabold [font-variation-settings:'SHRP'_100]"

/** Kopf von Leistungen/Referenzen: links Rubrik + H2 (7 Spalten), rechts Text + Link (Spalten 9–12). */
function SektionsKopf({ rubrik, id, zeilen, text, linkHref, linkText }: { rubrik: string; id: string; zeilen: readonly string[]; text: string; linkHref: string; linkText: string }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
      <div className="flex flex-col lg:col-span-7">
        <Rubrik>{rubrik}</Rubrik>
        <h2
          id={id}
          className={`${H2_SCHARF} mt-[12px] text-balance text-[32px] leading-[1.06] tracking-[-0.025em] lg:mt-[24px] lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}
        >
          <Zeilen zeilen={zeilen} />
        </h2>
      </div>
      <div className="flex flex-col lg:col-span-4 lg:col-start-9 lg:gap-[4px]">
        <p className="m-0 mt-[14px] text-pretty text-[17px] leading-[1.55] lg:mt-0 lg:text-[19px] lg:leading-[1.5]">{text}</p>
        <Link href={linkHref} className="hidden min-h-[44px] items-center self-start text-[17px] font-semibold underline lg:inline-flex">
          {linkText}
        </Link>
      </div>
    </div>
  )
}

/* ---------- Seite ---------- */

export function EcommlabPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const t = startseiteInhalt(locale)
  const en = locale === 'en'

  const heroRef = useRef<HTMLDivElement>(null)
  const [lasche, setLasche] = useState(false)
  const [menue, setMenue] = useState(false)
  const [riso, setRiso] = useState(true)
  const { thema, umschalten } = useThema()
  const menueZu = useCallback(() => setMenue(false), [])

  const hauptnav = [
    { href: '/leistungen', label: t.nav.leistungen },
    { href: '/referenzen', label: t.nav.referenzen },
    { href: '/team', label: t.nav.team },
    { href: '/karriere', label: t.nav.karriere },
  ]
  const kontaktLink = { href: '/kontakt', label: t.nav.kontakt }

  return (
    <div className={`c2-seite ${geologica.variable} min-h-screen`}>
      {/* Papier-Körnung über der ganzen Seite (Board: 6 %, multiply) */}
      <Koernung opacity={0.06} className="!fixed z-[60]" />

      <div className="mx-auto max-w-[1440px]">
        <main>
          {/* ============ HERO ============ */}
          <section id="hero" aria-labelledby="c2-hero-title" className="px-[16px] pt-[16px]">
            <div ref={heroRef}>
              <EtikettFeld
                color="var(--c2-orchid)"
                textColor="var(--c2-field-text)"
                tab={{ h: 64, pl: 16, pr: 16 }}
                tabLg={{ h: 96, pl: 64, pr: 40 }}
                stanz
                lasche={lasche}
                etikett={
                  <Link
                    href="/"
                    aria-label={t.kopf.startseite}
                    className="block"
                    style={{ color: 'var(--c2-ink)', animation: 'c2-etikett-in 260ms var(--c2-ease-out) 560ms backwards' }}
                    onMouseEnter={() => setLasche(true)}
                    onMouseLeave={() => setLasche(false)}
                    onFocus={() => setLasche(true)}
                    onBlur={() => setLasche(false)}
                  >
                    <EcommlabLogo className="w-[124px] lg:w-[160px]" />
                  </Link>
                }
              >
                {/* Desktop-Kopf im Feld */}
                <div className="absolute right-[64px] top-[26px] z-[3] hidden items-center gap-[28px] lg:flex">
                  <ReiterNav items={hauptnav} ariaLabel={t.kopf.hauptnavigation} />
                  <nav aria-label={t.kopf.sprache} className="flex items-center gap-[2px] text-[15px] leading-none" style={{ color: 'var(--c2-field-text)' }}>
                    {en ? (
                      <Link href={router.asPath} locale="de" lang="de" hrefLang="de" aria-label="Deutsch" className="inline-flex min-h-[44px] items-center px-[4px] font-medium no-underline hover:underline">
                        DE
                      </Link>
                    ) : (
                      <span lang="de" aria-current="true" className="inline-flex min-h-[44px] items-center px-[4px] font-semibold">
                        DE
                      </span>
                    )}
                    <span aria-hidden className="font-medium">
                      ·
                    </span>
                    {en ? (
                      <span lang="en" aria-current="true" className="inline-flex min-h-[44px] items-center px-[4px] font-semibold">
                        EN
                      </span>
                    ) : (
                      <Link href={router.asPath} locale="en" lang="en" hrefLang="en" aria-label="English" className="inline-flex min-h-[44px] items-center px-[4px] font-medium no-underline hover:underline">
                        EN
                      </Link>
                    )}
                  </nav>
                  <Link href={kontaktLink.href} className="c2-pill-feld inline-flex h-[44px] items-center justify-center whitespace-nowrap rounded-full px-[20px] text-[15px] font-semibold leading-none no-underline">
                    {kontaktLink.label}
                  </Link>
                </div>

                {/* Mobil-Menüknopf */}
                <button
                  type="button"
                  aria-label={t.kopf.menueOeffnen}
                  aria-expanded={menue}
                  aria-controls="c2-menue"
                  onClick={() => setMenue(true)}
                  className="absolute right-[10px] top-[10px] z-[3] flex h-[48px] w-[48px] items-center justify-center rounded-full border-0 bg-transparent p-0 lg:hidden"
                  style={{ color: 'var(--c2-field-text)' }}
                >
                  <Menue />
                </button>

                <div className="c2-treppe relative flex flex-col px-[24px] pb-[32px] pt-[116px] lg:block lg:px-0 lg:pb-[100px] lg:pt-[152px]">
                  <SchaerfeTreppe areaRef={heroRef} id="c2-hero-title" />
                  {/* Desktop: Pillen links unter „Create.“ (Board: left 64, top 500 bei 184 px → 152 px + 1,8913 × Schriftgröße) */}
                  <div className="mt-[32px] flex flex-col gap-[12px] [animation:c2-fade_300ms_ease-out_820ms_both] lg:absolute lg:left-[64px] lg:top-[calc(152px+1.8913*var(--c2-hero-fs))] lg:mt-0 lg:w-[220px] lg:[animation:c2-fade_300ms_ease-out_920ms_both]">
                    <Link href="#leistungen" className="c2-pill-feld inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full px-[24px] text-[17px] font-semibold leading-none no-underline lg:h-[56px] lg:px-[28px]">
                      {t.hero.unsereLeistungen}
                    </Link>
                    <Link href="#was-machen-wir" className="c2-pill-feld-line inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full px-[24px] text-[17px] font-semibold leading-none no-underline lg:h-[56px] lg:px-[28px]">
                      {t.hero.wasMachenWir}
                    </Link>
                  </div>
                </div>
              </EtikettFeld>
            </div>
          </section>

          {/* ============ SERVICE-PARTNER ============ */}
          <section aria-label={t.partner.titel} className="px-[24px] pb-[24px] pt-[40px] lg:px-[80px] lg:pb-[96px] lg:pt-[48px]">
            <div className="flex flex-col lg:grid lg:h-[40px] lg:grid-cols-12 lg:items-center lg:gap-x-[24px]">
              <p className="m-0 text-[14px] font-semibold leading-[1.3] lg:col-span-2 lg:leading-none" style={{ color: 'var(--c2-muted)' }}>
                {t.partner.titel}
              </p>
              <ul className="m-0 mt-[24px] flex list-none flex-wrap items-center justify-center gap-x-[12px] gap-y-[18px] p-0 lg:col-span-10 lg:col-start-3 lg:mt-0 lg:flex-nowrap lg:justify-between lg:gap-0">
                {servicePartners.map((p, i) => (
                  <li key={p.src} className="flex h-[40px] w-[calc(50%-6px)] items-center justify-center lg:h-auto lg:w-auto lg:flex-none">
                    <Image
                      src={p.src}
                      alt={PARTNER_NAMEN[i] ?? p.name}
                      width={250}
                      height={50}
                      className={`block h-auto w-auto max-w-full object-contain dark:invert lg:max-h-none lg:w-[min(180px,12.5vw)] lg:max-w-none ${PARTNER_MOBIL_HOEHE[i]}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ============ WAS MACHEN WIR ============ */}
          <section id="was-machen-wir" aria-labelledby="c2-was" className="flex flex-col px-[24px] py-[48px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
            <Rubrik>{t.was.rubrik}</Rubrik>
            <h2
              id="c2-was"
              className={`${H2_SCHARF} mt-[16px] text-balance text-[30px] leading-[1.06] tracking-[-0.025em] lg:mt-[28px] lg:whitespace-nowrap lg:text-[length:min(80px,5.556vw)] lg:leading-none lg:tracking-[-0.03em]`}
            >
              <Zeilen zeilen={t.was.titelZeilen} nowrap={t.was.nowrapWort} />
            </h2>
            <div className="flex flex-col lg:mt-[64px] lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-[24px]">
              <p className="m-0 mt-[16px] text-pretty text-[18px] leading-[1.55] lg:col-span-5 lg:mt-0 lg:text-[length:min(28px,1.944vw)] lg:font-medium lg:leading-[1.35] lg:tracking-[-0.01em]">
                {t.was.text}
              </p>
              <div className="mt-[32px] grid grid-cols-2 gap-[24px] lg:col-span-6 lg:col-start-7 lg:mt-0">
                <Zaehlwerk value={15} label={t.was.jahre} durations={[1000, 900]} starts={[320, 200]} />
                <Zaehlwerk value={300} label={t.was.projekte} durations={[1100, 1000, 900]} starts={[560, 440, 320]} offset={120} />
              </div>
            </div>
          </section>

          {/* ============ LEISTUNGEN ============ */}
          <section id="leistungen" aria-labelledby="c2-leist" className="flex flex-col px-[24px] py-[56px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
            <SektionsKopf rubrik={t.leistungen.rubrik} id="c2-leist" zeilen={t.leistungen.titelZeilen} text={t.leistungen.text} linkHref="/leistungen" linkText={t.leistungen.alle} />
            <ul className="m-0 mt-[28px] list-none border-b-2 p-0 lg:mt-[56px]" style={{ borderColor: 'var(--c2-ink)' }}>
              {t.leistungen.kategorien.map((k) => (
                <li key={k.titel} className="block">
                  <Link
                    href="/leistungen"
                    className="c2-reg flex items-center gap-[16px] border-t-2 py-[20px] no-underline lg:grid lg:min-h-[104px] lg:grid-cols-12 lg:gap-x-[24px] lg:gap-y-0 lg:py-[12px]"
                    style={{ borderColor: 'var(--c2-ink)' }}
                  >
                    <span className="flex flex-1 flex-col gap-[6px] lg:contents">
                      <span className="text-[20px] font-bold leading-[1.2] [font-variation-settings:'SHRP'_50] lg:col-span-6 lg:whitespace-nowrap lg:text-[length:min(36px,2.5vw)] lg:leading-[1.1] lg:tracking-[-0.015em]">
                        {k.titel}
                      </span>
                      <span className="text-[15px] leading-[1.45] text-[color:var(--c2-muted)] lg:col-span-5 lg:col-start-7 lg:text-balance lg:text-[18px] lg:leading-[1.5] lg:text-[color:var(--c2-ink)]">
                        {k.punkte.map((p, i) => (
                          <Fragment key={p}>
                            <span className="whitespace-nowrap">
                              {p}
                              {i < k.punkte.length - 1 ? ' ·' : ''}
                            </span>
                            {i < k.punkte.length - 1 ? ' ' : ''}
                          </Fragment>
                        ))}
                      </span>
                    </span>
                    <span className="flex lg:col-start-12 lg:justify-self-end">
                      <Pfeil size={20} strokeWidth={2.2} className="lg:hidden" />
                      <Pfeil size={28} strokeWidth={2.5} className="hidden lg:block" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ============ REFERENZEN ============ */}
          <section id="referenzen" aria-labelledby="c2-ref" className="flex flex-col px-[24px] pb-[56px] pt-[16px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
            <RisoFilterDefs />
            <SektionsKopf rubrik={t.referenzen.rubrik} id="c2-ref" zeilen={t.referenzen.titelZeilen} text={t.referenzen.text} linkHref="/referenzen" linkText={t.referenzen.alle} />
            <div className="mt-[20px] flex">
              <RisoUmschalter riso={riso} onToggle={() => setRiso((r) => !r)} labelOn={t.referenzen.originalfarben} labelOff={t.referenzen.risodruck} />
            </div>
            <div className="mt-[20px] grid grid-cols-2 gap-x-[12px] gap-y-[24px] lg:mt-[36px] lg:grid-cols-3 lg:gap-[24px]">
              {PROJEKTE.map((p) => (
                <RisoKachel
                  key={p.slug}
                  href={`/referenzen/${p.slug}`}
                  src={p.src}
                  alt={en ? p.altEn : p.altDe}
                  name={p.name}
                  crop={p.crop}
                  objectPosition={p.pos}
                  riso={riso}
                />
              ))}
            </div>
            <div className="mt-[28px] flex lg:hidden">
              <Link href="/referenzen" className="c2-pill-line inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full px-[24px] text-[17px] font-semibold leading-none no-underline">
                {t.referenzen.alle}
              </Link>
            </div>
          </section>

          {/* ============ BASIS (Tintenfeld) ============ */}
          <section aria-labelledby="c2-basis" className="px-[16px]">
            <EtikettFeld
              color="var(--c2-ink-field)"
              textColor="var(--c2-on-ink)"
              dark
              tab={{ h: 44, pl: 20, pr: 32 }}
              tabLg={{ h: 64, pl: 64, pr: 40 }}
              etikett={<p className="m-0 whitespace-nowrap text-[13px] font-semibold leading-none lg:text-[16px]">{t.basis.rubrik}</p>}
            >
              <div className="flex flex-col px-[24px] pb-[40px] pt-[76px] lg:px-[64px] lg:pb-[97px] lg:pt-[112px]">
                <h2 id="c2-basis" className={`${H2_SCHARF} text-balance text-[28px] leading-[1.06] tracking-[-0.025em] lg:whitespace-nowrap lg:text-[length:min(56px,3.889vw)] lg:leading-[1.02]`}>
                  <Zeilen zeilen={t.basis.titelZeilen} />
                </h2>
                <ol className="m-0 mt-[24px] list-none p-0 lg:mt-[56px] lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[40px]">
                  {t.basis.punkte.map((b, i) => (
                    <li key={b.titel} className="flex flex-col gap-[8px] border-t pb-[22px] pt-[20px] lg:gap-[12px] lg:pb-0 lg:pt-[28px]" style={{ borderColor: 'var(--c2-ink-field-line)' }}>
                      <span aria-hidden className="text-[36px] font-extrabold leading-none tracking-[-0.03em] [font-variation-settings:'SHRP'_100] lg:text-[48px] lg:tracking-[-0.02em]" style={{ color: 'var(--c2-orchid)', fontVariantNumeric: 'tabular-nums' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="m-0 mt-[4px] text-[21px] font-bold leading-[1.2] [font-variation-settings:'SHRP'_50] lg:mt-0 lg:text-[28px] lg:tracking-[-0.01em]">{b.titel}</h3>
                      <p className="m-0 text-pretty text-[16px] leading-[1.55] lg:max-w-[46ch] lg:text-[18px]" style={{ color: 'var(--c2-muted-on-ink)' }}>
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </EtikettFeld>
          </section>

          {/* ============ ANSPRUCH (Orchidee) ============ */}
          <section aria-labelledby="c2-ansp" className="px-[16px] pt-[16px]">
            <EtikettFeld
              color="var(--c2-orchid)"
              textColor="var(--c2-field-text)"
              tab={{ h: 44, pl: 20, pr: 32 }}
              tabLg={{ h: 64, pl: 64, pr: 40 }}
              etikett={<p className="m-0 whitespace-nowrap text-[13px] font-semibold leading-none lg:text-[16px]">{t.anspruch.rubrik}</p>}
            >
              <div className="px-[24px] pb-[40px] pt-[76px] lg:px-[64px] lg:pb-[90px] lg:pt-[136px]">
                <h2 id="c2-ansp" className={`${H2_SCHARF} text-balance text-[36px] leading-[1.06] tracking-[-0.025em] lg:whitespace-nowrap lg:text-[length:min(112px,7.778vw)] lg:leading-[0.96] lg:tracking-[-0.03em]`}>
                  <Zeilen zeilen={t.anspruch.titelZeilen} />
                </h2>
              </div>
            </EtikettFeld>
          </section>

          {/* ============ FAQ ============ */}
          <section id="faq" aria-labelledby="c2-faq" className="flex flex-col px-[24px] pb-[40px] pt-[56px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[80px] lg:py-[120px]">
            <h2 id="c2-faq" className={`${H2_SCHARF} text-balance text-[30px] leading-[1.06] tracking-[-0.025em] lg:col-span-4 lg:whitespace-nowrap lg:text-[length:min(48px,3.333vw)] lg:leading-[1.05]`}>
              <Zeilen zeilen={t.faq.titelZeilen} />
            </h2>
            <div className="mt-[24px] border-b-2 lg:col-span-7 lg:col-start-6 lg:mt-0" style={{ borderColor: 'var(--c2-ink)' }}>
              {t.faq.eintraege.map((f) => (
                <details key={f.frage} className="c2-motion border-t-2" style={{ borderColor: 'var(--c2-ink)' }}>
                  <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-[16px] py-[14px] text-[18px] font-semibold leading-[1.3] lg:h-[78px] lg:min-h-0 lg:gap-[24px] lg:py-0 lg:text-[22px] lg:leading-[1.2]">
                    <span>{f.frage}</span>
                    <Plus size={20} strokeWidth={2.4} className="transition-transform duration-200 lg:hidden" />
                    <Plus size={24} strokeWidth={2.5} className="hidden transition-transform duration-150 ease-out lg:block" />
                  </summary>
                  <p className="m-0 mb-[20px] text-pretty text-[16px] leading-[1.55] lg:mb-[28px] lg:max-w-[600px] lg:text-[18px] lg:text-[color:var(--c2-muted)]">{f.antwort}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ============ KONTAKT ============ */}
          <section id="kontakt" aria-labelledby="c2-kontakt" className="flex flex-col px-[24px] pb-[56px] pt-[40px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[80px] lg:pb-[120px] lg:pt-0">
            <div className="flex flex-col lg:col-span-6 lg:gap-[28px]">
              <h2 id="c2-kontakt" className={`${H2_SCHARF} text-balance text-[32px] leading-[1.06] tracking-[-0.025em] lg:whitespace-nowrap lg:text-[length:min(52px,3.611vw)] lg:leading-[1.04]`}>
                <Zeilen zeilen={t.kontakt.titelZeilen} />
              </h2>
              <p className="m-0 mt-[16px] text-pretty text-[18px] leading-[1.55] lg:mt-0 lg:max-w-[520px] lg:text-[20px] lg:leading-[1.5]">
                {t.kontakt.textVor}
                <span className="whitespace-nowrap">{t.kontakt.textNowrap}</span>
                {t.kontakt.textNach}
              </p>
            </div>
            <Kontaktformular t={t.kontakt} />
          </section>
        </main>

        <StartFuss t={t} thema={thema} onThema={umschalten} />
      </div>

      <MobilMenue offen={menue} onSchliessen={menueZu} punkte={[...hauptnav, kontaktLink]} kontakt={kontaktLink} t={t} thema={thema} onThema={umschalten} />
    </div>
  )
}
