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
        <title>{`${tr(locale, 'AGBs', 'Terms', 'Общи условия')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Allgemeine Geschäftsbedingungen der Ecommlab GmbH.',
            'Terms and conditions of Ecommlab GmbH.',
            'Общи условия на Ecommlab GmbH.',
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
                <p className="text-pretty">{tr(locale, 'Datum des Inkrafttretens – 1. Januar 2024', 'Effective date – January 1, 2024', 'Дата на влизане в сила – 1 януари 2024 г.')}</p>
                <p className="text-pretty">{tr(locale, 'Diese Bedingungen regeln den Zugang zu und die Nutzung aller Inhalte, Produkte und Dienste auf dieser Website. Ihr Zugang unterliegt Ihrer Zustimmung zu den hier enthaltenen Bestimmungen sowie allen weiteren von uns veröffentlichten Regeln und Richtlinien.', 'These terms govern access to and use of all content, products, and services on this website. Access is subject to your acceptance of these terms and all additional rules and policies published by us.', 'Тези условия уреждат достъпа до и използването на цялото съдържание, продуктите и услугите на този уебсайт. Достъпът Ви зависи от съгласието Ви с изложените тук разпоредби, както и с всички други публикувани от нас правила и политики.')}</p>
                <p className="text-pretty">{tr(locale, 'Bitte lesen Sie diese Vereinbarung sorgfältig. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.', 'Please read this agreement carefully. If you disagree with any part of these terms, you must not use our services.', 'Моля, прочетете внимателно това споразумение. Ако не сте съгласни с някоя част от тези условия, нямате право да използвате нашите услуги.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Geistiges Eigentum', 'Intellectual property', 'Интелектуална собственост'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Diese Vereinbarung überträgt kein geistiges Eigentum von Ecommlab GmbH oder Dritten auf Sie. Alle Rechte, Ansprüche und Interessen verbleiben ausschließlich bei Ecommlab GmbH bzw. deren Lizenzgebern.', 'This agreement does not transfer any intellectual property of Ecommlab GmbH or third parties to you. All rights, title, and interest remain solely with Ecommlab GmbH and its licensors.', 'Това споразумение не Ви прехвърля интелектуална собственост на Ecommlab GmbH или на трети страни. Всички права, претенции и интереси остават изключително за Ecommlab GmbH, съответно за нейните лицензодатели.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Dienstleistungen von Dritten', 'Third-party services', 'Услуги на трети страни'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Bei der Nutzung unserer Dienste können Dienste Dritter eingesetzt werden. Die Nutzung erfolgt auf eigenes Risiko. Wir übernehmen keine Verantwortung für Inhalte, Waren oder Dienstleistungen solcher Drittanbieter.', 'Our services may include third-party services. Their use is at your own risk. We are not responsible for content, goods, or services provided by third parties.', 'При използването на нашите услуги могат да се прилагат услуги на трети страни. Използването им е на Ваш собствен риск. Не носим отговорност за съдържание, стоки или услуги на такива трети страни.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Konten', 'Accounts', 'Профили'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Falls ein Konto erforderlich ist, müssen Sie vollständige und korrekte Informationen bereitstellen. Sie sind verantwortlich für alle Aktivitäten in Ihrem Konto sowie für die Sicherheit Ihrer Zugangsdaten.', 'If an account is required, you must provide complete and accurate information. You are responsible for all activity in your account and for keeping your credentials secure.', 'Ако е необходим профил, трябва да предоставите пълна и вярна информация. Вие носите отговорност за всички действия във Вашия профил, както и за сигурността на данните си за достъп.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Terminierung', 'Termination', 'Прекратяване'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Wir können den Zugang zu unseren Diensten jederzeit mit oder ohne Grund, mit oder ohne Vorankündigung beenden oder aussetzen. Bestimmungen, die ihrer Natur nach fortgelten sollen, bleiben auch nach Beendigung wirksam.', 'We may terminate or suspend access to our services at any time, with or without cause or notice. Provisions that by their nature should survive termination remain in effect.', 'Можем по всяко време да прекратим или временно да спрем достъпа до нашите услуги – със или без причина, със или без предизвестие. Разпоредбите, които по своята същност следва да продължат действието си, остават в сила и след прекратяването.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Haftungsausschluss', 'Disclaimer', 'Отказ от отговорност'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Unsere Dienste werden „wie besehen“ und „wie verfügbar“ bereitgestellt. Ecommlab GmbH schließt jegliche ausdrücklichen oder stillschweigenden Gewährleistungen aus.', 'Our services are provided “as is” and “as available”. Ecommlab GmbH disclaims all express or implied warranties.', 'Нашите услуги се предоставят „във вида, в който са“ и „според наличността“. Ecommlab GmbH изключва всякакви изрични или подразбиращи се гаранции.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Zuständigkeit und anwendbares Recht', 'Jurisdiction and governing law', 'Компетентност и приложимо право'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Sofern gesetzlich zulässig, unterliegen diese Bedingungen den Gesetzen Bulgariens. Gerichtsstand für Streitigkeiten sind die zuständigen Gerichte in Bulgarien.', 'To the extent permitted by law, these terms are governed by the laws of Bulgaria. The competent courts in Bulgaria have jurisdiction for disputes.', 'Доколкото законът го допуска, тези условия се уреждат от законодателството на България. Компетентни за спорове са съответните съдилища в България.')}</p>
              </>
            ),
          },
          {
            titel: tr(locale, 'Änderungen', 'Changes', 'Промени'),
            inhalt: (
              <>
                <p className="text-pretty">{tr(locale, 'Ecommlab GmbH kann diese Bedingungen jederzeit ändern. Bei wesentlichen Änderungen informieren wir vor Inkrafttreten der Änderungen über die Website oder per Mitteilung.', 'Ecommlab GmbH may change these terms at any time. For material changes, we will notify you on the website or via other notice before they take effect.', 'Ecommlab GmbH може да променя тези условия по всяко време. При съществени промени ще Ви уведомим чрез уебсайта или със съобщение, преди промените да влязат в сила.')}</p>
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
