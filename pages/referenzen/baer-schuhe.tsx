import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzBaerSchuhe() {
  return <PortfolioDetailPage slug="baer-schuhe" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
