import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { RechtListe, RechtSeite } from '../components/c2/RechtSeite'
import { normalizeLocale, tr } from '../lib/i18n'

declare global {
  interface Window {
    /** Von consentok.eu/cd.js bereitgestellt; zeichnet die Cookie-Erklärung in #ConsentokDeclaration. */
    consentokDeclaration?: { render(ziel?: Element): boolean }
  }
}

/** Texte unverändert aus der bisherigen Seite; Darstellung: components/c2/RechtSeite.tsx (Board „C2plus-ecommlab-Datenschutz“). */
export default function Datenschutzbestimmungen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const consentokId = process.env.NEXT_PUBLIC_CONSENTOK_ID || ''

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Datenschutzbestimmungen', 'Privacy policy', 'Политика за поверителност')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Datenschutzbestimmungen der Ecommlab GmbH – Informationen zur Verarbeitung personenbezogener Daten.',
            'Privacy policy of Ecommlab GmbH – information on the processing of personal data.',
            'Политика за поверителност на Ecommlab GmbH – информация за обработването на лични данни.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RechtSeite
        aktiv="datenschutz"
        lang
        zeilen={[
          {
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Ecommlab GmbH (nachfolgend „Ecommlab“) legt Wert auf den Schutz der Privatsphäre seiner Nutzer. Diese Datenschutzrichtlinie soll Ihnen helfen zu verstehen, wie wir personenbezogene Daten von Besuchern unserer Website erheben und verwenden.', 'Ecommlab GmbH (“Ecommlab”) values the protection of users’ privacy. This policy explains how we collect and use personal data from visitors of our website.', 'Ecommlab GmbH (наричано по-долу „Ecommlab“) държи на защитата на личното пространство на своите потребители. Тази политика за поверителност има за цел да Ви помогне да разберете как събираме и използваме личните данни на посетителите на нашия уебсайт.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Cookie-Einwilligung', 'Cookie consent', 'Съгласие за бисквитки'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Hier finden Sie die Cookie-Erklärung mit Details zu eingesetzten Cookies und deren Kategorien.', 'Here you can find the cookie declaration with details about used cookies and their categories.', 'Тук ще намерите декларацията за бисквитките с подробности за използваните бисквитки и техните категории.')}</p>
                {consentokId ? (
                  <>
                    {/*
                      Der Platzhalter bestimmt die Stelle. next/script hängt sein
                      Tag nach der Hydration ans Ende von <body> — ohne Platzhalter
                      landete die Erklärung unter dem Footer und blieb bei
                      Client-Navigation auf jeder Seite stehen. onReady feuert auch
                      beim erneuten Mounten: Das Skript läuft dann nicht noch
                      einmal, der frische Platzhalter wäre sonst leer.
                    */}
                    <div id="ConsentokDeclaration" />
                    <Script
                      // Erklärung in der Sprache der Seite. key und id tragen die Sprache: next/script lädt
                      // je Komponenten-Instanz nur einmal und merkt sich bekannte IDs – ohne beides bliebe
                      // nach einem Sprachwechsel (Client-Navigation) die alte Fassung stehen.
                      key={locale}
                      id={`consentok-cd-${locale}`}
                      src={`https://consentok.eu/cd.js?id=${encodeURIComponent(consentokId)}&lang=${locale}`}
                      strategy="afterInteractive"
                      onReady={() => {
                        window.consentokDeclaration?.render()
                      }}
                    />
                  </>
                ) : (
                  <p className="text-pretty">{tr(locale, 'Consentok ist noch nicht konfiguriert (NEXT_PUBLIC_CONSENTOK_ID fehlt).', 'Consentok is not configured yet (NEXT_PUBLIC_CONSENTOK_ID missing).', 'Consentok все още не е конфигуриран (липсва NEXT_PUBLIC_CONSENTOK_ID).')}</p>
                )}
              </>
            ),
          },
          {
            titel: tr(locale, 'Zustimmung', 'Consent', 'Съгласие'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Durch die Nutzung unserer Website erklären Sie sich mit dieser Datenschutzrichtlinie einverstanden und stimmen deren Bedingungen zu.', 'By using our website, you consent to this privacy policy and agree to its terms.', 'С използването на нашия уебсайт Вие приемате тази политика за поверителност и се съгласявате с нейните условия.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Informationen, die wir sammeln', 'Information we collect', 'Информация, която събираме'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Die persönlichen Daten, um die Sie gebeten werden, und die Gründe, warum wir darum bitten, werden Ihnen zum Zeitpunkt der Datenerhebung mitgeteilt. Wenn Sie sich direkt an uns wenden, können wir zusätzliche Informationen erhalten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt Ihrer Nachricht und Anhänge).', 'We will explain what personal data we request and why at the time of collection. If you contact us directly, we may receive additional information (e.g., name, email address, phone number, message content, and attachments).', 'Личните данни, които ще бъдете помолени да предоставите, и причините за това ще Ви бъдат съобщени в момента на събирането им. Ако се свържете директно с нас, можем да получим допълнителна информация (напр. име, имейл адрес, телефонен номер, съдържание на съобщението Ви и прикачени файлове).')}</p>
                <p className="text-pretty">{tr(locale, 'Wenn Sie sich für ein Konto registrieren, können wir nach Kontaktinformationen fragen (z. B. Name, Firmenname, Adresse, E-Mail-Adresse, Telefonnummer).', 'If you register for an account, we may ask for contact information (e.g., name, company name, address, email address, phone number).', 'Ако се регистрирате за профил, можем да поискаме данни за контакт (напр. име, име на фирма, адрес, имейл адрес, телефонен номер).')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Wie wir Ihre Informationen verwenden', 'How we use your information', 'Как използваме Вашата информация'),
            inhalt: (
              <>
                <RechtListe
                  punkte={[
                    tr(locale, 'Bereitstellung, Betrieb und Pflege unserer Website', 'Provide, operate, and maintain our website', 'Предоставяне, експлоатация и поддръжка на нашия уебсайт'),
                    tr(locale, 'Verbesserung, Personalisierung und Erweiterung unserer Website', 'Improve, personalize, and expand our website', 'Подобряване, персонализиране и разширяване на нашия уебсайт'),
                    tr(locale, 'Verstehen und Analysieren, wie Sie unsere Website nutzen', 'Understand and analyze how you use our website', 'Разбиране и анализ на начина, по който използвате нашия уебсайт'),
                    tr(locale, 'Entwicklung neuer Produkte, Dienstleistungen, Merkmale und Funktionen', 'Develop new products, services, features, and functionality', 'Разработване на нови продукти, услуги, характеристики и функции'),
                    tr(locale, 'Kommunikation mit Ihnen (z. B. Kundendienst, Updates zur Website, Marketing- und Werbezwecke)', 'Communicate with you (e.g., customer service, website updates, marketing and promotional purposes)', 'Комуникация с Вас (напр. обслужване на клиенти, новини за уебсайта, маркетингови и рекламни цели)'),
                    tr(locale, 'Senden von E-Mails', 'Send emails', 'Изпращане на имейли'),
                    tr(locale, 'Aufdecken und Verhindern von Betrug', 'Detect and prevent fraud', 'Откриване и предотвратяване на измами'),
                  ]}
                />
              </>
            ),
          },
          {
            titel: tr(locale, 'Log-Dateien', 'Log files', 'Лог файлове'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Ecommlab folgt einem Standardverfahren zur Verwendung von Protokolldateien. Diese protokollieren Besuche von Websites. Erfasst werden u. a. IP-Adresse, Browsertyp, Internetdienstanbieter (ISP), Datums-/Zeitstempel, verweisende/verlassende Seiten und ggf. Anzahl der Klicks. Diese Daten sind nicht mit Informationen verknüpft, die eine persönliche Identifizierung ermöglichen.', 'Ecommlab follows a standard procedure of using log files. These record visits to websites. Data may include IP addresses, browser type, ISP, date/time stamps, referring/exit pages, and possibly the number of clicks. This data is not linked to personally identifiable information.', 'Ecommlab следва стандартна процедура за използване на лог файлове. Те регистрират посещенията на уебсайтове. Записват се, наред с друго, IP адрес, тип на браузъра, доставчик на интернет услуги (ISP), дата и час, препращащи страници и страници на излизане, а при необходимост и брой кликвания. Тези данни не са свързани с информация, която позволява лична идентификация.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Cookies und Web Beacons', 'Cookies and web beacons', 'Бисквитки и уеб маяци'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wie viele Websites verwendet Ecommlab Cookies, um Informationen zu speichern (z. B. Präferenzen und besuchte Seiten), um Inhalte zu optimieren und die Nutzererfahrung zu verbessern.', 'Like many websites, Ecommlab uses cookies to store information (e.g., preferences and visited pages) to optimize content and improve user experience.', 'Както много уебсайтове, Ecommlab използва бисквитки, за да съхранява информация (напр. предпочитания и посетени страници), да оптимизира съдържанието и да подобрява потребителското изживяване.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Werbepartner-Datenschutzrichtlinien', 'Advertising partners’ privacy policies', 'Политики за поверителност на рекламни партньори'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Drittanbieter-Werbeserver oder Werbenetzwerke können Technologien wie Cookies, JavaScript oder Web Beacons einsetzen, die in Anzeigen und Links verwendet werden und direkt an Ihren Browser gesendet werden. Dabei kann automatisch Ihre IP-Adresse übermittelt werden. Ecommlab hat keinen Zugriff auf oder Kontrolle über Cookies, die von Drittanbietern verwendet werden.', 'Third-party ad servers or networks may use technologies such as cookies, JavaScript, or web beacons in their ads and links, which are sent directly to your browser. They may automatically receive your IP address. Ecommlab has no access to or control over such third-party cookies.', 'Рекламни сървъри или рекламни мрежи на трети страни могат да използват технологии като бисквитки, JavaScript или уеб маяци, които се прилагат в реклами и връзки и се изпращат директно към Вашия браузър. При това IP адресът Ви може да бъде предаден автоматично. Ecommlab няма достъп до бисквитките, използвани от трети страни, нито контрол върху тях.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Datenschutzrichtlinien von Dritten', 'Third-party privacy policies', 'Политики за поверителност на трети страни'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Unsere Datenschutzrichtlinie gilt nicht für andere Werbetreibende oder Websites. Wir empfehlen, die Datenschutzrichtlinien dieser Drittanbieter zu konsultieren, um detaillierte Informationen und Opt-out-Möglichkeiten zu erhalten.', 'Our privacy policy does not apply to other advertisers or websites. We recommend reviewing the privacy policies of third parties for details and opt-out options.', 'Нашата политика за поверителност не се прилага за други рекламодатели или уебсайтове. Препоръчваме да се запознаете с политиките за поверителност на тези трети страни, за да получите подробна информация и възможности за отказ.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'CCPA-Datenschutzrechte', 'CCPA privacy rights', 'Права за защита на данните по CCPA'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Nach dem CCPA haben kalifornische Verbraucher u. a. das Recht, Auskunft zu verlangen, die Löschung personenbezogener Daten zu fordern oder dem Verkauf personenbezogener Daten zu widersprechen. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.', 'Under the CCPA, California consumers have rights including requesting access, requesting deletion of personal data, and opting out of the sale of personal data. We have one month to respond to requests.', 'Съгласно CCPA потребителите в Калифорния имат, наред с друго, право да поискат информация, да изискат изтриване на личните си данни или да възразят срещу продажбата им. Ако подадете искане, разполагаме с един месец, за да Ви отговорим.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'GDPR-Datenschutzrechte', 'GDPR data protection rights', 'Права за защита на данните по GDPR'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Nutzer haben u. a. Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.', 'Users have rights including access, rectification, erasure, restriction of processing, objection, and data portability. We have one month to respond to requests.', 'Потребителите имат, наред с друго, право на достъп, коригиране, изтриване, ограничаване на обработването, възражение и преносимост на данните. Ако подадете искане, разполагаме с един месец, за да Ви отговорим.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Informationen für Kinder', 'Children’s information', 'Информация за деца'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wir legen besonderen Wert auf den Schutz von Kindern im Internet. Ecommlab sammelt wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn Sie der Meinung sind, dass Ihr Kind solche Daten angegeben hat, kontaktieren Sie uns bitte, damit wir diese umgehend entfernen können.', 'We place special emphasis on protecting children online. Ecommlab does not knowingly collect personal data from children under 13. If you believe your child provided such information, please contact us so we can remove it promptly.', 'Отдаваме особено значение на защитата на децата в интернет. Ecommlab не събира съзнателно лични данни от деца под 13 години. Ако смятате, че детето Ви е предоставило такива данни, моля, свържете се с нас, за да ги премахнем незабавно.')}</p>
              </>
            ),
          },

        ]}
      />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
