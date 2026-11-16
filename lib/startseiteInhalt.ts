import type { AppLocale } from './i18n'

/**
 * Alle Texte der C2-Startseite (DE/EN/BG).
 *
 * DE ist verbindlich (Canvas-Board C2plus/C2m). Bewusste Änderungen gegenüber der alten EcommlabPage.tsx:
 *   – Satzschreibung statt VERSALIEN bei Buttons/Rubriken („Unsere Leistungen“, „Was machen wir“)
 *   – „E-Commerce-Potenzial“ mit Bindestrich (vorher „E-Commerce Potenzial“)
 *   – durchgehend Sie-Form: FAQ-Fragen, „Kontaktieren Sie uns“, „Schreiben Sie uns kurz …“
 *   – „Häufig gestellte Fragen“ ohne „(FAQ)“, „erfolgreiche Projekte“ klein, neue Rubrik „Service-Partner“
 * Die Leitsätze (Überschriften) bleiben wörtlich. EN übernimmt die bestehenden Übersetzungen.
 *
 * `…Zeilen`: Zeilenumbrüche NUR ab 1024 px (Desktop, white-space: nowrap). Mobil fließt der Text frei (text-wrap: balance).
 */
export type StartseiteInhalt = {
  nav: { leistungen: string; referenzen: string; team: string; karriere: string; kontakt: string }
  kopf: { hauptnavigation: string; sprache: string; startseite: string; menue: string; menueOeffnen: string; menueSchliessen: string }
  hero: { unsereLeistungen: string; wasMachenWir: string }
  partner: { titel: string }
  was: { rubrik: string; titelZeilen: string[]; nowrapWort: string; text: string; jahre: string; projekte: string }
  leistungen: {
    rubrik: string
    titelZeilen: string[]
    text: string
    alle: string
    kategorien: { titel: string; punkte: string[] }[]
  }
  referenzen: { rubrik: string; titelZeilen: string[]; text: string; alle: string; originalfarben: string; risodruck: string }
  basis: { rubrik: string; titelZeilen: string[]; punkte: { titel: string; text: string }[] }
  anspruch: { rubrik: string; titelZeilen: string[] }
  faq: { titelZeilen: string[]; eintraege: { frage: string; antwort: string }[] }
  kontakt: {
    titelZeilen: string[]
    textVor: string
    textNowrap: string
    textNach: string
    formTitel: string
    formText: string
    name: string
    email: string
    nachricht: string
    phName: string
    phEmail: string
    phNachricht: string
    senden: string
    sendet: string
    pflichtfeld: string
    captchaFehlt: string
    captchaNichtKonfiguriert: string
    felderPruefen: string
    danke: string
    fehlgeschlagen: string
    htmlAntwort: string
    nameFehlt: string
    nameKurz: string
    emailFehlt: string
    emailUngueltig: string
    nachrichtFehlt: string
    nachrichtKurz: string
  }
  fuss: {
    impressum: string
    datenschutz: string
    agb: string
    cookies: string
    produkte: string
    hell: string
    dunkel: string
  }
}

