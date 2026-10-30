import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzKaipara() {
  return <PortfolioDetailPage slug="kaipara" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
