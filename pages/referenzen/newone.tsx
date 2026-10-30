import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzNewone() {
  return <PortfolioDetailPage slug="newone" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
