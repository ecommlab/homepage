import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Container } from '../components/Container'
import { SiteHeader } from '../components/SiteHeader'
import { normalizeLocale, tr } from '../lib/i18n'

function H2({ children }: { children: string }) {
  return (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{children}</p>
}

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

      <div className="min-h-screen">
        <SiteHeader />

        <main>
          <section className="py-14 sm:py-16">
            <Container>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Rechtliches', 'Legal')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'Datenschutzbestimmungen', 'Privacy policy')}
              </h1>

              <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                <P>
                  {tr(
                    locale,
                    'Ecommlab GmbH (nachfolgend „Ecommlab“) legt Wert auf den Schutz der Privatsphäre seiner Nutzer. Diese Datenschutzrichtlinie soll Ihnen helfen zu verstehen, wie wir personenbezogene Daten von Besuchern unserer Website erheben und verwenden.',
                    'Ecommlab GmbH (“Ecommlab”) values the protection of users’ privacy. This policy explains how we collect and use personal data from visitors of our website.',
                  )}
                </P>

                <H2>{tr(locale, 'Cookie-Einwilligung', 'Cookie consent')}</H2>
                <P>
                  {tr(
                    locale,
                    'Hier finden Sie die Cookie-Erklärung mit Details zu eingesetzten Cookies und deren Kategorien.',
                    'Here you can find the cookie declaration with details about used cookies and their categories.',
                  )}
                </P>
                {consentokId ? (
                  <div className="mt-4">
                    <Script
                      id="ConsentokDeclaration"
                      src={`https://consentok.eu/cd.js?id=${encodeURIComponent(consentokId)}`}
                      strategy="afterInteractive"
                    />
                  </div>
                ) : (
                  <P>
                    {tr(
                      locale,
                      'Consentok ist noch nicht konfiguriert (NEXT_PUBLIC_CONSENTOK_ID fehlt).',
                      'Consentok is not configured yet (NEXT_PUBLIC_CONSENTOK_ID missing).',
                    )}
                  </P>
                )}

                <H2>{tr(locale, 'Zustimmung', 'Consent')}</H2>
                <P>
                  {tr(
                    locale,
                    'Durch die Nutzung unserer Website erklären Sie sich mit dieser Datenschutzrichtlinie einverstanden und stimmen deren Bedingungen zu.',
                    'By using our website, you consent to this privacy policy and agree to its terms.',
                  )}
                </P>

                <H2>{tr(locale, 'Informationen, die wir sammeln', 'Information we collect')}</H2>
                <P>
                  {tr(
                    locale,
                    'Die persönlichen Daten, um die Sie gebeten werden, und die Gründe, warum wir darum bitten, werden Ihnen zum Zeitpunkt der Datenerhebung mitgeteilt. Wenn Sie sich direkt an uns wenden, können wir zusätzliche Informationen erhalten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt Ihrer Nachricht und Anhänge).',
                    'We will explain what personal data we request and why at the time of collection. If you contact us directly, we may receive additional information (e.g., name, email address, phone number, message content, and attachments).',
                  )}
                </P>
                <P>
                  {tr(
                    locale,
                    'Wenn Sie sich für ein Konto registrieren, können wir nach Kontaktinformationen fragen (z. B. Name, Firmenname, Adresse, E-Mail-Adresse, Telefonnummer).',
                    'If you register for an account, we may ask for contact information (e.g., name, company name, address, email address, phone number).',
                  )}
                </P>

                <H2>{tr(locale, 'Wie wir Ihre Informationen verwenden', 'How we use your information')}</H2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <li>{tr(locale, 'Bereitstellung, Betrieb und Pflege unserer Website', 'Provide, operate, and maintain our website')}</li>
                  <li>{tr(locale, 'Verbesserung, Personalisierung und Erweiterung unserer Website', 'Improve, personalize, and expand our website')}</li>
                  <li>{tr(locale, 'Verstehen und Analysieren, wie Sie unsere Website nutzen', 'Understand and analyze how you use our website')}</li>
                  <li>{tr(locale, 'Entwicklung neuer Produkte, Dienstleistungen, Merkmale und Funktionen', 'Develop new products, services, features, and functionality')}</li>
                  <li>
                    {tr(
                      locale,
                      'Kommunikation mit Ihnen (z. B. Kundendienst, Updates zur Website, Marketing- und Werbezwecke)',
                      'Communicate with you (e.g., customer service, website updates, marketing and promotional purposes)',
                    )}
                  </li>
                  <li>{tr(locale, 'Senden von E-Mails', 'Send emails')}</li>
                  <li>{tr(locale, 'Aufdecken und Verhindern von Betrug', 'Detect and prevent fraud')}</li>
                </ul>

                <H2>{tr(locale, 'Log-Dateien', 'Log files')}</H2>
                <P>
                  {tr(
                    locale,
                    'Ecommlab folgt einem Standardverfahren zur Verwendung von Protokolldateien. Diese protokollieren Besuche von Websites. Erfasst werden u. a. IP-Adresse, Browsertyp, Internetdienstanbieter (ISP), Datums-/Zeitstempel, verweisende/verlassende Seiten und ggf. Anzahl der Klicks. Diese Daten sind nicht mit Informationen verknüpft, die eine persönliche Identifizierung ermöglichen.',
                    'Ecommlab follows a standard procedure of using log files. These record visits to websites. Data may include IP addresses, browser type, ISP, date/time stamps, referring/exit pages, and possibly the number of clicks. This data is not linked to personally identifiable information.',
                  )}
                </P>

                <H2>{tr(locale, 'Cookies und Web Beacons', 'Cookies and web beacons')}</H2>
                <P>
                  {tr(
                    locale,
                    'Wie viele Websites verwendet Ecommlab Cookies, um Informationen zu speichern (z. B. Präferenzen und besuchte Seiten), um Inhalte zu optimieren und die Nutzererfahrung zu verbessern.',
                    'Like many websites, Ecommlab uses cookies to store information (e.g., preferences and visited pages) to optimize content and improve user experience.',
                  )}
                </P>

                <H2>{tr(locale, 'Werbepartner-Datenschutzrichtlinien', 'Advertising partners’ privacy policies')}</H2>
                <P>
                  {tr(
                    locale,
                    'Drittanbieter-Werbeserver oder Werbenetzwerke können Technologien wie Cookies, JavaScript oder Web Beacons einsetzen, die in Anzeigen und Links verwendet werden und direkt an Ihren Browser gesendet werden. Dabei kann automatisch Ihre IP-Adresse übermittelt werden. Ecommlab hat keinen Zugriff auf oder Kontrolle über Cookies, die von Drittanbietern verwendet werden.',
                    'Third-party ad servers or networks may use technologies such as cookies, JavaScript, or web beacons in their ads and links, which are sent directly to your browser. They may automatically receive your IP address. Ecommlab has no access to or control over such third-party cookies.',
                  )}
                </P>

                <H2>{tr(locale, 'Datenschutzrichtlinien von Dritten', 'Third-party privacy policies')}</H2>
                <P>
                  {tr(
                    locale,
                    'Unsere Datenschutzrichtlinie gilt nicht für andere Werbetreibende oder Websites. Wir empfehlen, die Datenschutzrichtlinien dieser Drittanbieter zu konsultieren, um detaillierte Informationen und Opt-out-Möglichkeiten zu erhalten.',
                    'Our privacy policy does not apply to other advertisers or websites. We recommend reviewing the privacy policies of third parties for details and opt-out options.',
                  )}
                </P>

                <H2>{tr(locale, 'CCPA-Datenschutzrechte', 'CCPA privacy rights')}</H2>
                <P>
                  {tr(
                    locale,
                    'Nach dem CCPA haben kalifornische Verbraucher u. a. das Recht, Auskunft zu verlangen, die Löschung personenbezogener Daten zu fordern oder dem Verkauf personenbezogener Daten zu widersprechen. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.',
                    'Under the CCPA, California consumers have rights including requesting access, requesting deletion of personal data, and opting out of the sale of personal data. We have one month to respond to requests.',
                  )}
                </P>

                <H2>{tr(locale, 'GDPR-Datenschutzrechte', 'GDPR data protection rights')}</H2>
                <P>
                  {tr(
                    locale,
                    'Nutzer haben u. a. Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten.',
                    'Users have rights including access, rectification, erasure, restriction of processing, objection, and data portability. We have one month to respond to requests.',
                  )}
                </P>

                <H2>{tr(locale, 'Informationen für Kinder', 'Children’s information')}</H2>
                <P>
                  {tr(
                    locale,
                    'Wir legen besonderen Wert auf den Schutz von Kindern im Internet. Ecommlab sammelt wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn Sie der Meinung sind, dass Ihr Kind solche Daten angegeben hat, kontaktieren Sie uns bitte, damit wir diese umgehend entfernen können.',
                    'We place special emphasis on protecting children online. Ecommlab does not knowingly collect personal data from children under 13. If you believe your child provided such information, please contact us so we can remove it promptly.',
                  )}
                </P>

                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <Link
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    href="/impressum"
                  >
                    {tr(locale, 'Impressum', 'Legal notice')}
                  </Link>
                  <Link
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    href="/kontakt"
                  >
                    {tr(locale, 'Kontakt', 'Contact')}
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

