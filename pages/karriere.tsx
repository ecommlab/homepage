import Head from 'next/head'
import { useRouter } from 'next/router'
import { KarrierePage } from '../components/KarrierePage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Karriere() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'Karriere – Ecommlab', 'Careers – Ecommlab', 'Кариери – Ecommlab')}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Komm in unser Team: Offene Positionen und Einblicke in unsere Arbeitsweise.',
            'Join our team: Open roles and insights into how we work.',
            'Ела в нашия екип: отворени позиции и поглед към начина ни на работа.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KarrierePage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
