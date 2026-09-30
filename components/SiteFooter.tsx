import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from './Container'
import { normalizeLocale, tr } from '../lib/i18n'

declare global {
  interface Window {
    consentok?: { showSettings?: () => void; renew?: () => void }
  }
}

export function SiteFooter() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            ECOMMLAB GmbH © {new Date().getFullYear()}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/impressum" scroll={true}>
              {tr(locale, 'Impressum', 'Legal notice')}
            </Link>
            <Link
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              href="/nutzungsbedingungen"
              scroll={true}
            >
              {tr(locale, 'AGBs', 'Terms')}
            </Link>
            <Link
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              href="/datenschutzbestimmungen"
              scroll={true}
            >
              {tr(locale, 'Datenschutz', 'Privacy')}
            </Link>
            <a
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              href="#"
              onClick={(event) => {
                event.preventDefault()
                const api = window.consentok
                if (api?.showSettings) api.showSettings()
                else api?.renew?.()
              }}
            >
              {tr(locale, 'Cookie-Einstellungen', 'Cookie settings')}
            </a>
            <a
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              href="mailto:hello@ecommlab.io"
            >
              hello@ecommlab.io
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

