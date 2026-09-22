import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '../components/Container'
import { SiteHeader } from '../components/SiteHeader'
import { normalizeLocale, tr } from '../lib/i18n'

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

      <div className="min-h-screen">
        <SiteHeader />

        <main>
          <section className="py-14 sm:py-16">
            <Container>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Rechtliches', 'Legal')}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'Impressum', 'Legal notice')}
              </h1>

              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Ecommlab GmbH
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Turnerstraße 15
                    <br />
                    81827 München, Deutschland
                  </p>

                  <p className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">Vertreten durch</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Andrey Cekovski, Pavel Mihaylov
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Kontakt', 'Contact')}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Telefon: +49 89 41 61 62 48
                    <br />
                    E-Mail:{' '}
                    <a className="underline underline-offset-4 hover:no-underline" href="mailto:hello@ecommlab.io">
                      hello@ecommlab.io
                    </a>
                    <br />
                    Web:{' '}
                    <a
                      className="underline underline-offset-4 hover:no-underline"
                      href="https://ecommlab.io"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ecommlab.io
                    </a>
                  </p>

                  <p className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">Registereintrag</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Registergericht: Amtsgericht München
                    <br />
                    Registernummer: HRB 290394
                  </p>

                  <p className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">
                    Umsatzsteuer-ID (§27a UStG)
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">DE366772858</p>

                  <p className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">
                    Verantwortlicher gem. RStV
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Andrey Cekovski</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/datenschutzbestimmungen">
                  {tr(locale, 'Datenschutzbestimmungen', 'Privacy policy')}
                </Link>
                <Link className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/kontakt">
                  {tr(locale, 'Kontakt', 'Contact')}
                </Link>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

