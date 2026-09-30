import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { RechtListe, RechtSeite } from '../components/c2/RechtSeite'
import { normalizeLocale, tr } from '../lib/i18n'

/** Texte unverändert aus der bisherigen Seite; Darstellung: components/c2/RechtSeite.tsx (Board „C2plus-ecommlab-Datenschutz“). */
export default function Datenschutzbestimmungen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const consentokId = process.env.NEXT_PUBLIC_CONSENTOK_ID || ''

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Datenschutzbestimmungen', 'Privacy policy')} – Ecommlab`}</title>
        <meta
          name="description"
          content="Datenschutzbestimmungen der Ecommlab GmbH – Informationen zur Verarbeitung personenbezogener Daten."
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
                <p className="text-pretty">{tr(locale, 'Ecommlab GmbH (nachfolgend „Ecommlab“) legt Wert auf den Schutz der Privatsphäre seiner Nutzer. Diese Datenschutzrichtlinie soll Ihnen helfen zu verstehen, wie wir personenbezogene Daten von Besuchern unserer Website erheben und verwenden.', 'Ecommlab GmbH (“Ecommlab”) values the protection of users’ privacy. This policy explains how we collect and use personal data from visitors of our website.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Cookie-Einwilligung', 'Cookie consent'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Hier finden Sie die Cookie-Erklärung mit Details zu eingesetzten Cookies und deren Kategorien.', 'Here you can find the cookie declaration with details about used cookies and their categories.')}</p>
                {consentokId ? (
                  <div>
                    <Script
                      id="ConsentokDeclaration"
                      src={`https://consentok.eu/cd.js?id=${encodeURIComponent(consentokId)}`}
                      strategy="afterInteractive"
                    />
                  </div>
                ) : (
                  <p className="text-pretty">{tr(locale, 'Consentok ist noch nicht konfiguriert (NEXT_PUBLIC_CONSENTOK_ID fehlt).', 'Consentok is not configured yet (NEXT_PUBLIC_CONSENTOK_ID missing).')}</p>
                )}
              </>
            ),
          },
          {
            titel: tr(locale, 'Zustimmung', 'Consent'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Durch die Nutzung unserer Website erklären Sie sich mit dieser Datenschutzrichtlinie einverstanden und stimmen deren Bedingungen zu.', 'By using our website, you consent to this privacy policy and agree to its terms.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Informationen, die wir sammeln', 'Information we collect'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Die persönlichen Daten, um die Sie gebeten werden, und die Gründe, warum wir darum bitten, werden Ihnen zum Zeitpunkt der Datenerhebung mitgeteilt. Wenn Sie sich direkt an uns wenden, können wir zusätzliche Informationen erhalten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt Ihrer Nachricht und Anhänge).', 'We will explain what personal data we request and why at the time of collection. If you contact us directly, we may receive additional information (e.g., name, email address, phone number, message content, and attachments).')}</p>
                <p className="text-pretty">{tr(locale, 'Wenn Sie sich für ein Konto registrieren, können wir nach Kontaktinformationen fragen (z. B. Name, Firmenname, Adresse, E-Mail-Adresse, Telefonnummer).', 'If you register for an account, we may ask for contact information (e.g., name, company name, address, email address, phone number).')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Wie wir Ihre Informationen verwenden', 'How we use your information'),
            inhalt: (
              <>
                <RechtListe
                  punkte={[
                    tr(locale, 'Bereitstellung, Betrieb und Pflege unserer Website', 'Provide, operate, and maintain our website'),
                    tr(locale, 'Verbesserung, Personalisierung und Erweiterung unserer Website', 'Improve, personalize, and expand our website'),
                    tr(locale, 'Verstehen und Analysieren, wie Sie unsere Website nutzen', 'Understand and analyze how you use our website'),
                    tr(locale, 'Entwicklung neuer Produkte, Dienstleistungen, Merkmale und Funktionen', 'Develop new products, services, features, and functionality'),
                    tr(locale, 'Kommunikation mit Ihnen (z. B. Kundendienst, Updates zur Website, Marketing- und Werbezwecke)', 'Communicate with you (e.g., customer service, website updates, marketing and promotional purposes)'),
                    tr(locale, 'Senden von E-Mails', 'Send emails'),
                    tr(locale, 'Aufdecken und Verhindern von Betrug', 'Detect and prevent fraud'),
                  ]}
                />
              </>
            ),
          },
          {
            titel: tr(locale, 'Log-Dateien', 'Log files'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Ecommlab folgt einem Standardverfahren zur Verwendung von Protokolldateien. Diese protokollieren Besuche von Websites. Erfasst werden u. a. IP-Adresse, Browsertyp, Internetdienstanbieter (ISP), Datums-/Zeitstempel, verweisende/verlassende Seiten und ggf. Anzahl der Klicks. Diese Daten sind nicht mit Informationen verknüpft, die eine persönliche Identifizierung ermöglichen.', 'Ecommlab follows a standard procedure of using log files. These record visits to websites. Data may include IP addresses, browser type, ISP, date/time stamps, referring/exit pages, and possibly the number of clicks. This data is not linked to personally identifiable information.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Cookies und Web Beacons', 'Cookies and web beacons'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wie viele Websites verwendet Ecommlab Cookies, um Informationen zu speichern (z. B. Präferenzen und besuchte Seiten), um Inhalte zu optimieren und die Nutzererfahrung zu verbessern.', 'Like many websites, Ecommlab uses cookies to store information (e.g., preferences and visited pages) to optimize content and improve user experience.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Werbepartner-Datenschutzrichtlinien', 'Advertising partners’ privacy policies'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Drittanbieter-Werbeserver oder Werbenetzwerke können Technologien wie Cookies, JavaScript oder Web Beacons einsetzen, die in Anzeigen und Links verwendet werden und direkt an Ihren Browser gesendet werden. Dabei kann automatisch Ihre IP-Adresse übermittelt werden. Ecommlab hat keinen Zugriff auf oder Kontrolle über Cookies, die von Drittanbietern verwendet werden.', 'Third-party ad servers or networks may use technologies such as cookies, JavaScript, or web beacons in their ads and links, which are sent directly to your browser. They may automatically receive your IP address. Ecommlab has no access to or control over such third-party cookies.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Datenschutzrichtlinien von Dritten', 'Third-party privacy policies'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Unsere Datenschutzrichtlinie gilt nicht für andere Werbetreibende oder Websites. Wir empfehlen, die Datenschutzrichtlinien dieser Drittanbieter zu konsultieren, um detaillierte Informationen und Opt-out-Möglichkeiten zu erhalten.', 'Our privacy policy does not apply to other advertisers or websites. We recommend reviewing the privacy policies of third parties for details and opt-out options.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'CCPA-Datenschutzrechte', 'CCPA privacy rights'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Nach dem CCPA haben kalifornische Verbraucher u. a. das Recht, Auskunft zu verlangen, die Löschung personenbezogener Daten zu fordern oder dem Verkauf personenbezogener Daten zu widersprechen. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.', 'Under the CCPA, California consumers have rights including requesting access, requesting deletion of personal data, and opting out of the sale of personal data. We have one month to respond to requests.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'GDPR-Datenschutzrechte', 'GDPR data protection rights'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Nutzer haben u. a. Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.', 'Users have rights including access, rectification, erasure, restriction of processing, objection, and data portability. We have one month to respond to requests.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Informationen für Kinder', 'Children’s information'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wir legen besonderen Wert auf den Schutz von Kindern im Internet. Ecommlab sammelt wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn Sie der Meinung sind, dass Ihr Kind solche Daten angegeben hat, kontaktieren Sie uns bitte, damit wir diese umgehend entfernen können.', 'We place special emphasis on protecting children online. Ecommlab does not knowingly collect personal data from children under 13. If you believe your child provided such information, please contact us so we can remove it promptly.')}</p>
              </>
            ),
          },

        ]}
      />
    </>
  )
}
