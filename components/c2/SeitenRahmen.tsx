import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import { normalizeLocale } from '../../lib/i18n'
import { geologica } from '../../lib/fonts'
import { startseiteInhalt } from '../../lib/startseiteInhalt'
import { EtikettFeld, Koernung } from './EtikettFeld'
import { Menue } from './Icons'
import { EcommlabLogo } from './Marken'
import { MobilMenue } from './MobilMenue'
import { ReiterNav } from './ReiterNav'
import { StartFuss } from './StartFuss'
import { useThema } from './useThema'

/**
 * Rahmen aller C2-Unterseiten: Papiergrund, Körnung, Hero-Farbfeld mit Logo-Etikett und Kopf, Inhalt, Fuß, Mobil-Menü.
 *
 * Feldfarbe codiert den Bereich (Board „C2 · ecommlab-Website“):
 *   'orchidee' – Kundenseiten (Leistungen, Leistungsdetails, Team, Kontakt) · Text Tinte, Kontakt als Tinten-Pille
 *   'tinte'    – Referenzen, Referenzdetails, Rechtliches                     · Text Papier, Kontakt als Papier-Pille
 *   'pflaume'  – Karriere und Stellen („du“)                                  · Text Papier, Kontakt als Papier-Pille
 *
 * Kopf Desktop (≥ 1024 px): Etikett 264 × 96 mit Logo 160 px · Navigation rechts, 26 px unter der Feldkante, Abstand 28 px ·
 *   aktiver Bereich mit ruhendem Papier-Reiter · Sprache DE · EN · Kontakt-Pille 44 hoch (auf der Kontaktseite Umriss, aria-current).
 * Kopf mobil: Etikett 156 × 64 mit Logo 124 px · Menüknopf 48 × 48 rechts oben (10/10).
 */
export type FeldArt = 'orchidee' | 'tinte' | 'pflaume'
export type Bereich = '/leistungen' | '/referenzen' | '/team' | '/karriere' | '/kontakt'

const FELD: Record<FeldArt, { color: string; text: string; dark: boolean }> = {
  orchidee: { color: 'var(--c2-orchid)', text: 'var(--c2-field-text)', dark: false },
  tinte: { color: 'var(--c2-ink-field)', text: 'var(--c2-on-ink)', dark: true },
  pflaume: { color: 'var(--c2-pflaume)', text: 'var(--c2-on-ink)', dark: true },
}

export function SeitenRahmen({
  feld,
  bereich,
  aktivTyp = 'page',
  heroId = 'hero',
  heroLabelledBy,
  heroKlasse,
  hero,
  heroNeben,
  children,
}: {
  feld: FeldArt
  /** aktiver Navigationspunkt (Reiter); auf Rechtsseiten leer */
  bereich?: Bereich
  /** 'page' auf Übersichtsseiten, 'true' auf Detailseiten */
  aktivTyp?: 'page' | 'true'
  heroId?: string
  heroLabelledBy: string
  /** Innenabstände des Hero-Inhalts (mobil und lg:) */
  heroKlasse: string
  /** Hero-Inhalt; bekommt das Feld als Zeigerbereich (für SchaerfeTitel) */
  hero: (feldRef: RefObject<HTMLDivElement>) => ReactNode
  /**
   * Element, das auf Desktop IM Hero-Feld liegt (Spalten 7–12, 152 px unter der Feldkante, 72 px Abstand unten),
   * mobil aber UNTER dem Feld steht – z. B. das Formular der Kontaktseite. Es wird nur einmal gerendert (ein gemeinsames Raster),
   * das Feld wächst auf Desktop mit, wenn das Element höher wird (Fehlermeldungen, Captcha).
   */
  heroNeben?: ReactNode
  children: ReactNode
}) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const t = startseiteInhalt(locale)
  const en = locale === 'en'
  const f = FELD[feld]
  const hell = feld !== 'orchidee'

  const feldRef = useRef<HTMLDivElement>(null)
  const [lasche, setLasche] = useState(false)
  const [menue, setMenue] = useState(false)
  const { thema, umschalten } = useThema()
  const menueZu = useCallback(() => setMenue(false), [])

  const hauptnav = [
    { href: '/leistungen', label: t.nav.leistungen },
    { href: '/referenzen', label: t.nav.referenzen },
    { href: '/team', label: t.nav.team },
    { href: '/karriere', label: t.nav.karriere },
  ]
  const kontaktLink = { href: '/kontakt', label: t.nav.kontakt }
  const kontaktAktiv = bereich === '/kontakt'
  const kontaktKlasse = kontaktAktiv ? 'c2-pill-feld-line' : hell ? 'c2-pill-papier' : 'c2-pill-feld'
  const sprachLink = 'inline-flex min-h-[44px] items-center px-[4px] font-medium no-underline hover:underline'

  return (
    <div className={`c2-seite ${geologica.variable} min-h-screen`}>
      <Koernung opacity={0.06} className="!fixed z-[60]" />
      <div className="mx-auto max-w-[1440px]">
        <main>
          <div className={heroNeben ? 'lg:grid lg:grid-cols-[56px_repeat(12,minmax(0,1fr))_56px] lg:gap-x-[24px]' : undefined}>
          <section id={heroId} aria-labelledby={heroLabelledBy} className={`px-[16px] pt-[16px] ${heroNeben ? 'lg:col-[1/-1] lg:row-start-1 lg:flex lg:flex-col' : ''}`}>
            <div ref={feldRef} className={heroNeben ? 'lg:flex lg:flex-1 lg:flex-col' : undefined}>
              <EtikettFeld
                className={heroNeben ? 'lg:flex-1' : ''}
                color={f.color}
                textColor={f.text}
                dark={f.dark}
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
                  <ReiterNav items={hauptnav} active={bereich === '/kontakt' ? undefined : bereich} aktivTyp={aktivTyp} ariaLabel={t.kopf.hauptnavigation} textFarbe={f.text} />
                  <nav aria-label={t.kopf.sprache} className="flex items-center gap-[2px] text-[15px] leading-none" style={{ color: f.text }}>
                    {en ? (
                      <Link href={router.asPath} locale="de" lang="de" hrefLang="de" aria-label="Deutsch" className={sprachLink}>
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
                      <Link href={router.asPath} locale="en" lang="en" hrefLang="en" aria-label="English" className={sprachLink}>
                        EN
                      </Link>
                    )}
                  </nav>
                  <Link
                    href={kontaktLink.href}
                    aria-current={kontaktAktiv ? 'page' : undefined}
                    className={`${kontaktKlasse} inline-flex h-[44px] items-center justify-center whitespace-nowrap rounded-full px-[20px] text-[15px] font-semibold leading-none no-underline`}
                  >
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
                  style={{ color: f.text }}
                >
                  <Menue />
                </button>

                <div className={`relative ${heroKlasse}`}>{hero(feldRef)}</div>
              </EtikettFeld>
            </div>
          </section>
          {heroNeben ? <div className="relative z-[4] lg:col-span-6 lg:col-start-8 lg:row-start-1 lg:mb-[72px] lg:mt-[152px] lg:self-start">{heroNeben}</div> : null}
          </div>
          {children}
        </main>
        <StartFuss t={t} thema={thema} onThema={umschalten} />
      </div>
      <MobilMenue offen={menue} onSchliessen={menueZu} punkte={[...hauptnav, kontaktLink]} kontakt={kontaktLink} t={t} thema={thema} onThema={umschalten} />
    </div>
  )
}
