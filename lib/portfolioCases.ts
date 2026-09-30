import type { PortfolioItem } from './portfolio'

export type KeyFactRow =
  | { type: 'text'; text: { de: string; en: string } }
  | { type: 'group'; text: { de: string; en: string }; items: readonly { de: string; en: string }[] }

export type PortfolioCase = PortfolioItem & {
  keyFacts: readonly KeyFactRow[]
  summary?: { de: string; en: string }
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Relaunch in 2020 auf Basis von Magento 2', en: 'Relaunch in 2020 based on Magento 2' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications' },
          { de: 'Bestellung ausverkaufter Artikel auf Anfrage', en: 'Ordering out-of-stock items on request' },
          { de: 'Erweitertes Retourenmanagement', en: 'Advanced returns management' },
          {
            de: 'Verkauf und Einlösung von Geschenkgutscheinen inkl. Synchronisation mit einem zentralen Giftcard Management System (verbunden mit 6 stationären Stores)',
            en: 'Selling and redeeming gift cards incl. sync with a central gift card management system (connected to 6 physical stores)',
          },
          { de: 'Click’n’Collect', en: 'Click & collect' },
        ],
      },
      { type: 'text', text: { de: 'Integration von Microsoft Dynamics NAV', en: 'Integration of Microsoft Dynamics NAV' } },
      { type: 'text', text: { de: 'Integration von Amazon Pay', en: 'Integration of Amazon Pay' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      {
        type: 'text',
        text: { de: 'Marketing Integration von Google, Facebook, Instagram, Criteo, Cleverreach', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Cleverreach' },
      },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Digitale Strategie und Weiterentwicklung auf Basis von Shopware', en: 'Digital strategy and continuous development based on Shopware' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as' },
        items: [
          { de: 'Adressvalidierung und Betrugsprävention', en: 'Address validation and fraud prevention' },
          { de: 'Standortverfügbarkeit pro Artikel', en: 'Store availability per product' },
          { de: 'Synchronisation mit Marktplätzen', en: 'Marketplace synchronization' },
          { de: 'Marketing Automation mit SAP Emarsys', en: 'Marketing automation with SAP Emarsys' },
        ],
      },
      { type: 'text', text: { de: 'Integration von Microsoft Dynamics NAV', en: 'Integration of Microsoft Dynamics NAV' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      { type: 'text', text: { de: 'Monitoring mit Pingdom und Tideways', en: 'Monitoring with Pingdom and Tideways' } },
      { type: 'text', text: { de: 'Marketing Integration von Google, Facebook, Instagram, Criteo, Awin, etc.', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Awin, etc.' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Relaunch in 2020 auf Basis von Magento 2 Commerce', en: 'Relaunch in 2020 based on Magento 2 Commerce' } },
      { type: 'text', text: { de: 'Integration von Finanzierungsoptionen über Consors Finanz sowie Amazon Pay', en: 'Integration of financing options via Consors Finanz and Amazon Pay' } },
      { type: 'text', text: { de: 'Integration von HIW Warenwirtschaftssystem', en: 'Integration of HIW ERP system' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications' },
          { de: 'Filialverfügbarkeit und Click & Collect', en: 'Store availability and click & collect' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Elastic Search für die Kategorie-Ausspielung und Suche', en: 'Use of Elasticsearch for category rendering and search' } },
      { type: 'text', text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Mailchimp' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Integration von Klarna, PayOne, PayPal', en: 'Integrations: Klarna, PayOne, PayPal' } },
      { type: 'text', text: { de: 'Integration von Brickfox, Pixi, Futura', en: 'Integrations: Brickfox, Pixi, Futura' } },
      { type: 'text', text: { de: 'Einführung CI/CD, SCRUM', en: 'Introduced CI/CD and Scrum' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications' },
          { de: 'Verkauf und Einlösung von Geschenkgutscheinen mit Guthaben-Funktionalität', en: 'Selling and redeeming gift cards with balance functionality' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Findologic für die Kategorie-Ausspielung und Suche', en: 'Use of Findologic for category rendering and search' } },
      { type: 'text', text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Mailchimp', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Mailchimp' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Einführung CI/CD', en: 'Introduced CI/CD' } },
      { type: 'text', text: { de: 'Integration PayPal Checkout', en: 'Integrated PayPal Checkout' } },
      { type: 'text', text: { de: 'Integration von Plentymarkets', en: 'Integration of Plentymarkets' } },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      { type: 'text', text: { de: 'Marketing Integration von Google, Facebook, Instagram', en: 'Marketing integrations: Google, Facebook, Instagram' } },
      { type: 'text', text: { de: 'Erweitertes Feed-Management und -Monitoring', en: 'Advanced feed management and monitoring' } },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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
      },
    keyFacts: [
      { type: 'text', text: { de: 'Integration von Klarna, Heidelpay, PayPal', en: 'Integrations: Klarna, Heidelpay, PayPal' } },
      { type: 'text', text: { de: 'Integration von Roqqio ERP', en: 'Integration of Roqqio ERP' } },
      { type: 'text', text: { de: 'Einführung CI/CD', en: 'Introduced CI/CD' } },
      {
        type: 'group',
        text: { de: 'Entwicklung erweiterter Funktionalitäten wie z.B.', en: 'Development of advanced features such as' },
        items: [
          { de: 'Verfügbarkeitsbenachrichtigungen', en: 'Back-in-stock notifications' },
          { de: 'Verkauf und Einlösung von Geschenkgutscheinen mit Guthaben-Funktionalität', en: 'Selling and redeeming gift cards with balance functionality' },
        ],
      },
      { type: 'text', text: { de: 'Mehrstufiges Caching mit Cloudflare, Varnish, Redis und OpCache', en: 'Multi-layer caching with Cloudflare, Varnish, Redis, and OpCache' } },
      { type: 'text', text: { de: 'Einsatz von Findologic für die Suche', en: 'Use of Findologic for search' } },
      {
        type: 'text',
        text: { de: 'Marketing Integration mit Google, Facebook, Instagram, Criteo, Idealo, Cleverreach', en: 'Marketing integrations: Google, Facebook, Instagram, Criteo, Idealo, Cleverreach' },
      },
      {
        type: 'text',
        text: { de: 'Tracking Integration mit Google Tag Manager und Google Analytics Enhanced Ecommerce', en: 'Tracking integrations with Google Tag Manager and Google Analytics Enhanced Ecommerce' },
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

