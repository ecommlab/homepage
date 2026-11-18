import { satz } from './c2Text'
import { appLocales, lokalPfad, tr } from './i18n'
import type { AppLocale } from './i18n'
import { getJobBySlug, jobs } from './jobs'
import { leistungDetails } from './leistungDetails'
import type { LeistungDetail } from './leistungDetails'
import { getCaseBySlug, portfolioCases } from './portfolioCases'
import { startseiteInhalt } from './startseiteInhalt'
import { team } from './team'
import { leistungsNamen } from './unterseitenInhalt'

/**
 * Strukturierte Daten (schema.org als JSON-LD) für jede Seite in jeder Sprache.
 *
 * Warum zentral und nicht je Seite: Die Angaben über die Firma müssen auf allen
 * Seiten gleich sein, und eine Seite ohne JSON-LD fällt im Audit sofort auf.
 * pages/_document.tsx ruft deshalb für jeden Pfad diese eine Funktion auf; eine
 * neue Seite bekommt so mindestens Organisation und Website, ohne dass jemand
 * daran denken muss.
 *
 * Warum im _document und nicht in _app: _app läuft auch im Browser, und alles,
 * was es importiert, landet im JavaScript jeder Seite — hier wären das sämtliche
 * Inhaltsdateien (rund 25 kB mehr auf jeder Seite, auch der Startseite, deren
 * Ladezeit wir mühsam gedrückt haben). Das _document läuft nur auf dem Server.
 * Suchmaschinen laden jede URL einzeln; dass das JSON-LD bei Navigation im
 * Browser auf dem Stand der Einstiegsseite bleibt, sieht niemand.
 *
 * Warum aus den Inhaltsdateien: Suchmaschinen werten es als Täuschung, wenn
 * JSON-LD etwas anderes behauptet als die sichtbare Seite. Titel, Texte und
 * FAQ kommen daher aus denselben Quellen wie die Anzeige (lib/leistungDetails,
 * lib/startseiteInhalt, lib/portfolioCases …). Nichts hier ist erfunden —
 * Angaben, die die Seite nicht hat (Arbeitsort und Datum der Stellen,
 * Einsatzgebiet der Leistungen), fehlen auch im JSON-LD.
 *
 * Alle Knoten stehen in einem @graph und verweisen per @id aufeinander, damit
 * Organisation und Website nur einmal beschrieben werden.
 */

type Knoten = Record<string, unknown>

/** Fallback, falls NEXT_PUBLIC_SITE_URL beim Build fehlt — JSON-LD braucht absolute URLs. */
const STANDARD_BASIS = 'https://ecommlab.io'

/** Gesetzter Satz ohne geschützte Leerzeichen: Die braucht nur die Anzeige. */
const klartext = (s: string) => satz(s).replace(/ /g, ' ')

const sprachcode: Record<AppLocale, string> = { de: 'de-DE', en: 'en', bg: 'bg' }

type Brotkrume = { name: string; pfad: string }

type Seite = {
  typ: string | string[]
  name: string
  krumen: Brotkrume[]
  /** Hauptgegenstand der Seite (Leistung, Referenz …), wird als eigener Knoten angehängt. */
  haupt?: Knoten
  /** Weitere Knoten nur dieser Seite (z. B. Personen auf /team). */
  extra?: Knoten[]
  /** Zusätzliche Felder am Seitenknoten (z. B. FAQ-Fragen). */
  felder?: Knoten
}

function startKrume(locale: AppLocale): Brotkrume {
  return { name: tr(locale, 'Startseite', 'Home', 'Начало'), pfad: '/' }
}

