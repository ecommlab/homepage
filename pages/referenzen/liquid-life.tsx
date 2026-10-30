import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzLiquidLife() {
  return <PortfolioDetailPage slug="liquid-life" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
