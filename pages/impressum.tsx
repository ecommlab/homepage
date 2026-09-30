import Head from 'next/head'
import { useRouter } from 'next/router'
import { RechtLink, RechtSeite } from '../components/c2/RechtSeite'
import { normalizeLocale, tr } from '../lib/i18n'

/** Texte unverändert aus der bisherigen Seite; Darstellung: components/c2/RechtSeite.tsx (Board „C2plus-ecommlab-Impressum“). */
export default function Impressum() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Impressum', 'Legal notice')} – Ecommlab`}</title>
        <meta name="description" content={tr(locale, 'Impressum der Ecommlab GmbH.', 'Legal notice of Ecommlab GmbH.')} />
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
                81827 München, Deutschland
              </p>
            ),
          },
          { titel: 'Vertreten durch', inhalt: <p>Andrey Cekovski, Pavel Mihaylov</p> },
          {
            titel: tr(locale, 'Kontakt', 'Contact'),
            inhalt: (
              <p>
                Telefon: <RechtLink href="tel:+498941616248">+49 89 41 61 62 48</RechtLink>
                <br />
                E-Mail: <RechtLink href="mailto:hello@ecommlab.io">hello@ecommlab.io</RechtLink>
                <br />
                Web:{' '}
                <RechtLink href="https://ecommlab.io" extern>
                  ecommlab.io
                </RechtLink>
              </p>
            ),
          },
          {
            titel: 'Registereintrag',
            inhalt: (
              <p>
                Registergericht: Amtsgericht München
                <br />
                Registernummer: HRB 290394
              </p>
            ),
          },
          { titel: 'Umsatzsteuer-ID (§27a UStG)', inhalt: <p>DE366772858</p> },
          { titel: 'Verantwortlicher gem. RStV', inhalt: <p>Andrey Cekovski</p> },
        ]}
      />
    </>
  )
}
