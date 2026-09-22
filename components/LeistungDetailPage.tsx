import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import type { LeistungDetail } from '../lib/leistungDetails'
import { normalizeLocale, tr } from '../lib/i18n'

export function LeistungDetailPage({ leistung }: { leistung: LeistungDetail }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${leistung.title[locale]} – Ecommlab`}</title>
        <meta name="description" content={leistung.intro[locale]} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SiteHeader />

        <main>
          <section className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(24,24,27,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.20),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.10),transparent_60%)]"
            />

            <Container>
              <div className="py-14 sm:py-18">
                <Link
                  href="/leistungen"
                  className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                >
                  ← {tr(locale, 'Zurück zu Leistungen', 'Back to services')}
                </Link>

                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {leistung.kicker[locale]}
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                  {leistung.title[locale]}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {leistung.intro[locale]}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/kontakt">
                    {tr(locale, 'Kontakt aufnehmen', 'Contact')}
                  </ButtonLink>
                  <ButtonLink href="/referenzen" variant="secondary">
                    {tr(locale, 'Referenzen ansehen', 'View work')}
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </section>

          <section className="py-14 sm:py-16">
            <Container>
              <div className="grid gap-4 lg:grid-cols-2">
                {leistung.sections.map((s) => (
                  <div
                    key={s.title.de}
                    className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {s.title[locale]}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {s.body[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

