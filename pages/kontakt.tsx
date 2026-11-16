import Head from 'next/head'
import { useRouter } from 'next/router'
import { KontaktPage } from '../components/KontaktPage'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Kontakt() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Kontakt', 'Contact', 'Контакт')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Sie wollen ein neues Projekt starten, in unser Team kommen oder nur „Hi“ sagen? Wir freuen uns auf Ihre Nachricht.',
            'Want to start a new project, join our team, or just say hi? We look forward to your message.',
            'Искате да започнете нов проект, да станете част от екипа ни или просто да кажете „Здрасти“? Ще се радваме да ни пишете.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KontaktPage />
    </>
  )
}

// Statisch mit Verfallsdatum — Begründung in lib/isr.ts
export { isrStaticProps as getStaticProps } from '../lib/isr'