const de: StartseiteInhalt = {
  nav: { leistungen: 'Leistungen', referenzen: 'Referenzen', team: 'Team', karriere: 'Karriere', kontakt: 'Kontakt' },
  kopf: { hauptnavigation: 'Hauptnavigation', sprache: 'Sprache', startseite: 'ecommlab – Startseite', menue: 'Menü', menueOeffnen: 'Menü öffnen', menueSchliessen: 'Menü schließen' },
  hero: { unsereLeistungen: 'Unsere Leistungen', wasMachenWir: 'Was machen wir' },
  partner: { titel: 'Service-Partner' },
  was: {
    rubrik: 'Was machen wir',
    titelZeilen: ['Wir helfen Unternehmen,', 'ihr E-Commerce-Potenzial', 'zu erschließen'],
    nowrapWort: 'E-Commerce-Potenzial',
    text: 'Wir verwandeln Kundenbeziehungen in Partnerschaften und führen Ihr digitales Projekt zum Erfolg.',
    jahre: 'Jahre Erfahrung',
    projekte: 'erfolgreiche Projekte',
  },
  leistungen: {
    rubrik: 'Was können wir für Sie tun',
    titelZeilen: ['Leistungen, bei denen wir', 'Ihnen helfen können'],
    text: 'Wir sorgen dafür, dass Sie immer den besten digitalen Service bekommen.',
    alle: 'Alle Leistungen',
    kategorien: [
      { titel: 'Digitale Präsenz & Entwicklung', punkte: ['E-Commerce', 'Webentwicklung', 'Plattform-Integrationen'] },
      { titel: 'User Experience & Design', punkte: ['UX-Design & Usability'] },
      { titel: 'Marketing & Wachstum', punkte: ['Online-Marketing', 'SEO & Content', 'Digitales Marketing & Automatisierung'] },
      { titel: 'Strategie & Innovation', punkte: ['Strategie & Beratung', 'KI & Automatisierung'] },
    ],
  },
  referenzen: {
    rubrik: 'So setzen wir Ideen um',
    titelZeilen: ['Auszug unserer Projekte'],
    text: 'Gemeinsam mit unseren Kunden gestalten wir nachhaltigen Erfolg.',
    alle: 'Unsere Referenzen',
    originalfarben: 'Originalfarben zeigen',
    risodruck: 'Risodruck zeigen',
  },
  basis: {
    rubrik: 'Die Basis für Ihren nachhaltigen Erfolg',
    titelZeilen: ['Strategische Auswahl von Partnern,', 'Systemen und Tools'],
    punkte: [
      { titel: 'Effizienz & Skalierbarkeit', text: 'Automatisierte und skalierbare Systeme optimieren Abläufe, sparen Zeit und wachsen flexibel mit Ihrem Business.' },
      { titel: 'Kundenerlebnis & Bindung', text: 'Personalisierte Empfehlungen, einfache Zahlungen und schnelle Suche schaffen Einkaufserlebnisse, die Kunden lieben.' },
      { titel: 'Daten & Sicherheit', text: 'Nutzen Sie wertvolle Insights für bessere Entscheidungen – mit maximaler Datensicherheit und Compliance.' },
      { titel: 'Innovation & Wettbewerbsvorteil', text: 'Setzen Sie auf moderne Technologien und Partnerschaften, um Märkte zu erobern und der Konkurrenz voraus zu sein.' },
    ],
  },
  anspruch: { rubrik: 'Unser Anspruch', titelZeilen: ['Messbare Erfolge,', 'zufriedene Kunden', 'und nachhaltiges', 'Wachstum.'] },
  faq: {
    titelZeilen: ['Häufig gestellte', 'Fragen'],
    eintraege: [
      { frage: 'Was macht Ecommlab genau?', antwort: 'Ecommlab unterstützt Unternehmen dabei, ihre E-Commerce-Prozesse zu optimieren – von der Strategie und Systemauswahl bis zur technischen Umsetzung und Automatisierung.' },
      { frage: 'Für wen sind Ihre Leistungen geeignet?', antwort: 'Für Unternehmen, die E-Commerce neu aufbauen, optimieren oder skalieren möchten – vom Mittelstand bis Enterprise.' },
      { frage: 'Mit welchen Systemen und Tools arbeiten Sie?', antwort: 'Wir setzen auf führende Plattformen und Technologien wie Shopify, Shopware, WooCommerce, HubSpot, Klaviyo und individuelle API-Integrationen – immer abgestimmt auf Ihre Anforderungen.' },
      { frage: 'Bieten Sie auch Beratung ohne direkte Umsetzung an?', antwort: 'Ja – wir unterstützen bei Strategie, Systemauswahl, Roadmaps und Reviews, auch wenn die Umsetzung intern oder mit anderen Partnern erfolgt.' },
      { frage: 'Wie läuft eine Zusammenarbeit mit Ecommlab ab?', antwort: 'Typisch: kurzes Erstgespräch → Analyse & Zielbild → Konzept/Roadmap → Umsetzung in Iterationen → Messung & Optimierung.' },
    ],
  },
  kontakt: {
    titelZeilen: ['Mehr Umsatz, bessere', 'Kundenerlebnisse,', 'reibungslose Prozesse –', 'mit Ecommlab.'],
    textVor: 'Von der Optimierung bis zur Skalierung – wir machen Ihr ',
    textNowrap: 'E-Commerce',
    textNach: ' fit für die Zukunft.',
    formTitel: 'Kontaktieren Sie uns',
    formText: 'Schreiben Sie uns kurz, worum es geht – wir melden uns zeitnah zurück.',
    name: 'Name',
    email: 'E-Mail',
    nachricht: 'Nachricht',
    phName: 'Max Mustermann',
    phEmail: 'name@firma.de',
    phNachricht: 'Wobei können wir helfen?',
    senden: 'Senden',
    sendet: 'Sende…',
    pflichtfeld: 'Pflichtfeld',
    captchaFehlt: 'Bitte Captcha ausfüllen',
    captchaNichtKonfiguriert: 'Captcha ist noch nicht konfiguriert (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
    felderPruefen: 'Bitte prüfen Sie die markierten Felder.',
    danke: 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen zurück!',
    fehlgeschlagen: 'Senden fehlgeschlagen:',
    htmlAntwort: 'Server-Antwort war HTML (Proxy/Redirect). Bitte prüfen Sie, ob `/api/contact` wirklich auf die Next.js-App zeigt.',
    nameFehlt: 'Bitte Name eingeben.',
    nameKurz: 'Bitte mindestens 2 Zeichen eingeben.',
    emailFehlt: 'Bitte E-Mail eingeben.',
    emailUngueltig: 'Bitte eine gültige E-Mail eingeben.',
    nachrichtFehlt: 'Bitte Nachricht eingeben.',
    nachrichtKurz: 'Bitte mindestens 10 Zeichen eingeben.',
  },
  fuss: {
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    agb: 'AGB',
    cookies: 'Cookie-Einstellungen',
    produkte: 'Unsere Produkte',
    hell: 'Hellmodus',
    dunkel: 'Dunkelmodus',
  },
}

