import type { AppLocale } from './i18n'
import type { LeistungDetail } from './leistungDetails'

/**
 * Feste Texte der C2-Unterseiten (DE/EN/BG). Inhalte aus Datendateien (Leistungsdetails, Referenzen, Stellen, Team)
 * kommen weiterhin aus lib/*.ts; hier stehen nur Überschriften, Rubriken, Buttons und Überleitungen.
 * DE = Canvas-Boards (verbindlich), EN = bisherige Übersetzungen der Seiten bzw. sinngemäß ergänzt,
 * BG = Übersetzung aus dem Deutschen (Kunden: «Вие», Karriere: «ти»).
 * `…Zeilen`: Zeilenumbrüche nur ab 1024 px.
 */
type L = { de: string; en: string; bg: string }
type LZ = { de: readonly string[]; en: readonly string[]; bg: readonly string[] }

export const pick = (locale: AppLocale, t: L) => t[locale]
export const pickZ = (locale: AppLocale, t: LZ) => t[locale]

/* ------------------------------------------------------------------ gemeinsam */
export const gemeinsam = {
  kontaktAufnehmen: { de: 'Kontakt aufnehmen', en: 'Contact', bg: 'Свържете се с нас' },
  kontaktierenSieUns: { de: 'Kontaktieren Sie uns', en: 'Get in touch', bg: 'Свържете се с нас' },
  zumKontakt: { de: 'Zum Kontakt', en: 'Contact', bg: 'Към контакта' },
  referenzenAnsehen: { de: 'Referenzen ansehen', en: 'View work', bg: 'Вижте референциите' },
  mehrErfahren: { de: 'Mehr erfahren', en: 'Learn more', bg: 'Научете повече' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Write an email', bg: 'Напишете ни' },
  /** Schlussband „Mehr Umsatz …“ (Leistungsdetails, Referenzen) – Leitsatz der Startseite */
  mehrUmsatzZeilen: {
    de: ['Mehr Umsatz, bessere', 'Kundenerlebnisse,', 'reibungslose Prozesse –', 'mit Ecommlab.'],
    en: ['More revenue, better', 'customer experiences,', 'smoother operations –', 'with Ecommlab.'],
    bg: ['Повече приходи, по-добри', 'клиентски изживявания,', 'безпроблемни процеси –', 'с Ecommlab.'],
  },
  mehrUmsatzText: {
    de: 'Von der Optimierung bis zur Skalierung – wir machen Ihr E-Commerce fit für die Zukunft.',
    en: 'From optimization to scaling — we get your e-commerce ready for the future.',
    bg: 'От оптимизацията до мащабирането – подготвяме електронната Ви търговия за бъдещето.',
  },
}

/* ------------------------------------------------------------------ Leistungsdetails */
export const leistungDetail = {
  zurueck: { de: 'Zurück zu Leistungen', en: 'Back to services', bg: 'Обратно към услугите' },
}

/* ------------------------------------------------------------------ Leistungen (Übersicht) */
export type LeistungsGruppe = { titel: L; titelZeilen: LZ; slugs: readonly LeistungDetail['slug'][] }

/** Kurzname je Leistung (Register), Text = Titel der Detailseite (lib/leistungDetails.ts) */
export const leistungsNamen: Record<LeistungDetail['slug'], L> = {
  'e-commerce': { de: 'E-Commerce', en: 'E-commerce', bg: 'Електронна търговия' },
  'web-development': { de: 'Webentwicklung', en: 'Web development', bg: 'Уеб разработка' },
  'platform-integration': { de: 'Plattform-Integrationen', en: 'Platform integrations', bg: 'Интеграции на платформи' },
  'prerformance-boosting': { de: 'Performance Boosting', en: 'Performance boosting', bg: 'Performance Boosting' },
  'ux-design-usability': { de: 'UX-Design & Usability', en: 'UX design & usability', bg: 'UX дизайн и удобство' },
  onlinemarketing: { de: 'Online-Marketing', en: 'Online marketing', bg: 'Онлайн маркетинг' },
  'seo-content': { de: 'SEO & Content', en: 'SEO & content', bg: 'SEO и съдържание' },
  'strategy-consulting': { de: 'Strategie & Beratung', en: 'Strategy & consulting', bg: 'Стратегия и консултации' },
  'ki-automation': { de: 'KI & Automatisierung', en: 'AI & automation', bg: 'ИИ и автоматизация' },
  'partners-und-tools': { de: 'Partner & Tools', en: 'Partners & tools', bg: 'Партньори и инструменти' },
}

export const leistungen = {
  rubrik: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
  titelZeilen: {
    de: ['Von Strategie bis Umsetzung –', 'mit Fokus auf Wachstum,', 'Experience und Performance'],
    en: ['From strategy to delivery —', 'focused on growth,', 'experience and performance'],
    bg: ['От стратегия до реализация –', 'с фокус върху растеж,', 'изживяване и резултати'],
  },
  ueberblick: { de: 'Überblick', en: 'Overview', bg: 'Преглед' },
  alleTitel: { de: 'Alle Leistungen', en: 'All services', bg: 'Всички услуги' },
  alleText: { de: 'Schnellzugriff auf die einzelnen Leistungsbereiche.', en: 'Quick access to all service areas.', bg: 'Бърз достъп до отделните направления.' },
  gruppen: [
    {
      titel: { de: 'Digitale Präsenz & Entwicklung', en: 'Digital presence & development', bg: 'Дигитално присъствие и разработка' },
      titelZeilen: { de: ['Digitale Präsenz', '& Entwicklung'], en: ['Digital presence', '& development'], bg: ['Дигитално присъствие', 'и разработка'] },
      slugs: ['e-commerce', 'web-development', 'platform-integration', 'prerformance-boosting'],
    },
    {
      titel: { de: 'User Experience & Design', en: 'User experience & design', bg: 'Потребителско изживяване и дизайн' },
      titelZeilen: { de: ['User Experience', '& Design'], en: ['User experience', '& design'], bg: ['Потребителско изживяване', 'и дизайн'] },
      slugs: ['ux-design-usability'],
    },
    {
      titel: { de: 'Marketing & Wachstum', en: 'Marketing & growth', bg: 'Маркетинг и растеж' },
      titelZeilen: { de: ['Marketing', '& Wachstum'], en: ['Marketing', '& growth'], bg: ['Маркетинг', 'и растеж'] },
      slugs: ['onlinemarketing', 'seo-content'],
    },
    {
      titel: { de: 'Strategie & Innovation', en: 'Strategy & innovation', bg: 'Стратегия и иновации' },
      titelZeilen: { de: ['Strategie', '& Innovation'], en: ['Strategy', '& innovation'], bg: ['Стратегия', 'и иновации'] },
      slugs: ['strategy-consulting', 'ki-automation'],
    },
  ] as readonly LeistungsGruppe[],
  strategischRubrik: { de: 'Strategisch', en: 'Strategy', bg: 'Стратегически' },
  strategischZeilen: {
    de: ['Strategische Auswahl von Partnern,', 'Systemen und Tools'],
    en: ['Strategic selection of partners,', 'systems, and tools'],
    bg: ['Стратегически избор на партньори,', 'системи и инструменти'],
  },
  strategischText: {
    de: 'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E-Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben – entscheidend für langfristigen Erfolg in einem sich schnell entwickelnden Markt.',
    en: 'Careful selection of partners, systems, and tools helps you stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
    bg: 'Внимателният избор на партньори, системи и инструменти в електронната търговия позволява на компаниите да останат гъвкави, конкурентоспособни и ориентирани към клиента – решаващо за дългосрочния успех на бързо развиващ се пазар.',
  },
  erfahrungRubrik: { de: 'Erfahrung', en: 'Experience', bg: 'Опит' },
  erfahrungZeilen: { de: ['Wir verstehen Enterprise', 'und Mittelstand'], en: ['We understand', 'enterprise & SMB'], bg: ['Разбираме големите компании', 'и средния бизнес'] },
  erfahrungText: {
    de: 'Wir haben mit zahlreichen Enterprise- und Mittelstand-Kunden gearbeitet, für die wir skalierbare Lösungen umgesetzt haben. Diese Skills setzen wir bei all unseren Projekten ein.',
    en: 'We’ve worked with many enterprise and SMB clients and delivered scalable solutions. We bring these skills to every single project.',
    bg: 'Работили сме с множество големи и средни компании, за които сме реализирали мащабируеми решения. Този опит влагаме във всеки наш проект.',
  },
  kontaktText: {
    de: 'Wenn Sie uns sagen, welche Leistungsbereiche Sie als Nächstes ausbauen wollen, können wir die passenden nächsten Schritte planen.',
    en: 'Tell us which service areas you want to expand next — and we’ll plan the right next steps together.',
    bg: 'Кажете ни кои направления искате да развиете следващи – и ще планираме подходящите следващи стъпки.',
  },
}

/* ------------------------------------------------------------------ Referenzen */
export const referenzen = {
  rubrik: { de: 'Referenzen', en: 'Cases', bg: 'Референции' },
  titelZeilen: { de: ['Projekte, die wir', 'umgesetzt haben'], en: ['Projects', 'we delivered'], bg: ['Проекти, които', 'реализирахме'] },
  erfolgreich: { de: 'erfolgreiche Projekte', en: 'successful projects', bg: 'успешни проекта' },
  projekte: { de: 'Projekte', en: 'Projects', bg: 'Проекти' },
  zurueck: { de: 'Zurück zu Referenzen', en: 'Back to projects', bg: 'Обратно към референциите' },
  nachbarn: { de: 'Weitere Referenzen', en: 'More projects', bg: 'Още референции' },
  service: { de: 'Service', en: 'Service', bg: 'Услуга' },
  technologie: { de: 'Technologie', en: 'Technology', bg: 'Технология' },
  datum: { de: 'Datum', en: 'Date', bg: 'Дата' },
  ort: { de: 'Ort', en: 'Location', bg: 'Място' },
  keyfacts: { de: 'Keyfacts', en: 'Key facts', bg: 'Ключови факти' },
}

/* ------------------------------------------------------------------ Team */
export const teamSeite = {
  rubrik: { de: 'Unser Team', en: 'Our team', bg: 'Нашият екип' },
  titelZeilen: { de: ['Die Menschen', 'hinter Ecommlab'], en: ['The people', 'behind Ecommlab'], bg: ['Хората', 'зад Ecommlab'] },
  intro: {
    de: 'Ein schlagkräftiges Team aus klugen Köpfen, das jede Aufgabe meistert. Zusätzlich verfügen wir über ein breites Netzwerk an Experten, die wir bei Bedarf projektbezogen heranziehen können – mit Ecommlab als Hauptansprechpartner für Kommunikation, Steuerung und Qualitätssicherung.',
    en: 'A close-knit team of bright minds that delivers on any challenge. We also have a broad network of specialists we can bring in on demand — with Ecommlab as your single point of contact for communication, coordination and quality assurance.',
    bg: 'Силен екип от умни хора, който се справя с всяка задача. Освен това разполагаме с широка мрежа от експерти, които при нужда привличаме по конкретни проекти – като Ecommlab остава основното лице за контакт за комуникацията, управлението и осигуряването на качеството.',
  },
  gf: { de: 'Geschäftsführung', en: 'Management', bg: 'Ръководство' },
  gfSatz: {
    de: 'Über 30 Jahre gemeinsame Erfahrung in E-Commerce, Software-Entwicklung und Performance Marketing.',
    en: 'More than 30 combined years of experience in e-commerce, software development and performance marketing.',
    bg: 'Над 30 години общ опит в електронната търговия, разработката на софтуер и performance маркетинга.',
  },
  ueber: { de: 'Über', en: 'More than', bg: 'Над' },
  jahreZeilen: {
    de: ['Jahre gemeinsame Erfahrung in', 'E-Commerce, Software-Entwicklung und', 'Performance Marketing.'],
    en: ['combined years of experience in', 'e-commerce, software development and', 'performance marketing.'],
    bg: ['години общ опит в електронната', 'търговия, разработката на софтуер', 'и performance маркетинга.'],
  },
  /** Bio-Absatz 2 beginnt mit diesem Wort (Board: zwei Absätze) */
  schwerpunkte: { de: 'Schwerpunkte:', en: 'Focus areas:', bg: 'Основни области:' },
  teamTitel: { de: 'Das Team', en: 'The team', bg: 'Екипът' },
  teamText: { de: 'Spezialist:innen aus Entwicklung, Design, Marketing und Projektmanagement.', en: 'Specialists from development, design, marketing and project management.', bg: 'Специалисти по разработка, дизайн, маркетинг и управление на проекти.' },
  mitZeilen: { de: ['Werden Sie Teil', 'unseres Teams'], en: ['Become part', 'of our team'], bg: ['Станете част', 'от нашия екип'] },
  mitText: {
    de: 'Wir suchen regelmäßig Verstärkung – werfen Sie einen Blick auf unsere offenen Positionen oder schreiben Sie uns eine Initiativbewerbung.',
    en: 'We’re regularly hiring — check out our open positions or send us a speculative application.',
    bg: 'Редовно търсим подкрепление – разгледайте отворените позиции или ни изпратете кандидатура по собствена инициатива.',
  },
  offenePositionen: { de: 'Offene Positionen', en: 'Open positions', bg: 'Отворени позиции' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Send email', bg: 'Напишете ни' },
}

/** Porträts der Geschäftsführung (Originalfotos aus public/) – Alt-Text beschreibt das Bild */
export const teamFotos: Record<string, { src: string; alt: L; mobilPos: string }> = {
  'andrey-cekovski': {
    src: '/andrey.jpeg',
    alt: { de: 'Porträt Andrey Cekovski mit verschränkten Armen, dunkles Sakko und weißes Hemd vor grauem Grund', en: 'Portrait of Andrey Cekovski with folded arms, dark jacket and white shirt on a grey background', bg: 'Портрет на Andrey Cekovski със скръстени ръце, в тъмно сако и бяла риза на сив фон' },
    mobilPos: '50% 20%',
  },
  'pavel-mihaylov': {
    src: '/Pavel_Mihaylov.png',
    alt: { de: 'Porträt Pavel Mihaylov in dunklem Sakko und weißem Hemd vor blaugrauem Grund', en: 'Portrait of Pavel Mihaylov in a dark jacket and white shirt on a blue-grey background', bg: 'Портрет на Pavel Mihaylov в тъмно сако и бяла риза на синьо-сив фон' },
    mobilPos: '40% 20%',
  },
}

/* ------------------------------------------------------------------ Karriere & Stellen */
export const karriere = {
  rubrik: { de: 'Karriere', en: 'Careers', bg: 'Кариери' },
  titelWoerter: { de: ['Komm', 'in', 'unser', 'Team'], en: ['Join', 'our', 'team'], bg: ['Ела', 'в', 'нашия', 'екип'] },
  lead: {
    de: 'In unserem Team erlebst du eine außergewöhnliche und einzigartige Arbeitsatmosphäre, geprägt durch die Zusammenarbeit mit hochqualifizierten Spezialisten.',
    en: 'In our team, you’ll experience a unique atmosphere shaped by collaboration with highly qualified specialists.',
    bg: 'В нашия екип те очаква необикновена и неповторима работна атмосфера, белязана от съвместната работа с висококвалифицирани специалисти.',
  },
  arbeitsweise: { de: 'Arbeitsweise', en: 'How we work', bg: 'Как работим' },
  absaetze: [
    {
      de: 'Von ihnen kannst du auf hohem Niveau lernen und wesentlich zur Entwicklung von Spitzenprodukten beitragen. Du erhältst die Chance, an der Entwicklung innovativer Funktionen mitzuwirken, die das moderne E-Commerce-Erlebnis entscheidend verbessern. Trotz unserer umfassenden Erfahrung genießen wir die Dynamik und Flexibilität einer Start-up-Kultur, in der wir Projekte von der Basis auf neu aufbauen.',
      en: 'You will learn at a high level and contribute to building great products. You’ll help develop innovative features that improve modern e-commerce experiences. Despite our experience, we keep the dynamism and flexibility of a start-up culture and rebuild projects from the ground up.',
      bg: 'От тях можеш да учиш на високо ниво и да допринасяш съществено за създаването на първокласни продукти. Получаваш шанса да участваш в разработката на иновативни функции, които решително подобряват съвременното изживяване в електронната търговия. Въпреки богатия си опит ценим динамиката и гъвкавостта на стартъп културата, в която изграждаме проектите из основи.',
    },
    {
      de: 'Wir fördern in dir eine Kultur des kalkulierten Risikos, erkennen den Wert von Fehlern an und nutzen diese als Lernchancen für das gesamte Team. Unsere Unternehmenskultur ist von Offenheit und Transparenz geprägt, und wir sind stets offen für deine innovativen Ideen. Wir schätzen deine frischen Perspektiven und kreativen Impulse, die du in unser Unternehmen einbringst, und freuen uns auf die fortlaufende Bereicherung unserer Arbeitsweise durch deine Beiträge.',
      en: 'We promote a culture of calculated risk, value mistakes as learning opportunities, and grow together as a team. Our culture is open and transparent, and we welcome your ideas. We value fresh perspectives and creative impulses — and look forward to your contributions.',
      bg: 'Насърчаваме култура на премерения риск, признаваме стойността на грешките и ги използваме като възможност за учене за целия екип. Фирмената ни култура се отличава с откритост и прозрачност и винаги сме отворени за твоите иновативни идеи. Ценим свежия поглед и креативните импулси, които внасяш в компанията, и се радваме на това как приносът ти обогатява начина ни на работа.',
    },
  ],
  schnellkontakt: { de: 'Schnellkontakt', en: 'Quick contact', bg: 'Бърз контакт' },
  passt: { de: 'Passt das zu dir?', en: 'Is this you?', bg: 'Звучи като за теб?' },
  passtText: { de: 'Schick uns ein paar Infos zu dir – wir melden uns zeitnah.', en: 'Send us a few details about you — we’ll get back to you soon.', bg: 'Изпрати ни малко информация за себе си – ще се свържем с теб скоро.' },
  emailSchreiben: { de: 'E-Mail schreiben', en: 'Send email', bg: 'Напиши ни' },
  offenePositionen: { de: 'Offene Positionen', en: 'Open positions', bg: 'Отворени позиции' },
  positionenText: { de: 'Aktuell suchen wir Unterstützung in diesen Bereichen.', en: 'We are currently hiring for these roles.', bg: 'В момента търсим подкрепление в следните области.' },
  zurueck: { de: 'Zurück zur Karriereübersicht', en: 'Back to careers', bg: 'Обратно към кариерите' },
  bewerben: { de: 'Bewerben', en: 'Apply', bg: 'Кандидатствай' },
  bewirbDich: { de: 'Bewirb dich unter', en: 'Apply via', bg: 'Кандидатствай на' },
  betreff: { de: 'Bewerbung', en: 'Application', bg: 'Кандидатура' },
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
  rubrik: { de: 'Kontakt', en: 'Contact', bg: 'Контакт' },
  titelZeilen: {
    de: ['Sie wollen ein neues', 'Projekt starten, in unser', 'Team kommen oder nur', '„Hi“ sagen?'],
    en: ['Want to start', 'a new project, join', 'our team, or just', 'say hi?'],
    bg: ['Искате да започнете нов', 'проект, да станете част', 'от екипа ни или просто', 'да кажете „Здрасти“?'],
  },
  lead: { de: 'Wir freuen uns auf Ihre Nachricht.', en: 'We look forward to hearing from you.', bg: 'Ще се радваме да ни пишете.' },
  direkt: { de: 'Direkter Kontakt', en: 'Direct contact', bg: 'Директен контакт' },
  email: { de: 'E-Mail', en: 'Email', bg: 'Имейл' },
  telefon: { de: 'Telefon', en: 'Phone', bg: 'Телефон' },
  adresse: { de: 'Adresse', en: 'Address', bg: 'Адрес' },
}