/** Liefert die Beschreibung einer Seite oder null für unbekannte Pfade (404, Weiterleitungen). */
function seiteFuer(pfad: string, locale: AppLocale, ids: Ids): Seite | null {
  const start = startKrume(locale)
  const teile = pfad.split('/').filter(Boolean)

  if (teile.length === 0) {
    const faq = startseiteInhalt(locale).faq.eintraege
    return {
      // Die Startseite ist zugleich die FAQ-Seite: Die Fragen stehen sichtbar auf ihr.
      typ: faq.length ? ['WebPage', 'FAQPage'] : 'WebPage',
      name: 'Ecommlab',
      krumen: [],
      felder: faq.length
        ? {
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.frage,
              acceptedAnswer: { '@type': 'Answer', text: f.antwort },
            })),
          }
        : undefined,
    }
  }

  const [bereich, slug, ...rest] = teile
  if (rest.length) return null

  switch (bereich) {
    case 'leistungen': {
      const name = tr(locale, 'Leistungen', 'Services', 'Услуги')
      const krume = { name, pfad: '/leistungen' }
      if (!slug) {
        return {
          typ: 'CollectionPage',
          name,
          krumen: [start, krume],
          felder: {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: leistungDetails.map((l, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: leistungsNamen[l.slug][locale],
                url: ids.url(`/leistungen/${l.slug}`),
              })),
            },
          },
        }
      }
      const l = leistungDetails.find((x) => x.slug === slug)
      if (!l) return null
      const kurz = leistungsNamen[l.slug as LeistungDetail['slug']][locale]
      return {
        typ: 'WebPage',
        name: klartext(l.title[locale]),
        krumen: [start, krume, { name: kurz, pfad: `/leistungen/${l.slug}` }],
        haupt: {
          '@type': 'Service',
          '@id': `${ids.url(`/leistungen/${l.slug}`)}#service`,
          name: kurz,
          serviceType: kurz,
          description: klartext(l.intro[locale]),
          provider: { '@id': ids.organisation },
          url: ids.url(`/leistungen/${l.slug}`),
        },
      }
    }

    case 'referenzen': {
      const name = tr(locale, 'Referenzen', 'Projects', 'Референции')
      const krume = { name, pfad: '/referenzen' }
      if (!slug) {
        return {
          typ: 'CollectionPage',
          name,
          krumen: [start, krume],
          felder: {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: portfolioCases.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.title,
                url: ids.url(`/referenzen/${c.slug}`),
              })),
            },
          },
        }
      }
      const c = getCaseBySlug(slug)
      if (!c) return null
      const kunde: Knoten = { '@type': 'Organization', name: c.meta.clientName }
      if (c.meta.clientUrl) kunde.url = c.meta.clientUrl
      return {
        typ: 'WebPage',
        name: c.title,
        krumen: [start, krume, { name: c.title, pfad: `/referenzen/${c.slug}` }],
        haupt: {
          '@type': 'CreativeWork',
          '@id': `${ids.url(`/referenzen/${c.slug}`)}#projekt`,
          name: c.title,
          description: c.summary ? klartext(c.summary[locale]) : undefined,
          creator: { '@id': ids.organisation },
          sourceOrganization: { '@id': ids.organisation },
          about: kunde,
          keywords: c.tags.join(', '),
          image: ids.url(c.imageSrc, false),
          url: ids.url(`/referenzen/${c.slug}`),
        },
      }
    }

    case 'karriere': {
      const name = tr(locale, 'Karriere', 'Careers', 'Кариери')
      const krume = { name, pfad: '/karriere' }
      if (!slug) {
        return {
          typ: 'CollectionPage',
          name,
          krumen: [start, krume],
          felder: {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: jobs.map((j, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: klartext(j.title[locale]),
                url: ids.url(`/karriere/${j.slug}`),
              })),
            },
          },
        }
      }
      const job = getJobBySlug(slug)
      if (!job) return null
      // Bewusst kein JobPosting: Google verlangt dafür Arbeitsort und
      // Veröffentlichungsdatum, und beides steht nicht in lib/jobs.ts.
      // Erfundene Werte wären schlechter als keine (manuelle Maßnahme droht).
      const titel = klartext(job.title[locale])
      return { typ: 'WebPage', name: titel, krumen: [start, krume, { name: titel, pfad: `/karriere/${job.slug}` }] }
    }

    case 'team': {
      if (slug) return null
      const name = tr(locale, 'Team', 'Team', 'Екип')
      return {
        typ: 'AboutPage',
        name,
        krumen: [start, { name, pfad: '/team' }],
        felder: { about: { '@id': ids.organisation } },
        extra: team.map((m) => {
          const person: Knoten = {
            '@type': 'Person',
            '@id': `${ids.url('/team')}#${m.slug}`,
            name: m.name,
            jobTitle: m.role[locale],
            worksFor: { '@id': ids.organisation },
          }
          if (m.linkedin) person.sameAs = [m.linkedin]
          return person
        }),
      }
    }

    case 'kontakt': {
      if (slug) return null
      const name = tr(locale, 'Kontakt', 'Contact', 'Контакт')
      return { typ: 'ContactPage', name, krumen: [start, { name, pfad: '/kontakt' }], felder: { about: { '@id': ids.organisation } } }
    }

    case 'impressum':
    case 'datenschutzbestimmungen':
    case 'nutzungsbedingungen': {
      if (slug) return null
      const name =
        bereich === 'impressum'
          ? tr(locale, 'Impressum', 'Legal notice', 'Импресум')
          : bereich === 'datenschutzbestimmungen'
            ? tr(locale, 'Datenschutzbestimmungen', 'Privacy policy', 'Политика за поверителност')
            : tr(locale, 'AGB', 'Terms', 'Общи условия')
      return { typ: 'WebPage', name, krumen: [start, { name, pfad: `/${bereich}` }] }
    }

    default:
      return null
  }
}