const en: StartseiteInhalt = {
  nav: { leistungen: 'Services', referenzen: 'Cases', team: 'Team', karriere: 'Careers', kontakt: 'Contact' },
  kopf: { hauptnavigation: 'Main navigation', sprache: 'Language', startseite: 'ecommlab – home', menue: 'Menu', menueOeffnen: 'Open menu', menueSchliessen: 'Close menu' },
  hero: { unsereLeistungen: 'Our services', wasMachenWir: 'What we do' },
  partner: { titel: 'Service partners' },
  was: {
    rubrik: 'What we do',
    titelZeilen: ['We help companies', 'unlock their', 'e-commerce potential'],
    nowrapWort: 'e-commerce potential',
    text: 'We turn customer relationships into partnerships and drive your digital project to success.',
    jahre: 'years of experience',
    projekte: 'successful projects',
  },
  leistungen: {
    rubrik: 'What can we do for you',
    titelZeilen: ['Services we can', 'help you with'],
    text: 'We make sure you always get the best digital service.',
    alle: 'All services',
    kategorien: [
      { titel: 'Digital presence & development', punkte: ['E-commerce', 'Web development', 'Platform integrations'] },
      { titel: 'User experience & design', punkte: ['UX design & usability'] },
      { titel: 'Marketing & growth', punkte: ['Online marketing', 'SEO & content', 'Digital marketing & automation'] },
      { titel: 'Strategy & innovation', punkte: ['Strategy & consulting', 'AI & automation'] },
    ],
  },
  referenzen: {
    rubrik: 'How we deliver',
    titelZeilen: ['Selected projects'],
    text: 'Together with our clients, we build sustainable success.',
    alle: 'Our work',
    originalfarben: 'Show original colours',
    risodruck: 'Show riso print',
  },
  basis: {
    rubrik: 'The foundation for sustainable success',
    titelZeilen: ['Strategic selection of partners,', 'systems, and tools'],
    punkte: [
      { titel: 'Efficiency & scalability', text: 'Automated, scalable systems streamline operations, save time, and grow with your business.' },
      { titel: 'Customer experience & retention', text: 'Personalized recommendations, frictionless payments, and fast search create shopping experiences customers love.' },
      { titel: 'Data & security', text: 'Use valuable insights to make better decisions — with maximum data security and compliance.' },
      { titel: 'Innovation & competitive edge', text: 'Leverage modern technologies and partnerships to win markets and stay ahead of the competition.' },
    ],
  },
  anspruch: { rubrik: 'Our standard', titelZeilen: ['Measurable results,', 'happy customers,', 'sustainable growth.'] },
  faq: {
    titelZeilen: ['Frequently asked', 'questions'],
    eintraege: [
      { frage: 'What does Ecommlab do?', antwort: 'Ecommlab helps companies optimize their e-commerce processes — from strategy and platform selection to implementation and automation.' },
      { frage: 'Who are your services for?', antwort: 'For companies that want to build, optimize, or scale e-commerce — from SMB to enterprise.' },
      { frage: 'Which platforms and tools do you work with?', antwort: 'We work with leading platforms and technologies like Shopify, Shopware, WooCommerce, HubSpot, Klaviyo, and custom API integrations — tailored to your needs.' },
      { frage: 'Do you offer consulting without implementation?', antwort: 'Yes — we support strategy, platform selection, roadmaps, and reviews, even if implementation happens in-house or with other partners.' },
      { frage: 'How does a typical collaboration work?', antwort: 'Typical flow: quick intro call → analysis & target picture → concept/roadmap → iterative implementation → measurement & optimization.' },
    ],
  },
  kontakt: {
    titelZeilen: ['More revenue, better', 'customer experiences,', 'smoother operations –', 'with Ecommlab.'],
    textVor: 'From optimization to scaling — we get your ',
    textNowrap: 'e-commerce',
    textNach: ' ready for the future.',
    formTitel: 'Contact us',
    formText: 'Tell us briefly what it’s about — we’ll get back to you soon.',
    name: 'Name',
    email: 'Email',
    nachricht: 'Message',
    phName: 'Jane Doe',
    phEmail: 'name@company.com',
    phNachricht: 'How can we help?',
    senden: 'Send',
    sendet: 'Sending…',
    pflichtfeld: 'Required',
    captchaFehlt: 'Please complete the captcha',
    captchaNichtKonfiguriert: 'Captcha is not configured yet (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
    felderPruefen: 'Please check the highlighted fields.',
    danke: 'Thanks! We will get back to you as soon as possible.',
    fehlgeschlagen: 'Sending failed:',
    htmlAntwort: 'Server returned HTML (proxy/redirect). Please verify `/api/contact` routes to the Next.js app.',
    nameFehlt: 'Please enter your name.',
    nameKurz: 'Please enter at least 2 characters.',
    emailFehlt: 'Please enter your email address.',
    emailUngueltig: 'Please enter a valid email address.',
    nachrichtFehlt: 'Please enter a message.',
    nachrichtKurz: 'Please enter at least 10 characters.',
  },
  fuss: {
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    agb: 'Terms',
    cookies: 'Cookie settings',
    produkte: 'Our products',
    hell: 'Light mode',
    dunkel: 'Dark mode',
  },
}

