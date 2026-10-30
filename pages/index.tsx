import Head from 'next/head'
import { useRouter } from 'next/router'
import { EcommlabPage } from '../components/EcommlabPage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Home() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>Ecommlab</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Wir helfen Unternehmen, ihr E-Commerce-Potenzial zu erschließen – Strategie, Umsetzung und Wachstum.',
            'We help companies unlock their e-commerce potential — strategy, delivery, and growth.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EcommlabPage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
