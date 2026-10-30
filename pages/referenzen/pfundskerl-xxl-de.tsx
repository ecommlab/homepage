import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ReferenzPfundskerl() {
  return <PortfolioDetailPage slug="pfundskerl-xxl-de" />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
