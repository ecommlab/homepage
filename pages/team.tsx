import Head from 'next/head'
import { useRouter } from 'next/router'
import { TeamPage } from '../components/TeamPage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Team() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'Team – Ecommlab', 'Team – Ecommlab')}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Lerne das Team hinter Ecommlab kennen: E-Commerce-Spezialist:innen, Entwickler:innen, Designer:innen und Marketing-Profis.',
            'Meet the people behind Ecommlab: e-commerce specialists, developers, designers and marketing pros.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TeamPage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