/** Bulgarisch – aus dem Deutschen übersetzt; Kundenansprache «Вие». Zeilenlängen der Titel an DE angelehnt. */
const bg: StartseiteInhalt = {
  nav: { leistungen: 'Услуги', referenzen: 'Референции', team: 'Екип', karriere: 'Кариери', kontakt: 'Контакт' },
  kopf: { hauptnavigation: 'Основна навигация', sprache: 'Език', startseite: 'ecommlab – начална страница', menue: 'Меню', menueOeffnen: 'Отваряне на менюто', menueSchliessen: 'Затваряне на менюто' },
  hero: { unsereLeistungen: 'Нашите услуги', wasMachenWir: 'Какво правим' },
  partner: { titel: 'Партньори' },
  was: {
    rubrik: 'Какво правим',
    titelZeilen: ['Помагаме на компаниите', 'да разгърнат потенциала си', 'в електронната търговия'],
    nowrapWort: '', // zwei Wörter, mobil zu breit zum Zusammenhalten
    text: 'Превръщаме отношенията с клиентите в партньорства и водим дигиталния Ви проект към успех.',
    jahre: 'години опит',
    projekte: 'успешни проекта',
  },
  leistungen: {
    rubrik: 'Какво можем да направим за Вас',
    titelZeilen: ['Услуги, с които', 'можем да Ви помогнем'],
    text: 'Грижим се винаги да получавате най-доброто дигитално обслужване.',
    alle: 'Всички услуги',
    kategorien: [
      { titel: 'Дигитално присъствие и разработка', punkte: ['Електронна търговия', 'Уеб разработка', 'Интеграции на платформи'] },
      { titel: 'Потребителско изживяване и дизайн', punkte: ['UX дизайн и удобство'] },
      { titel: 'Маркетинг и растеж', punkte: ['Онлайн маркетинг', 'SEO и съдържание', 'Дигитален маркетинг и автоматизация'] },
      { titel: 'Стратегия и иновации', punkte: ['Стратегия и консултации', 'ИИ и автоматизация'] },
    ],
  },
  referenzen: {
    rubrik: 'Така реализираме идеите',
    titelZeilen: ['Част от нашите проекти'],
    text: 'Заедно с клиентите си изграждаме устойчив успех.',
    alle: 'Нашите референции',
    originalfarben: 'Показване на оригиналните цветове',
    risodruck: 'Показване на ризопечат',
  },
  basis: {
    rubrik: 'Основата за Вашия устойчив успех',
    titelZeilen: ['Стратегически избор на партньори,', 'системи и инструменти'],
    punkte: [
      { titel: 'Ефективност и мащабируемост', text: 'Автоматизираните и мащабируеми системи оптимизират процесите, пестят време и растат гъвкаво заедно с бизнеса Ви.' },
      { titel: 'Клиентско изживяване и лоялност', text: 'Персонализирани препоръки, лесни плащания и бързо търсене създават пазаруване, което клиентите обичат.' },
      { titel: 'Данни и сигурност', text: 'Използвайте ценни прозрения за по-добри решения – с максимална сигурност на данните и съответствие с изискванията.' },
      { titel: 'Иновации и конкурентно предимство', text: 'Заложете на съвременни технологии и партньорства, за да завладявате пазари и да бъдете пред конкуренцията.' },
    ],
  },
  anspruch: { rubrik: 'Нашият стремеж', titelZeilen: ['Измерими успехи,', 'доволни клиенти', 'и устойчив', 'растеж.'] },
  faq: {
    titelZeilen: ['Често задавани', 'въпроси'],
    eintraege: [
      { frage: 'Какво точно прави Ecommlab?', antwort: 'Ecommlab помага на компаниите да оптимизират процесите си в електронната търговия – от стратегията и избора на система до техническата реализация и автоматизацията.' },
      { frage: 'За кого са подходящи услугите Ви?', antwort: 'За компании, които искат да изградят, оптимизират или мащабират електронната си търговия – от средния бизнес до големите корпорации.' },
      { frage: 'С какви системи и инструменти работите?', antwort: 'Залагаме на водещи платформи и технологии като Shopify, Shopware, WooCommerce, HubSpot, Klaviyo и индивидуални API интеграции – винаги съобразени с Вашите изисквания.' },
      { frage: 'Предлагате ли консултации без реализация?', antwort: 'Да – помагаме със стратегия, избор на система, пътни карти и прегледи, дори когато реализацията се извършва вътрешно или с други партньори.' },
      { frage: 'Как протича работата с Ecommlab?', antwort: 'Обикновено: кратък първи разговор → анализ и целева картина → концепция/пътна карта → реализация на итерации → измерване и оптимизация.' },
    ],
  },
  kontakt: {
    titelZeilen: ['Повече приходи, по-добри', 'клиентски изживявания,', 'безпроблемни процеси –', 'с Ecommlab.'],
    textVor: 'От оптимизацията до мащабирането – подготвяме Вашата ',
    textNowrap: 'електронна търговия',
    textNach: ' за бъдещето.',
    formTitel: 'Свържете се с нас',
    formText: 'Напишете ни накратко за какво става въпрос – ще се свържем с Вас скоро.',
    name: 'Име',
    email: 'Имейл',
    nachricht: 'Съобщение',
    phName: 'Иван Иванов',
    phEmail: 'ime@firma.bg',
    phNachricht: 'С какво можем да помогнем?',
    senden: 'Изпращане',
    sendet: 'Изпращане…',
    pflichtfeld: 'Задължително поле',
    captchaFehlt: 'Моля, попълнете captcha',
    captchaNichtKonfiguriert: 'Captcha все още не е конфигурирана (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
    felderPruefen: 'Моля, проверете маркираните полета.',
    danke: 'Благодарим за съобщението! Ще се свържем с Вас възможно най-скоро.',
    fehlgeschlagen: 'Изпращането не бе успешно:',
    htmlAntwort: 'Сървърът върна HTML (прокси/пренасочване). Моля, проверете дали `/api/contact` наистина сочи към Next.js приложението.',
    nameFehlt: 'Моля, въведете име.',
    nameKurz: 'Моля, въведете поне 2 знака.',
    emailFehlt: 'Моля, въведете имейл.',
    emailUngueltig: 'Моля, въведете валиден имейл адрес.',
    nachrichtFehlt: 'Моля, въведете съобщение.',
    nachrichtKurz: 'Моля, въведете поне 10 знака.',
  },
  fuss: {
    impressum: 'Импресум',
    datenschutz: 'Лични данни',
    agb: 'Общи условия',
    cookies: 'Настройки за бисквитки',
    produkte: 'Нашите продукти',
    hell: 'Светъл режим',
    dunkel: 'Тъмен режим',
  },
}

const inhalt: Record<AppLocale, StartseiteInhalt> = { de, en, bg }

export function startseiteInhalt(locale: AppLocale): StartseiteInhalt {
  return inhalt[locale]
}
