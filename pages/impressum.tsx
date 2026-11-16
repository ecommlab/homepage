import Head from 'next/head'
import { useRouter } from 'next/router'
import { RechtLink, RechtSeite } from '../components/c2/RechtSeite'
import { normalizeLocale, tr } from '../lib/i18n'

/** Angaben unverändert aus der bisherigen Seite, Beschriftungen je Sprache (Registerangaben und Paragrafen bleiben im Original); Darstellung: components/c2/RechtSeite.tsx (Board „C2plus-ecommlab-Impressum“). */
export default function Impressum() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Impressum', 'Legal notice', 'Импресум')} – Ecommlab`}</title>
        <meta name="description" content={tr(locale, 'Impressum der Ecommlab GmbH.', 'Legal notice of Ecommlab GmbH.', 'Импресум на Ecommlab GmbH.')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RechtSeite
        aktiv="impressum"
        zeilen={[
          {
            titel: 'Ecommlab GmbH',
            inhalt: (
              <p>
                Turnerstraße 15
                <br />
                81827 München, {tr(locale, 'Deutschland', 'Germany', 'Германия')}
              </p>
            ),
          },
          { titel: tr(locale, 'Vertreten durch', 'Represented by', 'Представлявано от'), inhalt: <p>Andrey Cekovski, Pavel Mihaylov</p> },
          {
            titel: tr(locale, 'Kontakt', 'Contact', 'Контакт'),
            inhalt: (
              <p>
                {tr(locale, 'Telefon', 'Phone', 'Телефон')}: <RechtLink href="tel:+498941616248">+49 89 41 61 62 48</RechtLink>
                <br />
                {tr(locale, 'E-Mail', 'Email', 'Имейл')}: <RechtLink href="mailto:hello@ecommlab.io">hello@ecommlab.io</RechtLink>
                <br />
                Web:{' '}
                <RechtLink href="https://ecommlab.io" extern>
                  ecommlab.io
                </RechtLink>
              </p>
            ),
          },
          {
            titel: tr(locale, 'Registereintrag', 'Commercial register', 'Търговски регистър'),
            inhalt: (
              <p>
                {tr(locale, 'Registergericht', 'Register court', 'Регистърен съд')}: Amtsgericht München
                <br />
                {tr(locale, 'Registernummer', 'Registration number', 'Регистрационен номер')}: HRB 290394
              </p>
            ),
          },
          { titel: tr(locale, 'Umsatzsteuer-ID (§27a UStG)', 'VAT ID (§27a UStG)', 'ДДС номер (§27a UStG)'), inhalt: <p>DE366772858</p> },
          { titel: tr(locale, 'Verantwortlicher gem. RStV', 'Responsible for content (RStV)', 'Отговорен за съдържанието (RStV)'), inhalt: <p>Andrey Cekovski</p> },
        ]}
      />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
