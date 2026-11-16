export type JobSection =
  | { type: 'paragraphs'; title?: { de: string; en: string; bg: string }; items: readonly { de: string; en: string; bg: string }[] }
  | { type: 'bullets'; title: { de: string; en: string; bg: string }; items: readonly { de: string; en: string; bg: string }[] }

export type JobPosting = {
  slug: 'senior-frontend-developer' | 'senior-php-magento-developer' | 'senior-fullstack-developer'
  title: { de: string; en: string; bg: string }
  intro: readonly { de: string; en: string; bg: string }[]
  sections: readonly JobSection[]
  applyEmail: string
}

export const jobs: readonly JobPosting[] = [
  {
    slug: 'senior-frontend-developer',
    title: { de: '(Senior) Frontend developer (m/w/d)', en: '(Senior) Frontend Developer (m/f/d)', bg: '(Senior) Frontend Developer' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
        bg: 'Ecommlab GmbH е динамично развиваща се компания със седалище в Германия, специализирана в разработката на решения за електронна търговия. Търсим квалифицирани специалисти, с които да подсилим екипа си.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
        bg: 'Основателите на Ecommlab носят богат опит – преди това са били технически директори (CTO) в утвърдени германски ИТ компании.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do', bg: 'Какво ще правиш' },
        items: [
          {
            de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf dem LAMP-Stack und modernen Frontend-Technologien und Methoden (wie React, Vue, Angular, PWA)',
            en: 'Implement high-quality, scalable solutions based on the LAMP stack and modern frontend technologies and practices (React, Vue, Angular, PWA)',
            bg: 'Реализираш качествени и мащабируеми решения на базата на LAMP стека и съвременни frontend технологии и подходи (като React, Vue, Angular, PWA)',
          },
          {
            de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Verbindung zu externen Systemen',
            en: 'Build new and improve existing custom shop functionalities and their integrations with external systems',
            bg: 'Разработваш нови и подобряваш съществуващи индивидуални функционалности на магазина, както и връзката им с външни системи',
          },
          {
            de: 'Konzipiere, implementiere und verbessere benutzerdefinierte Module (z.B. für Magento / Shopware)',
            en: 'Design, implement, and enhance custom modules (e.g., for Magento / Shopware)',
            bg: 'Проектираш, реализираш и подобряваш собствени модули (напр. за Magento / Shopware)',
          },
          {
            de: 'Bewerte und führe innovative und fortschrittliche Frontend-Technologien basierend auf PWA und GraphQL ein',
            en: 'Evaluate and introduce advanced frontend technologies based on PWA and GraphQL',
            bg: 'Оценяваш и въвеждаш иновативни frontend технологии на базата на PWA и GraphQL',
          },
          {
            de: 'Übernimm die End-to-End-Verantwortung für Produktfunktionen und sichere die technische und operative Exzellenz dieser Produkte',
            en: 'Take end-to-end ownership of product features and ensure technical and operational excellence',
            bg: 'Поемаш цялостна отговорност за продуктовите функции и гарантираш тяхното техническо и оперативно качество',
          },
          {
            de: 'Trage zum Produkt- und Serviceentwicklungsprozess bei; Entwerfe und teste deine eigenen Hypothesen durch das Sammeln und Messen von Daten',
            en: 'Contribute to product and service development; design and test hypotheses by collecting and measuring data',
            bg: 'Допринасяш за процеса на разработка на продукти и услуги; формулираш и проверяваш собствени хипотези чрез събиране и измерване на данни',
          },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring', bg: 'Какво очакваме от теб' },
        items: [
          {
            de: 'Wir suchen proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen',
            en: 'You are a proactive problem solver, eager to learn, collaborate, and share ideas',
            bg: 'Търсим проактивни хора, които решават проблеми, имат желание да учат и умеят да работят заедно и да обменят идеи',
          },
          { de: 'Ein Studium in Informatik oder einem verwandten Feld', en: 'Degree in computer science or a related field', bg: 'Висше образование по информатика или сродна специалност' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills', bg: 'Отлични комуникационни умения – устно и писмено' },
          {
            de: 'Eigeninitiative, mit der Fähigkeit, mit begrenzter Aufsicht und als Teamplayer zu arbeiten',
            en: 'Ownership mindset — able to work with limited supervision and as a team player',
            bg: 'Инициативност и способност да работиш самостоятелно, но и като част от екип',
          },
          {
            de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung',
            en: 'Several years of experience building complex web applications and backend systems',
            bg: 'Няколко години опит в разработката на сложни уеб приложения и в backend разработката',
          },
          {
            de: 'Du kannst erstklassige Frontends mit HTML, LESS/SASS, JavaScript und responsiven Frameworks implementieren',
            en: 'You can implement top-class frontends with HTML, LESS/SASS, JavaScript, and responsive frameworks',
            bg: 'Можеш да изграждаш първокласни frontend решения с HTML, LESS/SASS, JavaScript и responsive frameworks',
          },
          { de: 'Praktische Erfahrung mit JS-Frameworks wie React, Vue.js oder Angular', en: 'Hands-on experience with JS frameworks like React, Vue.js, or Angular', bg: 'Практически опит с JS frameworks като React, Vue.js или Angular' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus', bg: 'Опит с Progressive Web Apps, GraphQL, Node.js или Next.js е предимство' },
          { de: 'Erfahrung mit Magento und/oder Shopware sowie mit gängigen Frameworks wie Zend oder Symfony ist von Vorteil', en: 'Experience with Magento and/or Shopware and frameworks like Zend or Symfony is a plus', bg: 'Опит с Magento и/или Shopware, както и с разпространени frameworks като Zend или Symfony, е предимство' },
          { de: 'Sichere Anwendung von Bash und Shell ist von Vorteil', en: 'Comfort with Bash and shell scripting is a plus', bg: 'Увереното боравене с Bash и shell е предимство' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect', bg: 'Какво те очаква' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services', bg: 'Приятелска работна среда, насочена към създаването на качествени продукти и услуги за клиентите' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset', bg: 'Плоска йерархия с бързи решения и подход, ориентиран към резултата' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home', bg: 'Гъвкаво работно време, спокойна атмосфера и възможност за работа от вкъщи' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership', bg: 'Работа по предизвикателни проекти под ръководството на опитни колеги' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training', bg: 'Възможности за развитие (ръководство на екип) и бъдещи обучения' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation', bg: 'Атрактивно възнаграждение в горния диапазон' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development', bg: 'Бюджет за обучение и развитие – както време, така и средства' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks', bg: 'Висок клас техника (и за лично ползване) и допълнителни придобивки' },
        ],
      },
    ],
  },
  {
    slug: 'senior-php-magento-developer',
    title: { de: '(Senior) PHP / Magento developer (m/w/d)', en: '(Senior) PHP / Magento Developer (m/f/d)', bg: '(Senior) PHP / Magento Developer' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
        bg: 'Ecommlab GmbH е динамично развиваща се компания със седалище в Германия, специализирана в разработката на решения за електронна търговия. Търсим квалифицирани специалисти, с които да подсилим екипа си.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
        bg: 'Основателите на Ecommlab носят богат опит – преди това са били технически директори (CTO) в утвърдени германски ИТ компании.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do', bg: 'Какво ще правиш' },
        items: [
          { de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf Magento Commerce und Magento Open Source', en: 'Implement high-quality, scalable solutions based on Magento Commerce and Magento Open Source', bg: 'Реализираш качествени и мащабируеми решения на базата на Magento Commerce и Magento Open Source' },
          { de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Anbindung an externe Systeme', en: 'Build and improve custom shop functionality and integrations with external systems', bg: 'Разработваш нови и подобряваш съществуващи индивидуални функционалности на магазина, както и интеграцията им с външни системи' },
          { de: 'Konzipiere, implementiere und verbessere Magento-Module', en: 'Design, implement, and enhance Magento modules', bg: 'Проектираш, реализираш и подобряваш Magento модули' },
          { de: 'Integriere fortschrittliche Frontend-Lösungen basierend auf PWA und GraphQL', en: 'Integrate advanced frontend solutions based on PWA and GraphQL', bg: 'Интегрираш съвременни frontend решения на базата на PWA и GraphQL' },
          { de: 'Übernimm die End-to-End-Verantwortung für Produktfunktionen und sichere die technische und betriebliche Exzellenz dieser Produkte', en: 'Take end-to-end ownership of product features and ensure technical and operational excellence', bg: 'Поемаш цялостна отговорност за продуктовите функции и гарантираш тяхното техническо и експлоатационно качество' },
          { de: 'Trage zum Entwicklungsprozess der Produkte und Dienstleistungen bei; Entwerfe und teste deine eigenen Hypothesen durch Sammeln und Messen von Daten', en: 'Contribute to product/service development; design and test hypotheses by collecting and measuring data', bg: 'Допринасяш за процеса на разработка на продуктите и услугите; формулираш и проверяваш собствени хипотези чрез събиране и измерване на данни' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring', bg: 'Какво очакваме от теб' },
        items: [
          {
            de: 'Neben akademischen Qualifikationen suchen wir proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen, und vor allem Teamplayer',
            en: 'Beyond academics, you are a proactive problem solver, eager to learn, collaborate, and share ideas — a true team player',
            bg: 'Освен академичната квалификация търсим проактивни хора, които решават проблеми, имат желание да учат, умеят да работят заедно и да обменят идеи – и най-вече са екипни играчи',
          },
          { de: 'Abschluss in Informatik oder einem verwandten Bereich', en: 'Degree in computer science or a related field', bg: 'Диплома по информатика или сродна област' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills', bg: 'Отлични комуникационни умения – устно и писмено' },
          { de: 'Eigeninitiative, mit der Fähigkeit, unter begrenzter Aufsicht zu arbeiten und ein Teamplayer zu sein', en: 'Ownership mindset; able to work with limited supervision and collaborate as a team', bg: 'Инициативност, способност да работиш с ограничен надзор и да бъдеш екипен играч' },
          { de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung', en: 'Several years of experience building complex web applications and backend systems', bg: 'Няколко години опит в разработката на сложни уеб приложения и в backend разработката' },
          { de: 'Erfahrung mit Magento sowie mit gängigen Frameworks wie Zend oder Symfony', en: 'Experience with Magento and common frameworks like Zend or Symfony', bg: 'Опит с Magento, както и с разпространени frameworks като Zend или Symfony' },
          { de: 'Erfahrung mit Versionskontrollsystemen, Varnish und Elasticsearch', en: 'Experience with version control, Varnish, and Elasticsearch', bg: 'Опит със системи за контрол на версиите, Varnish и Elasticsearch' },
          { de: 'Sichere Anwendung von Bash und Shell', en: 'Strong Bash and shell skills', bg: 'Уверено боравене с Bash и shell' },
          { de: 'Fokus auf hohe Codequalität in Übereinstimmung mit Codekonventionen und strukturierten Deployment-Prozessen', en: 'High code quality mindset, following conventions and structured deployment processes', bg: 'Фокус върху високо качество на кода в съответствие с конвенциите и структурирани процеси на внедряване' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus', bg: 'Опит с Progressive Web Apps, GraphQL, Node.js или Next.js е предимство' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect', bg: 'Какво те очаква' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services', bg: 'Приятелска работна среда, насочена към създаването на качествени продукти и услуги за клиентите' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset', bg: 'Плоска йерархия с бързи решения и подход, ориентиран към резултата' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home', bg: 'Гъвкаво работно време, спокойна атмосфера и възможност за работа от вкъщи' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership', bg: 'Работа по предизвикателни проекти под ръководството на опитни колеги' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training', bg: 'Възможности за развитие (ръководство на екип) и бъдещи обучения' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation', bg: 'Атрактивно възнаграждение в горния диапазон' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development', bg: 'Бюджет за обучение и развитие – както време, така и средства' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks', bg: 'Висок клас техника (и за лично ползване) и допълнителни придобивки' },
        ],
      },
    ],
  },
  {
    slug: 'senior-fullstack-developer',
    title: { de: '(Senior) Fullstack developer (m/w/d)', en: '(Senior) Fullstack Developer (m/f/d)', bg: '(Senior) Fullstack Developer' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
        bg: 'Ecommlab GmbH е динамично развиваща се компания със седалище в Германия, специализирана в разработката на решения за електронна търговия. Търсим квалифицирани специалисти, с които да подсилим екипа си.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
        bg: 'Основателите на Ecommlab носят богат опит – преди това са били технически директори (CTO) в утвърдени германски ИТ компании.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do', bg: 'Какво ще правиш' },
        items: [
          { de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf dem LAMP-Stack und modernsten Frontend-Technologien und Methoden (wie React, Vue, Angular, PWA)', en: 'Implement high-quality, scalable solutions based on the LAMP stack and modern frontend technologies and practices (React, Vue, Angular, PWA)', bg: 'Реализираш качествени и мащабируеми решения на базата на LAMP стека и най-съвременни frontend технологии и подходи (като React, Vue, Angular, PWA)' },
          { de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Verbindung zu externen Systemen', en: 'Build new and improve existing custom shop functionalities and integrations with external systems', bg: 'Разработваш нови и подобряваш съществуващи индивидуални функционалности на магазина, както и връзката им с външни системи' },
          { de: 'Konzipiere, implementiere und verbessere benutzerdefinierte Module (z.B. für Magento / Shopware)', en: 'Design, implement, and enhance custom modules (e.g., for Magento / Shopware)', bg: 'Проектираш, реализираш и подобряваш собствени модули (напр. за Magento / Shopware)' },
          { de: 'Bewerte und führe innovative und fortschrittliche Frontend-Technologien basierend auf PWA und GraphQL ein', en: 'Evaluate and introduce advanced frontend technologies based on PWA and GraphQL', bg: 'Оценяваш и въвеждаш иновативни frontend технологии на базата на PWA и GraphQL' },
          { de: 'Übernimm die komplette Verantwortung für die Produktfunktionen und garantiere die technische und betriebliche Exzellenz dieser Produkte', en: 'Take full ownership of product features and guarantee technical and operational excellence', bg: 'Поемаш пълната отговорност за продуктовите функции и гарантираш тяхното техническо и експлоатационно качество' },
          { de: 'Trage zum Entwicklungsprozess der Produkte und Dienstleistungen bei; Entwerfe und teste deine eigenen Hypothesen durch das Sammeln und Messen von Daten', en: 'Contribute to product/service development; design and test hypotheses by collecting and measuring data', bg: 'Допринасяш за процеса на разработка на продуктите и услугите; формулираш и проверяваш собствени хипотези чрез събиране и измерване на данни' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring', bg: 'Какво очакваме от теб' },
        items: [
          { de: 'Wir suchen proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen', en: 'You are a proactive problem solver, eager to learn, collaborate, and share ideas', bg: 'Търсим проактивни хора, които решават проблеми, имат желание да учат и умеят да работят заедно и да обменят идеи' },
          { de: 'Abschluss in Informatik oder einem verwandten Bereich', en: 'Degree in computer science or a related field', bg: 'Диплома по информатика или сродна област' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills', bg: 'Отлични комуникационни умения – устно и писмено' },
          { de: 'Eigeninitiative, mit der Fähigkeit, unter begrenzter Aufsicht zu arbeiten und ein Teamplayer zu sein', en: 'Ownership mindset; able to work with limited supervision and collaborate as a team', bg: 'Инициативност, способност да работиш с ограничен надзор и да бъдеш екипен играч' },
          { de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung', en: 'Several years of experience building complex web applications and backend systems', bg: 'Няколко години опит в разработката на сложни уеб приложения и в backend разработката' },
          { de: 'Du kannst erstklassige Frontends mit HTML, LESS/SASS, JavaScript und responsiven Frameworks implementieren', en: 'You can implement top-class frontends with HTML, LESS/SASS, JavaScript, and responsive frameworks', bg: 'Можеш да изграждаш първокласни frontend решения с HTML, LESS/SASS, JavaScript и responsive frameworks' },
          { de: 'Praktische Erfahrung mit JS-Frameworks wie React, Vue.js oder Angular', en: 'Hands-on experience with JS frameworks like React, Vue.js, or Angular', bg: 'Практически опит с JS frameworks като React, Vue.js или Angular' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus', bg: 'Опит с Progressive Web Apps, GraphQL, Node.js или Next.js е предимство' },
          { de: 'Erfahrung mit Magento und/oder Shopware sowie mit gängigen Frameworks wie Zend oder Symfony ist von Vorteil', en: 'Experience with Magento and/or Shopware and frameworks like Zend or Symfony is a plus', bg: 'Опит с Magento и/или Shopware, както и с разпространени frameworks като Zend или Symfony, е предимство' },
          { de: 'Sichere Anwendung von Bash und Shell ist von Vorteil', en: 'Comfort with Bash and shell scripting is a plus', bg: 'Увереното боравене с Bash и shell е предимство' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect', bg: 'Какво те очаква' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services', bg: 'Приятелска работна среда, насочена към създаването на качествени продукти и услуги за клиентите' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset', bg: 'Плоска йерархия с бързи решения и подход, ориентиран към резултата' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home', bg: 'Гъвкаво работно време, спокойна атмосфера и възможност за работа от вкъщи' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership', bg: 'Работа по предизвикателни проекти под ръководството на опитни колеги' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training', bg: 'Възможности за развитие (ръководство на екип) и бъдещи обучения' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation', bg: 'Атрактивно възнаграждение в горния диапазон' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development', bg: 'Бюджет за обучение и развитие – както време, така и средства' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks', bg: 'Висок клас техника (и за лично ползване) и допълнителни придобивки' },
        ],
      },
    ],
  },
] as const

export function getJobBySlug(slug: string) {
  return jobs.find((j) => j.slug === slug)
}

