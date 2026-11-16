export type TeamMember = {
  slug: string
  name: string
  role: { de: string; en: string; bg: string }
  bio?: { de: string; en: string; bg: string }
  photo?: string
  email?: string
  linkedin?: string
}

export const team: readonly TeamMember[] = [
  {
    slug: 'andrey-cekovski',
    name: 'Andrey Cekovski',
    role: {
      de: 'Geschäftsführer & Technologie-Strategie',
      en: 'Managing Director & Technology Strategy',
      bg: 'Управител и технологична стратегия',
    },
    bio: {
      de: 'Über 15 Jahre Erfahrung in Software Development und Performance Online Marketing. Projektleitung für Kunden wie Allianz, Thomas Cook, PayPal, HRS, alltours, Galeria Kaufhof und Conrad Electronic. Zuletzt CTO der One Advertising AG (diva-e Advertising GmbH). Dipl.-Informatik an der TUM. Schwerpunkte: Konzeption und Optimierung technischer und betrieblicher Prozesse, Entwicklung technologischer Strategien sowie Performance Online Marketing und Digitalstrategien.',
      en: 'More than 15 years of experience in software development and performance online marketing. Led projects for clients like Allianz, Thomas Cook, PayPal, HRS, alltours, Galeria Kaufhof and Conrad Electronic. Most recently CTO of One Advertising AG (diva-e Advertising GmbH). Computer Science degree (Dipl.-Informatik) from TUM. Focus areas: design and optimization of technical and operational processes, technology strategy and standards, performance online marketing and digital strategies.',
      bg: 'Над 15 години опит в разработката на софтуер и performance онлайн маркетинга. Ръководил е проекти за клиенти като Allianz, Thomas Cook, PayPal, HRS, alltours, Galeria Kaufhof и Conrad Electronic. Последно CTO на One Advertising AG (diva-e Advertising GmbH). Дипломиран информатик от Техническия университет в Мюнхен (TUM). Основни области: проектиране и оптимизация на технически и оперативни процеси, разработване на технологични стратегии, performance онлайн маркетинг и дигитални стратегии.',
    },
  },
  {
    slug: 'pavel-mihaylov',
    name: 'Pavel Mihaylov',
    role: {
      de: 'Geschäftsführer & E-Commerce Development',
      en: 'Managing Director & E-Commerce Development',
      bg: 'Управител и разработка за електронна търговия',
    },
    bio: {
      de: 'Über 15 Jahre Erfahrung in E-Commerce-Projekten und mehr als 80 erfolgreich umgesetzte Projekte für Kunden wie Newone, Pfundskerl, Liquid Life, Terracanis, Picard, Peter Kaiser, Sport Conrad und Sioux. Zuletzt Head of E-Commerce Development bei der One Commerce GmbH. Dipl.-Informatik an der TUM. Schwerpunkte: technische Konzeption von E-Commerce- und IT-Systemlandschaften, Umsetzung individueller und anspruchsvoller Shopsysteme und Prozesse sowie E-Commerce Performance Optimization.',
      en: 'More than 15 years of experience in e-commerce projects and over 80 successfully delivered projects for clients like Newone, Pfundskerl, Liquid Life, Terracanis, Picard, Peter Kaiser, Sport Conrad and Sioux. Most recently Head of E-Commerce Development at One Commerce GmbH. Computer Science degree (Dipl.-Informatik) from TUM. Focus areas: technical design of e-commerce and IT system landscapes, implementation of custom and demanding shop systems and processes, and e-commerce performance optimization.',
      bg: 'Над 15 години опит в проекти за електронна търговия и повече от 80 успешно реализирани проекта за клиенти като Newone, Pfundskerl, Liquid Life, Terracanis, Picard, Peter Kaiser, Sport Conrad и Sioux. Последно ръководител „Разработка за електронна търговия“ в One Commerce GmbH. Дипломиран информатик от Техническия университет в Мюнхен (TUM). Основни области: техническо проектиране на системни среди за електронна търговия и ИТ, реализация на индивидуални и сложни онлайн магазини и процеси, оптимизация на производителността в електронната търговия.',
    },
  },
  {
    slug: 'claudia-toepfer',
    name: 'Claudia Töpfer',
    role: {
      de: 'Content Marketing & Editorial',
      en: 'Content Marketing & Editorial',
      bg: 'Контент маркетинг и редакция',
    },
  },
  {
    slug: 'georgi-kasev',
    name: 'Georgi Kasev',
    role: {
      de: 'Frontend Development',
      en: 'Frontend Development',
      bg: 'Frontend разработка',
    },
  },
  {
    slug: 'yurii-savchenko',
    name: 'Yurii Savchenko',
    role: {
      de: 'Backend Development',
      en: 'Backend Development',
      bg: 'Backend разработка',
    },
  },
  {
    slug: 'alex-strilenko',
    name: 'Alex Strilenko',
    role: {
      de: 'Frontend Development',
      en: 'Frontend Development',
      bg: 'Frontend разработка',
    },
  },
  {
    slug: 'andrey-stoychev',
    name: 'Andrey Stoychev',
    role: {
      de: 'Projektmanagement',
      en: 'Project Management',
      bg: 'Управление на проекти',
    },
  },
  {
    slug: 'anna-sibiryakova',
    name: 'Anna Sibiryakova',
    role: {
      de: 'SEO-Expertin',
      en: 'SEO Expert',
      bg: 'SEO експерт',
    },
  },
  {
    slug: 'mila-tabakova',
    name: 'Mila Tabakova',
    role: {
      de: 'Affiliate Marketing',
      en: 'Affiliate Marketing',
      bg: 'Афилиейт маркетинг',
    },
  },
  {
    slug: 'yordanka-mihova',
    name: 'Yordanka Mihova',
    role: {
      de: 'QA Manager',
      en: 'QA Manager',
      bg: 'QA мениджър',
    },
  },
] as const

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
