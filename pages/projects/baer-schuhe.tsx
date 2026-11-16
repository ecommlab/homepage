import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'
import { lokalPfad, normalizeLocale } from '../../lib/i18n'

export default function ProjectBaerSchuhe() {
  return <PortfolioDetailPage slug="baer-schuhe" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  // /projects ist die englische Adresse; Deutsch und Bulgarisch liegen unter /referenzen (mit Sprachpräfix).
  if (locale !== 'en') {
    return { redirect: { destination: lokalPfad(normalizeLocale(locale), '/referenzen/baer-schuhe'), permanent: true } }
  }
  return { props: {} }
}
