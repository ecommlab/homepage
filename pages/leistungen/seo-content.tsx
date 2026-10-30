import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungSeoContent() {
  const leistung = getLeistungBySlug('seo-content')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../../lib/isr'
