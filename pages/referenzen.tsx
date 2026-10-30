import Head from 'next/head'
import { useRouter } from 'next/router'
import { PortfolioPage } from '../components/PortfolioPage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Referenzen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'REFERENZEN – Ecommlab', 'Projects – Ecommlab')}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Ausgewählte Projekte und Case Studies, die wir gemeinsam mit unseren Kunden umgesetzt haben.',
            'Selected projects and case studies we delivered together with our clients.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioPage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
