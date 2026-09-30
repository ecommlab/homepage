import Head from 'next/head'
import { useRouter } from 'next/router'
import { RechtSeite } from '../components/c2/RechtSeite'
import { normalizeLocale, tr } from '../lib/i18n'

/** Texte unverändert aus der bisherigen Seite; Darstellung: components/c2/RechtSeite.tsx (Board „C2plus-ecommlab-AGB“). */
export default function Nutzungsbedingungen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'AGBs', 'Terms')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Allgemeine Geschäftsbedingungen der Ecommlab GmbH.',
            'Terms and conditions of Ecommlab GmbH.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RechtSeite
        aktiv="agb"
        lang
        zeilen={[
          {
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Datum des Inkrafttretens – 1. Januar 2024', 'Effective date – January 1, 2024')}</p>
                <p className="text-pretty">{tr(locale, 'Diese Bedingungen regeln den Zugang zu und die Nutzung aller Inhalte, Produkte und Dienste auf dieser Website. Ihr Zugang unterliegt Ihrer Zustimmung zu den hier enthaltenen Bestimmungen sowie allen weiteren von uns veröffentlichten Regeln und Richtlinien.', 'These terms govern access to and use of all content, products, and services on this website. Access is subject to your acceptance of these terms and all additional rules and policies published by us.')}</p>
                <p className="text-pretty">{tr(locale, 'Bitte lesen Sie diese Vereinbarung sorgfältig. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.', 'Please read this agreement carefully. If you disagree with any part of these terms, you must not use our services.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Geistiges Eigentum', 'Intellectual property'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Diese Vereinbarung überträgt kein geistiges Eigentum von Ecommlab GmbH oder Dritten auf Sie. Alle Rechte, Ansprüche und Interessen verbleiben ausschließlich bei Ecommlab GmbH bzw. deren Lizenzgebern.', 'This agreement does not transfer any intellectual property of Ecommlab GmbH or third parties to you. All rights, title, and interest remain solely with Ecommlab GmbH and its licensors.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Dienstleistungen von Dritten', 'Third-party services'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Bei der Nutzung unserer Dienste können Dienste Dritter eingesetzt werden. Die Nutzung erfolgt auf eigenes Risiko. Wir übernehmen keine Verantwortung für Inhalte, Waren oder Dienstleistungen solcher Drittanbieter.', 'Our services may include third-party services. Their use is at your own risk. We are not responsible for content, goods, or services provided by third parties.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Konten', 'Accounts'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Falls ein Konto erforderlich ist, müssen Sie vollständige und korrekte Informationen bereitstellen. Sie sind verantwortlich für alle Aktivitäten in Ihrem Konto sowie für die Sicherheit Ihrer Zugangsdaten.', 'If an account is required, you must provide complete and accurate information. You are responsible for all activity in your account and for keeping your credentials secure.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Terminierung', 'Termination'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wir können den Zugang zu unseren Diensten jederzeit mit oder ohne Grund, mit oder ohne Vorankündigung beenden oder aussetzen. Bestimmungen, die ihrer Natur nach fortgelten sollen, bleiben auch nach Beendigung wirksam.', 'We may terminate or suspend access to our services at any time, with or without cause or notice. Provisions that by their nature should survive termination remain in effect.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Haftungsausschluss', 'Disclaimer'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Unsere Dienste werden „wie besehen“ und „wie verfügbar“ bereitgestellt. Ecommlab GmbH schließt jegliche ausdrücklichen oder stillschweigenden Gewährleistungen aus.', 'Our services are provided “as is” and “as available”. Ecommlab GmbH disclaims all express or implied warranties.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Zuständigkeit und anwendbares Recht', 'Jurisdiction and governing law'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Sofern gesetzlich zulässig, unterliegen diese Bedingungen den Gesetzen Bulgariens. Gerichtsstand für Streitigkeiten sind die zuständigen Gerichte in Bulgarien.', 'To the extent permitted by law, these terms are governed by the laws of Bulgaria. The competent courts in Bulgaria have jurisdiction for disputes.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Änderungen', 'Changes'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Ecommlab GmbH kann diese Bedingungen jederzeit ändern. Bei wesentlichen Änderungen informieren wir vor Inkrafttreten der Änderungen über die Website oder per Mitteilung.', 'Ecommlab GmbH may change these terms at any time. For material changes, we will notify you on the website or via other notice before they take effect.')}</p>
              </>
            ),
          },

        ]}
      />
    </>
  )
}
