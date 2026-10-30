import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzRiessAmbiente() {
  return <PortfolioDetailPage slug="riess-ambiente" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
