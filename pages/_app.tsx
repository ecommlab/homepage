import '../styles/globals.css'
import '../styles/c2-tokens.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { BackToTopButton } from '../components/BackToTopButton'
import { appLocales, lokalPfad, normalizeLocale } from '../lib/i18n'
import type { AppLocale } from '../lib/i18n'

function stripQueryAndHash(url: string) {
  return url.split('#')[0]?.split('?')[0] || '/'
}

/** Pfad ohne Sprachpräfix: Deutsch ist Standard (kein Präfix), /en und /bg tragen eines. */
function stripLocalePrefix(path: string) {
  for (const l of appLocales) {
    if (path === `/${l}`) return '/'
    if (path.startsWith(`/${l}/`)) return path.slice(l.length + 1) || '/'
  }
  return path || '/'
}

function scrollToTopSmooth() {
  if (typeof window === 'undefined') return
  const options: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' }
  window.scrollTo(options)
  document.documentElement.scrollTo(options)
  document.body.scrollTo?.(options)
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const shouldScrollTopRef = useRef(false)

  // Nur bei explizitem Link-Klick nach oben scrollen.
  // Back/Forward bleibt damit reine Browser-Standardfunktionalitaet.
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as Element | null
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return

      const href = anchor.getAttribute('href') || ''
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return
      shouldScrollTopRef.current = true
    }

    document.addEventListener('click', onDocumentClick, true)
    return () => {
      document.removeEventListener('click', onDocumentClick, true)
    }
  }, [])

  // Bei Link-Navigation nach oben scrollen.
  // Bei Back/Forward nicht eingreifen => Browser stellt Position selbst wieder her.
  useEffect(() => {
    const onComplete = () => {
      if (!shouldScrollTopRef.current) return
      shouldScrollTopRef.current = false
      scrollToTopSmooth()
    }
    const onError = () => {
      shouldScrollTopRef.current = false
    }
    router.events.on('routeChangeComplete', onComplete)
    router.events.on('routeChangeError', onError)
    return () => {
      router.events.off('routeChangeComplete', onComplete)
      router.events.off('routeChangeError', onError)
    }
  }, [router.events])

  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '') ||
    '' /* falls leer, nutzen wir relative URLs */

  // Dieselbe Seite in jeder Sprache: Der Pfad ist in allen Sprachen gleich, nur das Präfix wechselt.
  const pfad = stripLocalePrefix(stripQueryAndHash(router.asPath || '/'))
  const href = (l: AppLocale) => `${baseUrl}${lokalPfad(l, pfad)}`
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <link rel="canonical" href={href(locale)} />
        {appLocales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={href(l)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={href('de')} />
      </Head>
      <div id="page-top" />
      <Component {...pageProps} />
      {/* Alle Seiten bringen ihren C2-Fuß selbst mit (components/c2/StartFuss.tsx über EcommlabPage bzw. SeitenRahmen) */}
      <BackToTopButton showAfter={180} />
    </>
  )
}
