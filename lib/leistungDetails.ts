export type LocalizedText = {
  de: string
  en: string
  bg: string
}

export type LeistungSection = {
  title: LocalizedText
  body: LocalizedText
}

export type LeistungDetail = {
  slug:
    | 'e-commerce'
    | 'web-development'
    | 'onlinemarketing'
    | 'strategy-consulting'
    | 'ux-design-usability'
    | 'seo-content'
    | 'platform-integration'
    | 'prerformance-boosting'
    | 'ki-automation'
    | 'partners-und-tools'
  kicker: LocalizedText
  title: LocalizedText
  intro: LocalizedText
  sections: readonly LeistungSection[]
}

export const leistungDetails: readonly LeistungDetail[] = [
  {
    slug: 'e-commerce',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: {
      de: 'Ihre E‑Commerce‑Lösungen – effizient, sicher, benutzerfreundlich',
      en: 'Your e-commerce solutions — efficient, secure, user-friendly',
      bg: 'Вашите решения за електронна търговия – ефективни, сигурни, удобни',
    },
    intro: {
      de: 'Bei Ecommlab verstehen wir die Herausforderungen und Chancen des digitalen Handels. Als spezialisierte E‑Commerce‑Agentur bieten wir umfassende Lösungen für Online‑Shop‑Entwicklung und ‑Optimierung, zugeschnitten auf die spezifischen Bedürfnisse Ihres Unternehmens.',
      en: 'At Ecommlab, we understand the challenges and opportunities of digital commerce. As a specialized e-commerce agency, we provide end-to-end solutions for shop development and optimization — tailored to your business needs.',
      bg: 'В Ecommlab разбираме предизвикателствата и възможностите на дигиталната търговия. Като специализирана агенция за електронна търговия предлагаме цялостни решения за разработка и оптимизация на онлайн магазини, съобразени с конкретните нужди на Вашата компания.',
    },
    sections: [
      {
        title: { de: 'Entwicklung maßgeschneiderter Online‑Shops', en: 'Custom online shop development', bg: 'Разработка на онлайн магазини по мярка' },
        body: {
          de: 'Wir erstellen einzigartige, benutzerfreundliche und ästhetisch ansprechende Online‑Shops. Unsere Experten nutzen moderne Technologien und Plattformen, damit Ihr Shop nicht nur gut aussieht, sondern auch funktional und skalierbar ist – von Produktpräsentation bis Checkout‑Optimierung.',
          en: 'We build unique, user-friendly, and visually strong online shops. Using modern technologies and platforms, we ensure your shop is scalable and functional — from product presentation to checkout optimization.',
          bg: 'Създаваме уникални, удобни и естетически издържани онлайн магазини. Нашите експерти използват съвременни технологии и платформи, за да бъде Вашият магазин не само красив, но и функционален и мащабируем – от представянето на продуктите до оптимизацията на поръчката.',
        },
      },
      {
        title: { de: 'Optimierung für höhere Konversionen', en: 'Conversion optimization', bg: 'Оптимизация за по-високи конверсии' },
        body: {
          de: 'Wir analysieren Ihren bestehenden Shop und identifizieren Verbesserungspotenziale. Mit bewährten UX/UI‑Strategien verbessern wir die Nutzerführung und steigern Konversionsraten nachhaltig.',
          en: 'We analyze your current shop to identify improvements. With proven UX/UI strategies, we improve user journeys and increase conversion rates sustainably.',
          bg: 'Анализираме съществуващия Ви магазин и откриваме възможностите за подобрение. С доказани UX/UI стратегии подобряваме пътя на потребителя и трайно повишаваме конверсиите.',
        },
      },
      {
        title: { de: 'Integration fortschrittlicher Funktionen', en: 'Advanced feature integrations', bg: 'Интеграция на съвременни функции' },
        body: {
          de: 'E‑Commerce entwickelt sich ständig weiter. Daher integrieren wir moderne Funktionen wie personalisierte Empfehlungen, Chatbots und automatisierte Marketing‑Tools, um das Einkaufserlebnis zu verbessern und Kundenbindung zu stärken.',
          en: 'E-commerce evolves fast. We integrate advanced features like personalized recommendations, chatbots, and marketing automation tools to improve the shopping experience and strengthen retention.',
          bg: 'Електронната търговия се развива непрекъснато. Затова интегрираме съвременни функции като персонализирани препоръки, чатботове и автоматизирани маркетингови инструменти, които подобряват пазаруването и укрепват лоялността на клиентите.',
        },
      },
      {
        title: { de: 'Datengetriebene Entscheidungsfindung', en: 'Data-driven decision making', bg: 'Решения, основани на данни' },
        body: {
          de: 'Wir helfen Ihnen, fundierte Entscheidungen auf Basis von Daten zu treffen. Mit leistungsstarken Analysetools verstehen wir Kundenverhalten und passen Strategien gezielt an.',
          en: 'We help you make confident decisions based on data. Using powerful analytics, we understand customer behavior and adjust strategies with precision.',
          bg: 'Помагаме Ви да вземате обосновани решения на базата на данни. С мощни аналитични инструменти разбираме поведението на клиентите и целенасочено адаптираме стратегиите.',
        },
      },
      {
        title: { de: 'Unterstützung und Wartung', en: 'Support & maintenance', bg: 'Съдействие и поддръжка' },
        body: {
          de: 'Auch nach dem Launch sind wir für Sie da – mit fortlaufender Unterstützung und Wartung, damit Ihr Shop reibungslos läuft und technologisch up‑to‑date bleibt.',
          en: 'After launch, we stay by your side with ongoing support and maintenance so your shop runs smoothly and remains up to date.',
          bg: 'И след старта оставаме до Вас – с постоянно съдействие и поддръжка, за да работи магазинът Ви безпроблемно и да остава технологично актуален.',
        },
      },
    ],
  },
  {
    slug: 'web-development',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: {
      de: 'Wir verwandeln innovative Ideen in funktionale, benutzerfreundliche Online‑Erlebnisse',
      en: 'We turn innovative ideas into functional, user-friendly digital experiences',
      bg: 'Превръщаме иновативните идеи във функционални и удобни онлайн изживявания',
    },
    intro: {
      de: 'Webshops und Websites sind digitale Visitenkarten und zentral für Kundengewinnung und ‑bindung. Wir beraten, konzipieren und entwickeln hochwertige, benutzerzentrierte Webpräsenzen – skalierbar, schnell und zukunftssicher.',
      en: 'Websites and webshops are your digital storefront and key to acquisition and retention. We consult, design, and build user-centric web experiences — scalable, fast, and future-proof.',
      bg: 'Онлайн магазините и уебсайтовете са дигиталната визитка на бизнеса и са ключови за привличането и задържането на клиенти. Консултираме, проектираме и разработваме качествени уеб решения, ориентирани към потребителя – мащабируеми, бързи и готови за бъдещето.',
    },
    sections: [
      {
        title: { de: 'Maßgeschneiderte Beratung', en: 'Tailored consulting', bg: 'Консултация по мярка' },
        body: {
          de: 'Gemeinsam entwickeln wir die optimale Online‑Strategie. Wir analysieren Ziele und Zielgruppen, damit Ihre Lösung nicht nur ansprechend und funktional ist, sondern auch effektiv kommuniziert.',
          en: 'We develop the right online strategy together. We analyze goals and audiences so your solution is not only beautiful and functional, but also communicates effectively.',
          bg: 'Заедно изграждаме оптималната онлайн стратегия. Анализираме целите и целевите групи, за да бъде решението Ви не само привлекателно и функционално, но и да комуникира ефективно.',
        },
      },
      {
        title: { de: 'Unser Fokus', en: 'Our focus', bg: 'Нашият фокус' },
        body: {
          de: 'Beim Aufbau neuer Webpräsenzen stärken wir die Markenidentität und schaffen eine intuitive User Experience. Wir kombinieren moderne Technologien mit bewährten Methoden, damit Ihre Plattform langfristig relevant und leistungsstark bleibt.',
          en: 'We strengthen your brand identity and create an intuitive user experience. We combine modern technologies with proven methods so your platform stays relevant and high-performing long term.',
          bg: 'При изграждането на нови уеб проекти укрепваме идентичността на марката и създаваме интуитивно потребителско изживяване. Съчетаваме съвременни технологии с доказани методи, за да остане платформата Ви актуална и производителна в дългосрочен план.',
        },
      },
      {
        title: { de: 'Redesign‑ und Skalierungsdienste', en: 'Redesign & scaling', bg: 'Редизайн и мащабиране' },
        body: {
          de: 'Für bestehende Webshops und Websites bieten wir Redesign und Skalierung: Wir revitalisieren Ihre Plattform, optimieren UX, Performance und Geschwindigkeit und bereiten sie auf mehr Traffic und wachsende Anforderungen vor.',
          en: 'For existing platforms, we redesign and scale: we refresh your experience, optimize UX and speed, and prepare your stack for increased traffic and new requirements.',
          bg: 'За съществуващи онлайн магазини и уебсайтове предлагаме редизайн и мащабиране: обновяваме платформата Ви, оптимизираме UX, производителността и скоростта и я подготвяме за повече трафик и нарастващи изисквания.',
        },
      },
      {
        title: { de: 'Fokus auf Nutzerorientierung', en: 'User-centered by default', bg: 'Потребителят в центъра' },
        body: {
          de: 'Nutzerorientierung steht im Zentrum – von der Konzeption bis zur Umsetzung. So entstehen Webshops und Websites, die ästhetisch überzeugen und sich nahtlos sowie intuitiv bedienen lassen.',
          en: 'User needs are central — from concept to delivery. The result: webshops and websites that look great and feel seamless and intuitive.',
          bg: 'Потребителят е в центъра – от концепцията до реализацията. Така се раждат онлайн магазини и уебсайтове, които убеждават с визията си и се използват лесно и интуитивно.',
        },
      },
    ],
  },
  {
    slug: 'onlinemarketing',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Wir digitalisieren Marketing', en: 'We digitalize marketing', bg: 'Правим маркетинга дигитален' },
    intro: {
      de: 'Erfolgreiches Online‑Marketing braucht einen ganzheitlichen, datengetriebenen Ansatz: klare Ziele, Zielgruppenverständnis und die kontinuierliche Optimierung relevanter Kanäle. Wir helfen, Ihre Online‑Präsenz zu stärken und Wachstum nachhaltig zu sichern.',
      en: 'Great online marketing is holistic and data-driven: clear goals, deep audience understanding, and continuous optimization of key channels. We help strengthen your presence and drive sustainable growth.',
      bg: 'Успешният онлайн маркетинг изисква цялостен подход, основан на данни: ясни цели, познаване на целевата група и постоянна оптимизация на важните канали. Помагаме Ви да засилите онлайн присъствието си и да осигурите устойчив растеж.',
    },
    sections: [
      {
        title: { de: 'Online‑Marketing‑Strategie', en: 'Online marketing strategy', bg: 'Стратегия за онлайн маркетинг' },
        body: {
          de: 'Mit agilen Methoden und kreativen Ansätzen entwickeln wir eine einzigartige, kundenorientierte Digital‑Marketing‑Strategie – für nachhaltigen Erfolg und messbare Wirkung.',
          en: 'Using agile methods and creative thinking, we craft a customer-centric digital marketing strategy — built for measurable, sustainable impact.',
          bg: 'С гъвкави методи и креативни подходи разработваме уникална, ориентирана към клиента стратегия за дигитален маркетинг – за траен успех и измерим ефект.',
        },
      },
      {
        title: { de: 'SEO', en: 'SEO', bg: 'SEO' },
        body: {
          de: 'Auch die besten Angebote helfen nicht, wenn sie nicht gefunden werden. Mit professioneller Suchmaschinenoptimierung steigern wir Sichtbarkeit und Relevanz – zugeschnitten auf Ihre Website und Ihren Online‑Shop.',
          en: 'Even the best offers are useless if no one finds them. With professional SEO, we increase visibility and relevance — tailored to your website and online shop.',
          bg: 'И най-добрите оферти не помагат, ако никой не ги намира. С професионална оптимизация за търсачки повишаваме видимостта и релевантността – съобразено с Вашия уебсайт и онлайн магазин.',
        },
      },
      {
        title: { de: 'SEA und Display‑Ads', en: 'SEA & display ads', bg: 'SEA и дисплейна реклама' },
        body: {
          de: 'SEA und Display‑Ads ermöglichen eine gezielte, messbare Ansprache potenzieller Kunden. Wir planen, steuern und optimieren Kampagnen, um Markenbekanntheit zu steigern und Kundenakquise zu fördern.',
          en: 'SEA and display ads enable targeted, measurable acquisition. We plan, manage, and optimize campaigns to increase awareness and drive new customers.',
          bg: 'SEA и дисплейната реклама позволяват целенасочено и измеримо достигане до потенциални клиенти. Планираме, управляваме и оптимизираме кампании, за да повишим познаваемостта на марката и да привлечем нови клиенти.',
        },
      },
      {
        title: { de: 'Datenbasiertes Marketing', en: 'Data-driven marketing', bg: 'Маркетинг, основан на данни' },
        body: {
          de: 'Durch Analysen und saubere Attribution werden Entscheidungen präziser. Wir identifizieren Präferenzen und Verhaltensmuster, entwickeln personalisierte Kampagnen und verbessern Konversionsraten sowie ROI.',
          en: 'With analytics and clean attribution, decisions become sharper. We identify preferences and behavior patterns, build personalized campaigns, and improve conversion and ROI.',
          bg: 'Анализите и коректната атрибуция правят решенията по-точни. Откриваме предпочитания и модели на поведение, създаваме персонализирани кампании и подобряваме конверсиите и възвръщаемостта (ROI).',
        },
      },
      {
        title: { de: 'Web‑Analyse', en: 'Web analytics', bg: 'Уеб анализ' },
        body: {
          de: 'Web‑Analyse liefert Einblicke in Nutzerverhalten (z. B. Verweildauer, Klickpfade, Konversionen). So identifizieren wir Schwachstellen, verbessern die Nutzererfahrung und steigern die Performance Ihrer Website.',
          en: 'Web analytics provides insights into behavior (time on site, paths, conversions). This helps us identify weaknesses, improve experience, and increase performance.',
          bg: 'Уеб анализът дава поглед върху поведението на потребителите (напр. време на престой, пътища на кликване, конверсии). Така откриваме слабите места, подобряваме потребителското изживяване и повишаваме ефективността на уебсайта Ви.',
        },
      },
      {
        title: { de: 'E‑Mail‑Marketing', en: 'Email marketing', bg: 'Имейл маркетинг' },
        body: {
          de: 'Wir unterstützen strategisch oder operativ – von Setup bis Optimierung. So sichern wir den dauerhaften Erfolg Ihrer E‑Mail‑Marketing‑Kampagnen und erweitern Ihr Know‑how durch Schulungen.',
          en: 'We support you strategically or operationally — from setup to optimization. This ensures lasting results and builds internal know-how through training.',
          bg: 'Подкрепяме Ви стратегически или оперативно – от настройката до оптимизацията. Така осигуряваме трайния успех на имейл кампаниите Ви и разширяваме ноу-хау на екипа Ви чрез обучения.',
        },
      },
    ],
  },
  {
    slug: 'strategy-consulting',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: {
      de: 'Expertise von den ersten Interaktion bis hin zum Abschluss des Kaufvorganges und darüber hinaus',
      en: 'Expertise from first interaction to checkout — and beyond',
      bg: 'Експертиза от първия контакт до завършването на покупката – и след това',
    },
    intro: {
      de: 'Erfolg im digitalen Handel beginnt mit einer fundierten Strategie. Jedes E‑Commerce‑Projekt ist einzigartig – deshalb entwickeln wir eine maßgeschneiderte Herangehensweise, die Ihr Geschäft in der digitalen Welt nach vorne bringt.',
      en: 'Success in digital commerce starts with a solid strategy. Every e-commerce project is unique — we build a tailored approach that moves your business forward.',
      bg: 'Успехът в дигиталната търговия започва със солидна стратегия. Всеки проект за електронна търговия е уникален – затова разработваме индивидуален подход, който придвижва бизнеса Ви напред в дигиталния свят.',
    },
    sections: [
      {
        title: { de: 'Zielgruppenanalyse und User‑Stories', en: 'Audience analysis & user stories', bg: 'Анализ на целевите групи и user stories' },
        body: {
          de: 'Wir tauchen tief in Ihre Zielgruppen ein, um Bedürfnisse und Verhaltensweisen zu verstehen. Mit detaillierten User‑Stories schaffen wir ein klares Bild Ihrer Kunden – als Basis für Strategien, die resonieren und konvertieren.',
          en: 'We dive deep into your audience to understand needs and behaviors. Detailed user stories create clarity — the foundation for strategies that resonate and convert.',
          bg: 'Навлизаме в дълбочина в целевите Ви групи, за да разберем нуждите и поведението им. С подробни user stories създаваме ясна картина на клиентите Ви – основа за стратегии, които достигат до тях и носят конверсии.',
        },
      },
      {
        title: { de: 'UI/UX‑ & E‑Commerce‑Strategien', en: 'UI/UX & e-commerce strategies', bg: 'UI/UX и стратегии за електронна търговия' },
        body: {
          de: 'Ein ansprechendes, intuitives Nutzererlebnis ist entscheidend für starke Konversionen. Wir entwerfen UI/UX‑Strategien, die ästhetisch überzeugen und gleichzeitig nahtlos funktionieren – mit Fokus auf Usability und Performance.',
          en: 'An intuitive experience is essential for strong conversions. We design UI/UX strategies that look great and work flawlessly — focused on usability and performance.',
          bg: 'Привлекателното и интуитивно потребителско изживяване е решаващо за високите конверсии. Разработваме UI/UX стратегии, които впечатляват визуално и същевременно работят безупречно – с фокус върху удобството и производителността.',
        },
      },
      {
        title: { de: 'Konzept und Prototyping', en: 'Concept & prototyping', bg: 'Концепция и прототипи' },
        body: {
          de: 'Wir übersetzen Visionen in greifbare Konzepte und Prototypen, die früh getestet und iterativ optimiert werden können. So stellen wir sicher, dass das finale Produkt Ihre Anforderungen erfüllt und die Erwartungen Ihrer Nutzer übertrifft.',
          en: 'We translate visions into concepts and prototypes that can be tested early and iterated fast. This ensures the final product meets requirements and exceeds user expectations.',
          bg: 'Превръщаме визиите в осезаеми концепции и прототипи, които могат да се тестват рано и да се подобряват итеративно. Така гарантираме, че крайният продукт отговаря на изискванията Ви и надминава очакванията на потребителите.',
        },
      },
    ],
  },
  {
    slug: 'ux-design-usability',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Kreieren von benutzerfokussierten Erfahrungen', en: 'Creating user-centric experiences', bg: 'Създаваме изживявания с фокус върху потребителя' },
    intro: {
      de: 'Wir schaffen durchdachte, intuitive User‑Experience‑Designs, die nicht nur gut aussehen, sondern auch reibungslos funktionieren. Unsere Usability‑Optimierung sorgt dafür, dass jeder Aspekt Ihrer E‑Commerce‑Plattform auf die Bedürfnisse Ihrer Kunden zugeschnitten ist.',
      en: 'We create thoughtful, intuitive user experiences that look great and work smoothly. Usability optimization ensures every aspect of your platform fits your customers’ needs.',
      bg: 'Създаваме обмислен и интуитивен UX дизайн, който не само изглежда добре, но и работи безпроблемно. Оптимизацията на удобството гарантира, че всеки аспект от платформата Ви за електронна търговия е съобразен с нуждите на клиентите Ви.',
    },
    sections: [
      {
        title: { de: 'Warum UX‑Design & Usability so wichtig sind', en: 'Why UX & usability matter', bg: 'Защо UX дизайнът и удобството са толкова важни' },
        body: {
          de: 'Benutzerfreundliches Design steigert Zufriedenheit und Bindung, erhöht Konversionsraten durch klare Navigation und reduziert Absprünge, weil Frustration und Missverständnisse vermieden werden.',
          en: 'User-friendly design boosts satisfaction and retention, increases conversions through clear navigation, and reduces bounce rates by preventing frustration and confusion.',
          bg: 'Удобният дизайн повишава удовлетвореността и лоялността, увеличава конверсиите чрез ясна навигация и намалява отпадането на посетители, защото спестява раздразнение и недоразумения.',
        },
      },
      {
        title: { de: 'Benutzerzentrierte Designansätze', en: 'User-centered design', bg: 'Дизайн, ориентиран към потребителя' },
        body: {
          de: 'Wir gestalten auf Basis echter Nutzerbedürfnisse und ‑verhalten – für Erlebnisse, die überzeugen und messbar performen.',
          en: 'We design based on real user needs and behaviors — for experiences that delight and perform measurably.',
          bg: 'Проектираме на базата на реалните нужди и поведение на потребителите – за изживявания, които убеждават и носят измерими резултати.',
        },
      },
      {
        title: { de: 'Responsives Webdesign', en: 'Responsive design', bg: 'Адаптивен уеб дизайн' },
        body: {
          de: 'Unsere Designs funktionieren auf allen Geräten optimal – vom Desktop bis zum Smartphone.',
          en: 'Our designs work beautifully on every device — from desktop to smartphone.',
          bg: 'Нашите дизайни работят оптимално на всички устройства – от настолния компютър до смартфона.',
        },
      },
      {
        title: { de: 'Usability‑Tests', en: 'Usability testing', bg: 'Тестове за удобство' },
        body: {
          de: 'Regelmäßige Tests mit echten Nutzern stellen sicher, dass Designs nicht nur ästhetisch, sondern auch praktisch und benutzerfreundlich sind.',
          en: 'Regular testing with real users ensures designs are not only beautiful but also practical and easy to use.',
          bg: 'Редовните тестове с реални потребители гарантират, че дизайнът е не само естетичен, но и практичен и удобен.',
        },
      },
      {
        title: { de: 'Interaktionsdesign & Accessibility', en: 'Interaction design & accessibility', bg: 'Интерактивен дизайн и достъпност' },
        body: {
          de: 'Wir schaffen interaktive Elemente, die das Einkaufserlebnis verbessern, und stellen sicher, dass Ihre Plattform für alle Nutzer zugänglich und bedienbar bleibt.',
          en: 'We craft interactions that improve shopping — and ensure your platform remains accessible for everyone.',
          bg: 'Създаваме интерактивни елементи, които подобряват пазаруването, и гарантираме, че платформата Ви остава достъпна и удобна за всички потребители.',
        },
      },
    ],
  },
  {
    slug: 'seo-content',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Verbessern Sie Ihre Sichtbarkeit und Reichweite im digitalen Raum', en: 'Increase your visibility and reach online', bg: 'Подобрете видимостта и обхвата си в дигиталното пространство' },
    intro: {
      de: 'Eine starke Online‑Präsenz ist entscheidend, um im E‑Commerce erfolgreich zu sein. Mit SEO und Content‑Strategie sorgen wir dafür, dass Sie genau dort sichtbar werden, wo Ihre Kunden suchen.',
      en: 'A strong online presence is essential for e-commerce success. With SEO and content strategy, we make sure you are visible exactly where customers search.',
      bg: 'Силното онлайн присъствие е решаващо за успеха в електронната търговия. Със SEO и стратегия за съдържание се грижим да бъдете видими точно там, където клиентите Ви търсят.',
    },
    sections: [
      {
        title: { de: 'Warum SEO & Content entscheidend sind', en: 'Why SEO & content are crucial', bg: 'Защо SEO и съдържанието са решаващи' },
        body: {
          de: 'Gezielte SEO‑Maßnahmen erhöhen Sichtbarkeit in Suchmaschinen, relevanter Content baut Markenautorität und Vertrauen auf und verbessert die Kundenbindung durch höhere Verweildauer.',
          en: 'SEO improves visibility in search. Relevant content builds authority and trust and increases engagement — strengthening customer retention.',
          bg: 'Целенасочените SEO мерки повишават видимостта в търсачките, а релевантното съдържание изгражда авторитет и доверие към марката и подобрява лоялността на клиентите чрез по-дълъг престой на сайта.',
        },
      },
      {
        title: { de: 'SEO‑Audits & Keyword‑Optimierung', en: 'SEO audits & keyword optimization', bg: 'SEO одити и оптимизация на ключови думи' },
        body: {
          de: 'Wir analysieren Ihre Website technisch und inhaltlich, identifizieren Quick‑Wins und optimieren Inhalte anhand relevanter Keywords.',
          en: 'We analyze your site technically and editorially, identify quick wins, and optimize content around relevant keywords.',
          bg: 'Анализираме уебсайта Ви технически и съдържателно, откриваме бързите победи и оптимизираме съдържанието според релевантните ключови думи.',
        },
      },
      {
        title: { de: 'On‑Page & Off‑Page SEO', en: 'On-page & off-page SEO', bg: 'On-page и off-page SEO' },
        body: {
          de: 'Von Meta‑Daten über Informationsarchitektur bis Backlinks: Wir optimieren alle Faktoren für nachhaltige Performance.',
          en: 'From metadata and information architecture to backlinks — we optimize the full stack for sustainable performance.',
          bg: 'От метаданните през информационната архитектура до обратните връзки: оптимизираме всички фактори за устойчиви резултати.',
        },
      },
      {
        title: { de: 'Content‑Audit, Strategie & Erstellung', en: 'Content audit, strategy & creation', bg: 'Одит, стратегия и създаване на съдържание' },
        body: {
          de: 'Wir prüfen bestehenden Content, entwickeln eine maßgeschneiderte Strategie und erstellen Inhalte (z. B. Blog, Produkttexte, Guides), die Nutzer anziehen und konvertieren.',
          en: 'We review existing content, define a tailored strategy, and create assets (blog, product copy, guides) that attract users and convert.',
          bg: 'Преглеждаме съществуващото съдържание, разработваме индивидуална стратегия и създаваме съдържание (напр. блог, продуктови текстове, ръководства), което привлича потребители и носи конверсии.',
        },
      },
      {
        title: { de: 'Analyse & Reporting', en: 'Analysis & reporting', bg: 'Анализ и отчети' },
        body: {
          de: 'Regelmäßige Auswertungen und Reports machen Fortschritt transparent – und schaffen die Basis für kontinuierliche Optimierung.',
          en: 'Regular analysis and reporting make progress transparent — and power continuous optimization.',
          bg: 'Редовните анализи и отчети правят напредъка прозрачен – и създават основата за постоянна оптимизация.',
        },
      },
    ],
  },
  {
    slug: 'platform-integration',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Fördern Sie einen effizienten Datenaustausch in Ihrer Systemlandschaft', en: 'Enable efficient data exchange across your system landscape', bg: 'Осигурете ефективен обмен на данни във Вашата системна среда' },
    intro: {
      de: 'Plattformintegration ist ein zentraler Hebel im modernen E‑Commerce. Wir verbinden Systeme und Tools nahtlos, damit Prozesse effizienter werden und Kundenerlebnisse konsistent bleiben – über alle Touchpoints hinweg.',
      en: 'Platform integration is a key lever in modern e-commerce. We connect systems and tools seamlessly so processes become efficient and customer experiences stay consistent across touchpoints.',
      bg: 'Интеграцията на платформи е ключов лост в съвременната електронна търговия. Свързваме системи и инструменти безпроблемно, за да станат процесите по-ефективни, а клиентското изживяване да остане последователно – във всички точки на контакт.',
    },
    sections: [
      {
        title: { de: 'Warum Plattformintegration wichtig ist', en: 'Why integration matters', bg: 'Защо интеграцията на платформи е важна' },
        body: {
          de: 'Integration steigert Effizienz durch Automatisierung, verbessert die Customer Experience durch nahtlose Abläufe und sorgt für Datenkonsistenz – als Grundlage für valide Analysen und Entscheidungen.',
          en: 'Integration increases efficiency through automation, improves experience through seamless flows, and ensures consistent data — the basis for reliable analytics and decisions.',
          bg: 'Интеграцията повишава ефективността чрез автоматизация, подобрява клиентското изживяване чрез плавни процеси и осигурява съгласуваност на данните – основа за надеждни анализи и решения.',
        },
      },
      {
        title: { de: 'Analyse & Planung', en: 'Analysis & planning', bg: 'Анализ и планиране' },
        body: {
          de: 'Wir analysieren bestehende Systeme und definieren Integrationsbedürfnisse, Datenflüsse und Zielarchitektur.',
          en: 'We analyze your systems and define integration needs, data flows, and target architecture.',
          bg: 'Анализираме съществуващите системи и определяме нуждите от интеграция, потоците от данни и целевата архитектура.',
        },
      },
      {
        title: { de: 'Tool‑Auswahl (iPaaS / API‑Management)', en: 'Tool selection (iPaaS / API management)', bg: 'Избор на инструменти (iPaaS / API мениджмънт)' },
        body: {
          de: 'Wir wählen passende Tools und Technologien aus, um Ihre Plattformen effizient und zukunftssicher zu integrieren.',
          en: 'We pick the right tools and technologies to integrate your platforms efficiently and future-proof.',
          bg: 'Избираме подходящите инструменти и технологии, за да интегрираме платформите Ви ефективно и с поглед към бъдещето.',
        },
      },
      {
        title: { de: 'Implementierung, Testing & Betrieb', en: 'Implementation, testing & operations', bg: 'Внедряване, тестване и експлоатация' },
        body: {
          de: 'Wir implementieren Integrationen, testen umfassend und bieten laufende Wartung und Support, damit alles stabil, sicher und aktuell bleibt.',
          en: 'We implement and test thoroughly and provide ongoing maintenance and support to keep everything stable, secure, and up to date.',
          bg: 'Внедряваме интеграциите, тестваме обстойно и предлагаме текуща поддръжка, за да остане всичко стабилно, сигурно и актуално.',
        },
      },
    ],
  },
  {
    slug: 'prerformance-boosting',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Steigern Sie Ihre Leistung durch innovative Technologien', en: 'Boost performance with modern technologies', bg: 'Повишете резултатите си с иновативни технологии' },
    intro: {
      de: 'Performance Boosting umfasst Maßnahmen zur Optimierung von Geschwindigkeit, Stabilität und Effizienz von Websites und Webanwendungen – für bessere User Experience, höhere Konversion und bessere Rankings.',
      en: 'Performance boosting improves speed, stability, and efficiency of websites and web apps — for better UX, higher conversion, and stronger rankings.',
      bg: 'Performance Boosting обхваща мерки за оптимизация на скоростта, стабилността и ефективността на уебсайтове и уеб приложения – за по-добро потребителско изживяване, по-високи конверсии и по-добро класиране.',
    },
    sections: [
      {
        title: { de: 'Speed‑ & Conversion‑Rate‑Optimierung', en: 'Speed & conversion rate optimization', bg: 'Оптимизация на скоростта и конверсиите' },
        body: {
          de: 'Wir verbessern Ladezeiten und optimieren die Nutzerführung, um mehr Nutzer zu Aktionen wie Kauf oder Registrierung zu bewegen.',
          en: 'We improve load times and user flows to increase purchases, signups, and other key actions.',
          bg: 'Подобряваме времето за зареждане и оптимизираме пътя на потребителя, за да стигат повече посетители до действия като покупка или регистрация.',
        },
      },
      {
        title: { de: 'Core Web Vitals', en: 'Core Web Vitals', bg: 'Core Web Vitals' },
        body: {
          de: 'Wir setzen Googles Standards für Nutzererfahrung um – für bessere UX und potenziell bessere Sichtbarkeit in Suchergebnissen.',
          en: 'We implement Google’s UX standards — improving experience and potentially search visibility.',
          bg: 'Прилагаме стандартите на Google за потребителско изживяване – за по-добър UX и потенциално по-добра видимост в резултатите от търсенето.',
        },
      },
      {
        title: { de: 'Daten‑Analyse & Prozessoptimierung', en: 'Data analysis & process optimization', bg: 'Анализ на данни и оптимизация на процеси' },
        body: {
          de: 'Durch Analysen identifizieren wir Engpässe und optimieren Prozesse zielgerichtet – für effizientere Abläufe und bessere Ergebnisse.',
          en: 'We find bottlenecks with data and optimize processes — for more efficient operations and better results.',
          bg: 'Чрез анализи откриваме тесните места и целенасочено оптимизираме процесите – за по-ефективна работа и по-добри резултати.',
        },
      },
      {
        title: { de: 'Caching, CDN & Load Balancing', en: 'Caching, CDN & load balancing', bg: 'Кеширане, CDN и балансиране на натоварването' },
        body: {
          de: 'Wir etablieren erweiterte Caching‑Strategien, integrieren CDNs und konfigurieren Load Balancing – für schnelle, ausfallsichere Plattformen auch bei hohem Traffic.',
          en: 'We set up advanced caching, integrate CDNs, and configure load balancing — for fast, resilient platforms even under heavy traffic.',
          bg: 'Изграждаме разширени стратегии за кеширане, интегрираме CDN и конфигурираме балансиране на натоварването – за бързи и устойчиви платформи дори при висок трафик.',
        },
      },
    ],
  },
  {
    slug: 'ki-automation',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Gestalten Sie Ihre Prozesse mit revolutionären Technologien', en: 'Shape your processes with revolutionary technologies', bg: 'Оформете процесите си с революционни технологии' },
    intro: {
      de: 'Mit KI‑gestützter Automatisierung steigern wir Effizienz, senken Kosten und schaffen außergewöhnliche Kundenerlebnisse. Wir helfen Ihnen, KI sinnvoll in Ihre E‑Commerce‑Prozesse zu integrieren – pragmatisch und messbar.',
      en: 'With AI-powered automation, we increase efficiency, reduce costs, and create outstanding customer experiences. We help you integrate AI into your e-commerce processes — pragmatic and measurable.',
      bg: 'С автоматизация, подпомагана от изкуствен интелект, повишаваме ефективността, намаляваме разходите и създаваме изключителни клиентски изживявания. Помагаме Ви да интегрирате ИИ смислено в процесите на електронната си търговия – прагматично и измеримо.',
    },
    sections: [
      {
        title: { de: 'KI‑Vorteile in Ihrem Business', en: 'Benefits of AI for your business', bg: 'Ползите от ИИ за Вашия бизнес' },
        body: {
          de: 'KI automatisiert Routinen, ermöglicht datengetriebene Entscheidungen und schafft personalisierte Kundenerlebnisse – von Empfehlungen bis zu maßgeschneiderten Kampagnen.',
          en: 'AI automates routines, enables data-driven decisions, and powers personalization — from recommendations to tailored campaigns.',
          bg: 'ИИ автоматизира рутинните задачи, позволява решения, основани на данни, и създава персонализирани клиентски изживявания – от препоръки до кампании по мярка.',
        },
      },
      {
        title: { de: 'Chatbots & Kundenservice', en: 'Chatbots & customer support', bg: 'Чатботове и обслужване на клиенти' },
        body: {
          de: 'Automatisierte Chatbots beantworten Anfragen in Echtzeit, sind rund um die Uhr verfügbar und skalieren den Support ohne Qualitätsverlust.',
          en: 'Automated chatbots answer in real time, are available 24/7, and scale support without sacrificing quality.',
          bg: 'Автоматизираните чатботове отговарят на запитвания в реално време, достъпни са денонощно и разширяват капацитета на поддръжката без загуба на качество.',
        },
      },
      {
        title: { de: 'Preisoptimierung', en: 'Price optimization', bg: 'Оптимизация на цените' },
        body: {
          de: 'KI‑Algorithmen passen Preise dynamisch an – basierend auf Nachfrage, Wettbewerb und Marktbedingungen – für maximalen Umsatz bei Wettbewerbsfähigkeit.',
          en: 'AI algorithms adjust prices dynamically based on demand, competition, and market conditions — maximizing revenue while staying competitive.',
          bg: 'Алгоритмите с ИИ адаптират цените динамично – според търсенето, конкуренцията и пазарните условия – за максимални приходи при запазена конкурентоспособност.',
        },
      },
      {
        title: { de: 'Marketingautomatisierung', en: 'Marketing automation', bg: 'Автоматизация на маркетинга' },
        body: {
          de: 'KI ermöglicht hochgradig personalisierte Ansprache durch Analyse von Verhalten und Präferenzen – für höhere Engagement‑ und Conversion‑Rates.',
          en: 'AI enables highly personalized messaging through behavior and preference analysis — improving engagement and conversion.',
          bg: 'ИИ позволява силно персонализирана комуникация чрез анализ на поведението и предпочитанията – за по-висока ангажираност и повече конверсии.',
        },
      },
    ],
  },
  {
    slug: 'partners-und-tools',
    kicker: { de: 'Leistungen', en: 'Services', bg: 'Услуги' },
    title: { de: 'Strategische Auswahl von Partnern, Systemen und Tools', en: 'Strategic selection of partners, systems, and tools', bg: 'Стратегически избор на партньори, системи и инструменти' },
    intro: {
      de: 'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E‑Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben – entscheidend für langfristigen Erfolg in einem sich schnell entwickelnden Markt.',
      en: 'Careful selection of partners, systems, and tools helps companies stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
      bg: 'Внимателният избор на партньори, системи и инструменти в електронната търговия позволява на компаниите да останат гъвкави, конкурентоспособни и ориентирани към клиента – решаващо за дългосрочния успех на бързо развиващ се пазар.',
    },
    sections: [
      {
        title: { de: 'Effizienzsteigerung', en: 'Efficiency gains', bg: 'По-висока ефективност' },
        body: {
          de: 'Die richtigen Tools und Systeme automatisieren und optimieren Prozesse – von Bestandsverwaltung über Auftragsabwicklung bis Kundenservice. Effiziente Abläufe helfen, mit dem Tempo des Online‑Handels Schritt zu halten.',
          en: 'The right tools automate and optimize processes — from inventory to fulfillment to customer support. Efficient operations keep pace with the speed of online commerce.',
          bg: 'Правилните инструменти и системи автоматизират и оптимизират процесите – от управлението на наличностите през обработката на поръчките до обслужването на клиенти. Ефективните процеси помагат да се поддържа темпото на онлайн търговията.',
        },
      },
      {
        title: { de: 'Skalierbarkeit', en: 'Scalability', bg: 'Мащабируемост' },
        body: {
          de: 'Skalierbare Systeme und Tools ermöglichen Wachstum – auch bei steigenden Besucherzahlen und Bestellungen, ohne Performance oder Kundenerfahrung zu beeinträchtigen.',
          en: 'Scalable systems enable growth — even with increasing traffic and orders — without compromising performance or customer experience.',
          bg: 'Мащабируемите системи и инструменти позволяват растеж – дори при нарастващ брой посетители и поръчки, без да страдат производителността или клиентското изживяване.',
        },
      },
      {
        title: { de: 'Verbesserte Kundenerfahrung', en: 'Better customer experience', bg: 'По-добро клиентско изживяване' },
        body: {
          de: 'Moderne E‑Commerce‑Systeme verbessern das Einkaufserlebnis, z. B. durch personalisierte Empfehlungen, reibungslose Zahlungsabwicklung und effiziente Suche. Ein positives Erlebnis stärkt Bindung und Weiterempfehlungen.',
          en: 'Modern systems improve shopping through personalization, frictionless payments, and efficient search. Great experiences increase retention and referrals.',
          bg: 'Съвременните системи за електронна търговия подобряват пазаруването – напр. чрез персонализирани препоръки, безпроблемно плащане и ефективно търсене. Положителното изживяване укрепва лоялността и препоръките.',
        },
      },
      {
        title: { de: 'Datenanalyse und Einblicke', en: 'Analytics & insights', bg: 'Анализ на данни и прозрения' },
        body: {
          de: 'Fortschrittliche Analysetools liefern Einblicke in Kundenverhalten, Markttrends und Geschäftsleistung – eine wichtige Basis für informierte Entscheidungen und strategische Planung.',
          en: 'Advanced analytics provide insights into customer behavior, trends, and performance — the foundation for informed decisions and planning.',
          bg: 'Съвременните аналитични инструменти дават поглед върху поведението на клиентите, пазарните тенденции и резултатите на бизнеса – важна основа за информирани решения и стратегическо планиране.',
        },
      },
      {
        title: { de: 'Sicherheit und Compliance', en: 'Security & compliance', bg: 'Сигурност и съответствие' },
        body: {
          de: 'Mit steigenden Anforderungen an Datenschutz und Sicherheit wählen wir Systeme und Tools, die aktuellen Standards entsprechen und Datenintegrität gewährleisten.',
          en: 'With rising privacy and security demands, we choose systems that meet modern standards and ensure data integrity.',
          bg: 'С нарастващите изисквания към защитата на данните и сигурността избираме системи и инструменти, които отговарят на актуалните стандарти и гарантират целостта на данните.',
        },
      },
      {
        title: { de: 'Wettbewerbsvorteil', en: 'Competitive advantage', bg: 'Конкурентно предимство' },
        body: {
          de: 'Die richtigen Partnerschaften und Technologien schaffen Differenzierung – z. B. durch Zugang zu neuen Märkten, bessere Ressourcen und innovative Lösungen, die Sie von der Konkurrenz abheben.',
          en: 'The right partnerships and technologies differentiate you — through access to new markets, better resources, and innovation that sets you apart.',
          bg: 'Правилните партньорства и технологии Ви отличават – напр. чрез достъп до нови пазари, по-добри ресурси и иновативни решения, които Ви поставят пред конкуренцията.',
        },
      },
    ],
  },
] as const

export function getLeistungBySlug(slug: LeistungDetail['slug']) {
  return leistungDetails.find((l) => l.slug === slug) ?? null
}