type Ids = {
  organisation: string
  website: string
  /** Absolute URL; lokalisiert = mit Sprachpräfix (Seiten), sonst ohne (Bilder, Logo). */
  url: (pfad: string, lokalisiert?: boolean) => string
}

/** Pfad ohne Sprachpräfix, Query und Anker: „/en/team?x=1“ → „/team“. */
export function pfadOhneSprache(asPath: string): string {
  const pfad = asPath.split('#')[0]?.split('?')[0] || '/'
  for (const l of appLocales) {
    if (pfad === `/${l}`) return '/'
    if (pfad.startsWith(`/${l}/`)) return pfad.slice(l.length + 1) || '/'
  }
  return pfad
}

/**
 * Der vollständige JSON-LD-Graph für einen Pfad (ohne Sprachpräfix) in einer Sprache.
 * Bei unbekannten Pfaden stehen nur Organisation und Website darin.
 */
export function strukturierteDaten(pfad: string, locale: AppLocale, basisUrl?: string): Knoten {
  const basis = (basisUrl || STANDARD_BASIS).replace(/\/$/, '')
  const ids: Ids = {
    organisation: `${basis}/#organisation`,
    website: `${basis}/#website`,
    url: (p, lokalisiert = true) => `${basis}${lokalisiert ? lokalPfad(locale, p) : p}`,
  }

  // Angaben wie im Impressum (pages/impressum.tsx) — dort ändern heißt hier ändern.
  const organisation: Knoten = {
    '@type': 'Organization',
    '@id': ids.organisation,
    name: 'Ecommlab',
    legalName: 'Ecommlab GmbH',
    url: `${basis}/`,
    logo: { '@type': 'ImageObject', url: `${basis}/brand/logo.svg` },
    email: 'hello@ecommlab.io',
    telephone: '+49 89 41616248',
    vatID: 'DE366772858',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Turnerstraße 15',
      postalCode: '81827',
      addressLocality: 'München',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@ecommlab.io',
      telephone: '+49 89 41616248',
      availableLanguage: ['de', 'en', 'bg'],
    },
    knowsLanguage: ['de', 'en', 'bg'],
  }

  const website: Knoten = {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${basis}/`,
    name: 'Ecommlab',
    publisher: { '@id': ids.organisation },
    inLanguage: ['de-DE', 'en', 'bg'],
  }

  const graph: Knoten[] = [organisation, website]
  const seite = seiteFuer(pfad, locale, ids)

  if (seite) {
    const url = ids.url(pfad)
    const seitenKnoten: Knoten = {
      '@type': seite.typ,
      '@id': `${url}#webpage`,
      url,
      name: seite.name,
      inLanguage: sprachcode[locale],
      isPartOf: { '@id': ids.website },
      publisher: { '@id': ids.organisation },
      ...seite.felder,
    }
    if (seite.haupt) seitenKnoten.mainEntity = { '@id': seite.haupt['@id'] }
    if (seite.krumen.length) {
      seitenKnoten.breadcrumb = { '@id': `${url}#breadcrumb` }
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: seite.krumen.map((k, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: k.name,
          item: ids.url(k.pfad),
        })),
      })
    }
    graph.push(seitenKnoten)
    if (seite.haupt) graph.push(seite.haupt)
    if (seite.extra) graph.push(...seite.extra)
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/**
 * JSON für <script type="application/ld+json">: „<“ maskiert, damit ein Text
 * wie „</script>“ in Inhalten das Skript nie vorzeitig beendet.
 */
export function alsJsonLd(daten: Knoten): string {
  return JSON.stringify(daten).replace(/</g, '\\u003c')
}
