import type { PortfolioItem } from './portfolio'

export type KeyFactRow =
  | { type: 'text'; text: { de: string; en: string; bg: string } }
  | { type: 'group'; text: { de: string; en: string; bg: string }; items: readonly { de: string; en: string; bg: string }[] }

export type PortfolioCase = PortfolioItem & {
  keyFacts: readonly KeyFactRow[]
  summary?: { de: string; en: string; bg: string }
  beforeKeyfactsImageSrc?: string
  beforeKeyfactsImageAlt?: string
  beforeKeyfactsExtraImages?: readonly { src: string; alt?: string }[]
  meta: {
    service?: string
    technology?: string
    year?: string
    location: string
    clientName: string
    clientUrl?: string
    date: string
  }
}

export const portfolioCases: readonly PortfolioCase[] = [
  {
    slug: 'newone',
    title: 'Newone',
    imageSrc: '/portfolio/newone.png',
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Performance'],
    summary:
      {
        de: 'Relaunch und Ausbau des E-Commerce-Systems inkl. Integrationen, Performance-Optimierungen und Tracking/Marketing-Setup.',
        en: 'Relaunch and expansion of the e-commerce system incl. integrations, performance optimizations, and tracking/marketing setup.',
        bg: 'Релонч и разширяване на системата за електронна търговия, вкл. интеграции, оптимизация на производителността и настройка на проследяване и маркетинг.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Relaunch in 2020 auf Basis von Magento 2', en: 'Relaunch in 2020 based on Magento 2', bg: 'Релонч през 2020 г. на базата на Magento 2' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as', bg: 'Разработка на разширени функционалности, напр.' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications', bg: 'Известия за наличност' },
          { de: 'Bestellung ausverkaufter Artikel auf Anfrage', en: 'Ordering out-of-stock items on request', bg: 'Поръчка на изчерпани артикули по заявка' },
          { de: 'Erweitertes Retourenmanagement', en: 'Advanced returns management', bg: 'Разширено управление на връщанията' },
          {
            de: 'Verkauf und Einlösung von Geschenkgutscheinen inkl. Synchronisation mit einem zentralen Giftcard Management System (verbunden mit 6 stationären Stores)',
            en: 'Selling and redeeming gift cards incl. sync with a central gift card management system (connected to 6 physical stores)',
            bg: 'Продажба и осребряване на подаръчни ваучери, вкл. синхронизация с централна система за управление на подаръчни карти (свързана с 6 физически магазина)',
          },
          { de: 'Click’n’Collect', en: 'Click & collect', bg: 'Click & Collect' },
        ],
      },
      { type: 'text', text: { de: 'Integration von Microsoft Dynamics NAV', en: 'Integration of Microsoft Dynamics NAV', bg: 'Интеграция на Microsoft Dynamics NAV' } },
      { type: 'text', text: { de: 'Integration von Amazon Pay', en: 'Integration of Amazon Pay', bg: 'Интеграция на Amazon Pay' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      {
        type: 'text',
        text: { de: 'Marketing Integration von Google, Facebook, Instagram, Criteo, Cleverreach', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Cleverreach', bg: 'Маркетингова интеграция с Google, Facebook, Instagram, Criteo, Cleverreach' },
      },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'Magento 2',
      year: '2019',
      location: 'Wien, Salzburg, Graz, München',
      clientName: 'Newone GmbH',
      clientUrl: 'https://www.newone-shop.com/',
      date: 'September 1, 2019',
    },
  },
  {
    slug: 'baer-schuhe',
    title: 'Bär Schuhe',
    imageSrc: '/portfolio/baer-header.png',
    beforeKeyfactsImageSrc: '/portfolio/baer-before-keyfacts.png',
    beforeKeyfactsImageAlt: 'Bär Schuhe – Header Motiv',
    beforeKeyfactsExtraImages: [
      { src: '/portfolio/baer-before-keyfacts-1.png', alt: 'Bär Schuhe – Screenshot 1' },
      { src: '/portfolio/baer-before-keyfacts-2.png', alt: 'Bär Schuhe – Screenshot 2' },
    ],
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'SEO'],
    summary:
      {
        de: 'Digitale Strategie und Weiterentwicklung mit Fokus auf Integrationen, Automatisierung und Performance im E-Commerce.',
        en: 'Digital strategy and continuous development focusing on integrations, automation, and performance in e-commerce.',
        bg: 'Дигитална стратегия и развитие с фокус върху интеграции, автоматизация и производителност в електронната търговия.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Digitale Strategie und Weiterentwicklung auf Basis von Shopware', en: 'Digital strategy and continuous development based on Shopware', bg: 'Дигитална стратегия и развитие на базата на Shopware' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as', bg: 'Разработка на разширени функционалности, напр.' },
        items: [
          { de: 'Adressvalidierung und Betrugsprävention', en: 'Address validation and fraud prevention', bg: 'Валидиране на адреси и превенция на измами' },
          { de: 'Standortverfügbarkeit pro Artikel', en: 'Store availability per product', bg: 'Наличност по обекти за всеки артикул' },
          { de: 'Synchronisation mit Marktplätzen', en: 'Marketplace synchronization', bg: 'Синхронизация с маркетплейси' },
          { de: 'Marketing Automation mit SAP Emarsys', en: 'Marketing automation with SAP Emarsys', bg: 'Маркетингова автоматизация със SAP Emarsys' },
        ],
      },
      { type: 'text', text: { de: 'Integration von Microsoft Dynamics NAV', en: 'Integration of Microsoft Dynamics NAV', bg: 'Интеграция на Microsoft Dynamics NAV' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      { type: 'text', text: { de: 'Monitoring mit Pingdom und Tideways', en: 'Monitoring with Pingdom and Tideways', bg: 'Мониторинг с Pingdom и Tideways' } },
      { type: 'text', text: { de: 'Marketing Integration von Google, Facebook, Instagram, Criteo, Awin, etc.', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Awin, etc.', bg: 'Маркетингова интеграция с Google, Facebook, Instagram, Criteo, Awin и др.' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'Shopware',
      year: '2023',
      location: 'Bietigheim-Bissingen',
      clientName: 'Bär GmbH',
      clientUrl: 'http://www.baer-schuhe.de/',
      date: 'November 19, 2023',
    },
  },
  {
    slug: 'liquid-life',
    title: 'Liquid Life',
    imageSrc: '/portfolio/liquid-life.png',
    tags: ['Agency', 'Design', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'UI/UX', 'Web design'],
    summary:
      {
        de: 'Relaunch, Integrationen und E-Commerce-Optimierungen mit Fokus auf Suche, Performance, Tracking und Marketing-Feeds.',
        en: 'Relaunch, integrations, and e-commerce optimizations focusing on search, performance, tracking, and marketing feeds.',
        bg: 'Релонч, интеграции и оптимизации на електронната търговия с фокус върху търсене, производителност, проследяване и маркетингови фийдове.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Relaunch in 2020 auf Basis von Magento 2 Commerce', en: 'Relaunch in 2020 based on Magento 2 Commerce', bg: 'Релонч през 2020 г. на базата на Magento 2 Commerce' } },
      { type: 'text', text: { de: 'Integration von Finanzierungsoptionen über Consors Finanz sowie Amazon Pay', en: 'Integration of financing options via Consors Finanz and Amazon Pay', bg: 'Интеграция на опции за финансиране чрез Consors Finanz, както и на Amazon Pay' } },
      { type: 'text', text: { de: 'Integration von HIW Warenwirtschaftssystem', en: 'Integration of HIW ERP system', bg: 'Интеграция на складово-счетоводната система HIW' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as', bg: 'Разработка на разширени функционалности, напр.' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications', bg: 'Известия за наличност' },
          { de: 'Filialverfügbarkeit und Click & Collect', en: 'Store availability and click & collect', bg: 'Наличност по магазини и Click & Collect' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Elastic Search für die Kategorie-Ausspielung und Suche', en: 'Use of Elasticsearch for category rendering and search', bg: 'Използване на Elastic Search за извеждане на категориите и за търсене' } },
      { type: 'text', text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', bg: 'Маркетингова интеграция с Google, Facebook, Instagram, Criteo, Idealo, Mailchimp' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring', bg: 'Разширено управление и мониторинг на фийдове' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'Magento 2 Commerce',
      year: '2023',
      location: 'Brilon',
      clientName: 'Liquid-Life GmbH',
      clientUrl: 'http://www.liquid-life.de/',
      date: 'November 21, 2023',
    },
  },
  {
    slug: 'pfundskerl-xxl-de',
    title: 'Pfundskerl',
    imageSrc: '/portfolio/pfundskerl.jpeg',
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'SEO', 'UI/UX'],
    summary:
      {
        de: 'Bei Pfundskerl, deinem Herrenausstatter für Klamotten in großer Größe, findest du hochwertige Bekleidung von XXL bis 14XL, in großer Auswahl und zu kleinen Preisen.',
        en: 'Pfundskerl is a menswear retailer for plus sizes — offering high-quality clothing from XXL to 14XL in a broad selection and at great prices.',
        bg: 'Pfundskerl е магазин за мъжка мода в големи размери – качествени дрехи от XXL до 14XL, с голям избор и на достъпни цени.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Integration von Klarna, PayOne, PayPal', en: 'Integrations: Klarna, PayOne, PayPal', bg: 'Интеграция на Klarna, PayOne, PayPal' } },
      { type: 'text', text: { de: 'Integration von Brickfox, Pixi, Futura', en: 'Integrations: Brickfox, Pixi, Futura', bg: 'Интеграция на Brickfox, Pixi, Futura' } },
      { type: 'text', text: { de: 'Einführung CI/CD, SCRUM', en: 'Introduced CI/CD and Scrum', bg: 'Въвеждане на CI/CD и Scrum' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as', bg: 'Разработка на разширени функционалности, напр.' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications', bg: 'Известия за наличност' },
          { de: 'Verkauf und Einlösung von Geschenkgutscheinen mit Guthaben-Funktionalität', en: 'Selling and redeeming gift cards with balance functionality', bg: 'Продажба и осребряване на подаръчни ваучери с функционалност за баланс' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Findologic für die Kategorie-Ausspielung und Suche', en: 'Use of Findologic for category rendering and search', bg: 'Използване на Findologic за извеждане на категориите и за търсене' } },
      { type: 'text', text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', bg: 'Маркетингова интеграция с Google, Facebook, Instagram, Criteo, Idealo, Mailchimp' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring', bg: 'Разширено управление и мониторинг на фийдове' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'OXID',
      year: '2023',
      location: 'Neufahrn',
      clientName: 'Hinke GmbH',
      clientUrl: 'https://www.pfundskerl-xxl.de/',
      date: 'November 21, 2023',
    },
  },
  {
    slug: 'kaipara',
    title: 'Kaipara',
    imageSrc: '/portfolio/kaipara.jpg',
    tags: ['Agency', 'Design', 'Development', 'Digital', 'Ecommerce', 'UI/UX', 'Web design'],
    summary:
      {
        de: 'Integrationen, CI/CD und Performance-Setup – inklusive Tracking, Feed-Management und Payment-Integration.',
        en: 'Integrations, CI/CD, and performance setup — including tracking, feed management, and payment integration.',
        bg: 'Интеграции, CI/CD и настройка на производителността – включително проследяване, управление на фийдове и интеграция на плащания.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Einführung CI/CD', en: 'Introduced CI/CD', bg: 'Въвеждане на CI/CD' } },
      { type: 'text', text: { de: 'Integration PayPal Checkout', en: 'Integrated PayPal Checkout', bg: 'Интеграция на PayPal Checkout' } },
      { type: 'text', text: { de: 'Integration von Plentymarkets', en: 'Integration of Plentymarkets', bg: 'Интеграция на Plentymarkets' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      { type: 'text', text: { de: 'Marketing Integration von Google, Facebook, Instagram', en: 'Marketing integrations: Google, Facebook, Instagram', bg: 'Маркетингова интеграция с Google, Facebook, Instagram' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring', bg: 'Разширено управление и мониторинг на фийдове' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'Shopware',
      year: '2023',
      location: 'Allmannshofen',
      clientName: 'Kaipara GmbH',
      clientUrl: 'https://kaipara.de/',
      date: 'November 21, 2023',
    },
  },
  {
    slug: 'riess-ambiente',
    title: 'Riess-Ambiente',
    imageSrc: '/portfolio/riess-ambiente.png',
    tags: ['Agency', 'Design', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'SEO', 'UI/UX', 'Web design'],
    summary:
      {
        de: 'Integrationen, Suche, Performance und Marketing/Tracking – mit Fokus auf skalierbare Prozesse im E-Commerce.',
        en: 'Integrations, search, performance, and marketing/tracking — with a focus on scalable e-commerce processes.',
        bg: 'Интеграции, търсене, производителност и маркетинг/проследяване – с фокус върху мащабируеми процеси в електронната търговия.',
      },
    keyFacts: [
      { type: 'text', text: { de: 'Integration von Klarna, Heidelpay, PayPal', en: 'Integrations: Klarna, Heidelpay, PayPal', bg: 'Интеграция на Klarna, Heidelpay, PayPal' } },
      { type: 'text', text: { de: 'Integration von Roqqio ERP', en: 'Integration of Roqqio ERP', bg: 'Интеграция на Roqqio ERP' } },
      { type: 'text', text: { de: 'Einführung CI/CD', en: 'Introduced CI/CD', bg: 'Въвеждане на CI/CD' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as', bg: 'Разработка на разширени функционалности, напр.' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications', bg: 'Известия за наличност' },
          { de: 'Verkauf und Einlösung von Geschenkgutscheinen mit Guthaben-Funktionalität', en: 'Selling and redeeming gift cards with balance functionality', bg: 'Продажба и осребряване на подаръчни ваучери с функционалност за баланс' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache', bg: 'Многостепенно кеширане с Cloudflare, Varnish, Redis и OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Findologic für die Suche', en: 'Use of Findologic for search', bg: 'Използване на Findologic за търсенето' } },
      {
        type: 'text',
        text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Cleverreach', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Cleverreach', bg: 'Маркетингова интеграция с Google, Facebook, Instagram, Criteo, Idealo, Cleverreach' },
      },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce', bg: 'Интеграция на проследяване с Google Tag Manager и Google Analytics Enhanced Ecommerce' },
      },
    ],
    meta: {
      service: 'System Integration',
      technology: 'OXID',
      year: '2023',
      location: 'Hamburg, Nützen, Halstenbek',
      clientName: 'Riess-ambiente.de GmbH',
      clientUrl: 'http://www.riess-ambiente.net/',
      date: 'November 21, 2023',
    },
  },
] as const

export function getCaseBySlug(slug: string) {
  return portfolioCases.find((c) => c.slug === slug)
}

export function getCaseNeighbors(slug: string) {
  const idx = portfolioCases.findIndex((c) => c.slug === slug)
  if (idx === -1) return { prev: undefined, next: undefined }
  return {
    prev: idx > 0 ? portfolioCases[idx - 1] : undefined,
    next: idx < portfolioCases.length - 1 ? portfolioCases[idx + 1] : undefined,
  }
}

