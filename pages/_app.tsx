import '../styles/globals.css'
import '../styles/c2-tokens.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { BackToTopButton } from '../components/BackToTopButton'

function stripQueryAndHash(url: string) {
  return url.split('#')[0]?.split('?')[0] || '/'
}

function stripLocalePrefix(path: string) {
  // defaultLocale is "de" (no prefix), "en" is prefixed as /en/...
  if (path === '/en') return '/'
  if (path.startsWith('/en/')) return path.slice(3) || '/'
  if (path === '/de') return '/'
  if (path.startsWith('/de/')) return path.slice(3) || '/'
  return path || '/'
}

function enFromDePath(dePath: string) {
  return dePath === '/' ? '/en' : `/en${dePath}`
}

function deFromEnPath(enPathWithoutLocale: string) {
  return enPathWithoutLocale
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

  const currentPath = stripLocalePrefix(stripQueryAndHash(router.asPath || '/'))
  const dePath = router.locale === 'en' ? deFromEnPath(currentPath) : currentPath
  const enPath = enFromDePath(dePath)

  const deHref = `${baseUrl}${dePath}`
  const enHref = `${baseUrl}${enPath}`
  const canonical = router.locale === 'en' ? enHref : deHref

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="de" href={deHref} />
        <link rel="alternate" hrefLang="en" href={enHref} />
        <link rel="alternate" hrefLang="x-default" href={deHref} />
      </Head>
      <div id="page-top" />
      <Component {...pageProps} />
      {/* Alle Seiten bringen ihren C2-Fuß selbst mit (components/c2/StartFuss.tsx über EcommlabPage bzw. SeitenRahmen) */}
      <BackToTopButton showAfter={180} />
    </>
  )
}
