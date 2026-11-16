import Head from 'next/head'
import { useRouter } from 'next/router'
import { PortfolioPage } from '../components/PortfolioPage'
import { lokalPfad, normalizeLocale, tr } from '../lib/i18n'

export default function Projects() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'REFERENZEN – Ecommlab', 'Projects – Ecommlab', 'Референции – Ecommlab')}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Ausgewählte Projekte und Case Studies, die wir gemeinsam mit unseren Kunden umgesetzt haben.',
            'Selected projects and case studies we delivered together with our clients.',
            'Избрани проекти и казуси, които реализирахме заедно с нашите клиенти.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioPage />
    </>
  )
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  // /projects ist die englische Adresse; Deutsch und Bulgarisch liegen unter /referenzen (mit Sprachpräfix).
  if (locale !== 'en') {
    return { redirect: { destination: lokalPfad(normalizeLocale(locale), '/referenzen'), permanent: true } }
  }
  return { props: {} }
}
