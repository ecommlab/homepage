import Head from 'next/head'
import { useRouter } from 'next/router'
import { LeistungenPage } from '../components/LeistungenPage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Leistungen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'Leistungen – Ecommlab', 'Services – Ecommlab')}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Individuell angepasste Lösungen für E-Commerce, Web Development, Online Marketing, SEO und mehr.',
            'Tailored solutions for e-commerce, web development, online marketing, SEO, and more.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LeistungenPage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
