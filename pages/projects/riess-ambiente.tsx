import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'
import { lokalPfad, normalizeLocale } from '../../lib/i18n'

export default function ProjectRiessAmbiente() {
  return <PortfolioDetailPage slug="riess-ambiente" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  // /projects ist die englische Adresse; Deutsch und Bulgarisch liegen unter /referenzen (mit Sprachpräfix).
  if (locale !== 'en') {
    return { redirect: { destination: lokalPfad(normalizeLocale(locale), '/referenzen/riess-ambiente'), permanent: true } }
  }
  return { props: {} }
}
