import type { AppLocale } from './i18n'
import type { LeistungDetail } from './leistungDetails'

/**
 * Feste Texte der C2-Unterseiten (DE/EN). Inhalte aus Datendateien (Leistungsdetails, Referenzen, Stellen, Team)
 * kommen weiterhin aus lib/*.ts; hier stehen nur Überschriften, Rubriken, Buttons und Überleitungen.
 * DE = Canvas-Boards (verbindlich), EN = bisherige Übersetzungen der Seiten bzw. sinngemäß ergänzt.
 * `…Zeilen`: Zeilenumbrüche nur ab 1024 px.
 */
type L = { de: string; en: string }
type LZ = { de: readonly string[]; en: readonly string[] }

export const pick = (locale: AppLocale, t: L) => (locale === 'en' ? t.en : t.de)
export const pickZ = (locale: AppLocale, t: LZ) => (locale === 'en' ? t.en : t.de)

/* ------------------------------------------------------------------ gemeinsam */
export const gemeinsam = {
  kontaktAufnehmen: { de: 'Kontakt aufnehmen', en: 'Contact' },
  kontaktierenSieUns: { de: 'Kontaktieren Sie uns', en: 'Get in touch' },
  zumKontakt: { de: 'Zum Kontakt', en: 'Contact' },
  referenzenAnsehen: { de: 'Referenzen ansehen', en: 'View work' },
  mehrErfahren: { de: 'Mehr erfahren', en: 'Learn more' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Write an email' },
  /** Schlussband „Mehr Umsatz …“ (Leistungsdetails, Referenzen) – Leitsatz der Startseite */
  mehrUmsatzZeilen: {
    de: ['Mehr Umsatz, bessere', 'Kundenerlebnisse,', 'reibungslose Prozesse –', 'mit Ecommlab.'],
    en: ['More revenue, better', 'customer experiences,', 'smoother operations –', 'with Ecommlab.'],
  },
  mehrUmsatzText: {
    de: 'Von der Optimierung bis zur Skalierung – wir machen Ihr E-Commerce fit für die Zukunft.',
    en: 'From optimization to scaling — we get your e-commerce ready for the future.',
  },
}

/* ------------------------------------------------------------------ Leistungsdetails */
export const leistungDetail = {
  zurueck: { de: 'Zurück zu Leistungen', en: 'Back to services' },
}

/* ------------------------------------------------------------------ Leistungen (Übersicht) */
export type LeistungsGruppe = { titel: L; titelZeilen: LZ; slugs: readonly LeistungDetail['slug'][] }

/** Kurzname je Leistung (Register), Text = Titel der Detailseite (lib/leistungDetails.ts) */
export const leistungsNamen: Record<LeistungDetail['slug'], L> = {
  'e-commerce': { de: 'E-Commerce', en: 'E-commerce' },
  'web-development': { de: 'Webentwicklung', en: 'Web development' },
  'platform-integration': { de: 'Plattform-Integrationen', en: 'Platform integrations' },
  'prerformance-boosting': { de: 'Performance Boosting', en: 'Performance boosting' },
  'ux-design-usability': { de: 'UX-Design & Usability', en: 'UX design & usability' },
  onlinemarketing: { de: 'Online-Marketing', en: 'Online marketing' },
  'seo-content': { de: 'SEO & Content', en: 'SEO & content' },
  'strategy-consulting': { de: 'Strategie & Beratung', en: 'Strategy & consulting' },
  'ki-automation': { de: 'KI & Automatisierung', en: 'AI & automation' },
  'partners-und-tools': { de: 'Partner & Tools', en: 'Partners & tools' },
}

export const leistungen = {
  rubrik: { de: 'Leistungen', en: 'Services' },
  titelZeilen: {
    de: ['Von Strategie bis Umsetzung –', 'mit Fokus auf Wachstum,', 'Experience und Performance'],
    en: ['From strategy to delivery —', 'focused on growth,', 'experience and performance'],
  },
  ueberblick: { de: 'Überblick', en: 'Overview' },
  alleTitel: { de: 'Alle Leistungen', en: 'All services' },
  alleText: { de: 'Schnellzugriff auf die einzelnen Leistungsbereiche.', en: 'Quick access to all service areas.' },
  gruppen: [
    {
      titel: { de: 'Digitale Präsenz & Entwicklung', en: 'Digital presence & development' },
      titelZeilen: { de: ['Digitale Präsenz', '& Entwicklung'], en: ['Digital presence', '& development'] },
      slugs: ['e-commerce', 'web-development', 'platform-integration', 'prerformance-boosting'],
    },
    {
      titel: { de: 'User Experience & Design', en: 'User experience & design' },
      titelZeilen: { de: ['User Experience', '& Design'], en: ['User experience', '& design'] },
      slugs: ['ux-design-usability'],
    },
    {
      titel: { de: 'Marketing & Wachstum', en: 'Marketing & growth' },
      titelZeilen: { de: ['Marketing', '& Wachstum'], en: ['Marketing', '& growth'] },
      slugs: ['onlinemarketing', 'seo-content'],
    },
    {
      titel: { de: 'Strategie & Innovation', en: 'Strategy & innovation' },
      titelZeilen: { de: ['Strategie', '& Innovation'], en: ['Strategy', '& innovation'] },
      slugs: ['strategy-consulting', 'ki-automation'],
    },
  ] as readonly LeistungsGruppe[],
  strategischRubrik: { de: 'Strategisch', en: 'Strategy' },
  strategischZeilen: {
    de: ['Strategische Auswahl von Partnern,', 'Systemen und Tools'],
    en: ['Strategic selection of partners,', 'systems, and tools'],
  },
  strategischText: {
    de: 'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E-Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben – entscheidend für langfristigen Erfolg in einem sich schnell entwickelnden Markt.',
    en: 'Careful selection of partners, systems, and tools helps you stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
  },
  erfahrungRubrik: { de: 'Erfahrung', en: 'Experience' },
  erfahrungZeilen: { de: ['Wir verstehen Enterprise', 'und Mittelstand'], en: ['We understand', 'enterprise & SMB'] },
  erfahrungText: {
    de: 'Wir haben mit zahlreichen Enterprise- und Mittelstand-Kunden gearbeitet, für die wir skalierbare Lösungen umgesetzt haben. Diese Skills setzen wir bei all unseren Projekten ein.',
    en: 'We’ve worked with many enterprise and SMB clients and delivered scalable solutions. We bring these skills to every single project.',
  },
  kontaktText: {
    de: 'Wenn Sie uns sagen, welche Leistungsbereiche Sie als Nächstes ausbauen wollen, können wir die passenden nächsten Schritte planen.',
    en: 'Tell us which service areas you want to expand next — and we’ll plan the right next steps together.',
  },
}

/* ------------------------------------------------------------------ Referenzen */
export const referenzen = {
  rubrik: { de: 'Referenzen', en: 'Cases' },
  titelZeilen: { de: ['Projekte, die wir', 'umgesetzt haben'], en: ['Projects', 'we delivered'] },
  erfolgreich: { de: 'erfolgreiche Projekte', en: 'successful projects' },
  projekte: { de: 'Projekte', en: 'Projects' },
  zurueck: { de: 'Zurück zu Referenzen', en: 'Back to projects' },
  nachbarn: { de: 'Weitere Referenzen', en: 'More projects' },
  service: { de: 'Service', en: 'Service' },
  technologie: { de: 'Technologie', en: 'Technology' },
  datum: { de: 'Datum', en: 'Date' },
  ort: { de: 'Ort', en: 'Location' },
  keyfacts: { de: 'Keyfacts', en: 'Key facts' },
}

/* ------------------------------------------------------------------ Team */
export const teamSeite = {
  rubrik: { de: 'Unser Team', en: 'Our team' },
  titelZeilen: { de: ['Die Menschen', 'hinter Ecommlab'], en: ['The people', 'behind Ecommlab'] },
  intro: {
    de: 'Ein schlagkräftiges Team aus klugen Köpfen, das jede Aufgabe meistert. Zusätzlich verfügen wir über ein breites Netzwerk an Experten, die wir bei Bedarf projektbezogen heranziehen können – mit Ecommlab als Hauptansprechpartner für Kommunikation, Steuerung und Qualitätssicherung.',
    en: 'A close-knit team of bright minds that delivers on any challenge. We also have a broad network of specialists we can bring in on demand — with Ecommlab as your single point of contact for communication, coordination and quality assurance.',
  },
  gf: { de: 'Geschäftsführung', en: 'Management' },
  gfSatz: {
    de: 'Über 30 Jahre gemeinsame Erfahrung in E-Commerce, Software-Entwicklung und Performance Marketing.',
    en: 'More than 30 combined years of experience in e-commerce, software development and performance marketing.',
  },
  ueber: { de: 'Über', en: 'More than' },
  jahreZeilen: {
    de: ['Jahre gemeinsame Erfahrung in', 'E-Commerce, Software-Entwicklung und', 'Performance Marketing.'],
    en: ['combined years of experience in', 'e-commerce, software development and', 'performance marketing.'],
  },
  /** Bio-Absatz 2 beginnt mit diesem Wort (Board: zwei Absätze) */
  schwerpunkte: { de: 'Schwerpunkte:', en: 'Focus areas:' },
  teamTitel: { de: 'Das Team', en: 'The team' },
  teamText: { de: 'Spezialist:innen aus Entwicklung, Design, Marketing und Projektmanagement.', en: 'Specialists from development, design, marketing and project management.' },
  mitZeilen: { de: ['Werden Sie Teil', 'unseres Teams'], en: ['Become part', 'of our team'] },
  mitText: {
    de: 'Wir suchen regelmäßig Verstärkung – werfen Sie einen Blick auf unsere offenen Positionen oder schreiben Sie uns eine Initiativbewerbung.',
    en: 'We’re regularly hiring — check out our open positions or send us a speculative application.',
  },
  offenePositionen: { de: 'Offene Positionen', en: 'Open positions' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Send email' },
}

/** Porträts der Geschäftsführung (Originalfotos aus public/) – Alt-Text beschreibt das Bild */
export const teamFotos: Record<string, { src: string; alt: L; mobilPos: string }> = {
  'andrey-cekovski': {
    src: '/andrey.jpeg',
    alt: { de: 'Porträt Andrey Cekovski mit verschränkten Armen, dunkles Sakko und weißes Hemd vor grauem Grund', en: 'Portrait of Andrey Cekovski with folded arms, dark jacket and white shirt on a grey background' },
    mobilPos: '50% 20%',
  },
  'pavel-mihaylov': {
    src: '/Pavel_Mihaylov.png',
    alt: { de: 'Porträt Pavel Mihaylov in dunklem Sakko und weißem Hemd vor blaugrauem Grund', en: 'Portrait of Pavel Mihaylov in a dark jacket and white shirt on a blue-grey background' },
    mobilPos: '40% 20%',
  },
}

/* ------------------------------------------------------------------ Karriere & Stellen */
export const karriere = {
  rubrik: { de: 'Karriere', en: 'Careers' },
  titelWoerter: { de: ['Komm', 'in', 'unser', 'Team'], en: ['Join', 'our', 'team'] },
  lead: {
    de: 'In unserem Team erlebst du eine außergewöhnliche und einzigartige Arbeitsatmosphäre, geprägt durch die Zusammenarbeit mit hochqualifizierten Spezialisten.',
    en: 'In our team, you’ll experience a unique atmosphere shaped by collaboration with highly qualified specialists.',
  },
  arbeitsweise: { de: 'Arbeitsweise', en: 'How we work' },
  absaetze: [
    {
      de: 'Von ihnen kannst du auf hohem Niveau lernen und wesentlich zur Entwicklung von Spitzenprodukten beitragen. Du erhältst die Chance, an der Entwicklung innovativer Funktionen mitzuwirken, die das moderne E-Commerce-Erlebnis entscheidend verbessern. Trotz unserer umfassenden Erfahrung genießen wir die Dynamik und Flexibilität einer Start-up-Kultur, in der wir Projekte von der Basis auf neu aufbauen.',
      en: 'You will learn at a high level and contribute to building great products. You’ll help develop innovative features that improve modern e-commerce experiences. Despite our experience, we keep the dynamism and flexibility of a start-up culture and rebuild projects from the ground up.',
    },
    {
      de: 'Wir fördern in dir eine Kultur des kalkulierten Risikos, erkennen den Wert von Fehlern an und nutzen diese als Lernchancen für das gesamte Team. Unsere Unternehmenskultur ist von Offenheit und Transparenz geprägt, und wir sind stets offen für deine innovativen Ideen. Wir schätzen deine frischen Perspektiven und kreativen Impulse, die du in unser Unternehmen einbringst, und freuen uns auf die fortlaufende Bereicherung unserer Arbeitsweise durch deine Beiträge.',
      en: 'We promote a culture of calculated risk, value mistakes as learning opportunities, and grow together as a team. Our culture is open and transparent, and we welcome your ideas. We value fresh perspectives and creative impulses — and look forward to your contributions.',
    },
  ],
  schnellkontakt: { de: 'Schnellkontakt', en: 'Quick contact' },
  passt: { de: 'Passt das zu dir?', en: 'Is this you?' },
  passtText: { de: 'Schick uns ein paar Infos zu dir – wir melden uns zeitnah.', en: 'Send us a few details about you — we’ll get back to you soon.' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Send email' },
  offenePositionen: { de: 'Offene Positionen', en: 'Open positions' },
  positionenText: { de: 'Aktuell suchen wir Unterstützung in diesen Bereichen.', en: 'We are currently hiring for these roles.' },
  zurueck: { de: 'Zurück zur Karriereübersicht', en: 'Back to careers' },
  bewerben: { de: 'Bewerben', en: 'Apply' },
  bewirbDich: { de: 'Bewirb dich unter', en: 'Apply via' },
  betreff: { de: 'Bewerbung', en: 'Application' },
}

/* ------------------------------------------------------------------ Kontakt */
export const firma = {
  name: 'Ecommlab GmbH',
  strasse: 'Turnerstraße 15',
  ort: '81827 München',
  email: 'hello@ecommlab.io',
  telefon: '+49 89 41 61 62 48',
  telefonHref: 'tel:+498941616248',
}

export const kontaktSeite = {
  rubrik: { de: 'Kontakt', en: 'Contact' },
  titelZeilen: {
    de: ['Sie wollen ein neues', 'Projekt starten, in unser', 'Team kommen oder nur', '„Hi“ sagen?'],
    en: ['Want to start', 'a new project, join', 'our team, or just', 'say hi?'],
  },
  lead: { de: 'Wir freuen uns auf Ihre Nachricht.', en: 'We look forward to hearing from you.' },
  direkt: { de: 'Direkter Kontakt', en: 'Direct contact' },
  email: { de: 'E-Mail', en: 'Email' },
  telefon: { de: 'Telefon', en: 'Phone' },
  adresse: { de: 'Adresse', en: 'Address' },
}
