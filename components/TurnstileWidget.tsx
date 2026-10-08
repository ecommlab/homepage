import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string
          theme?: 'light' | 'dark' | 'auto'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      reset: (widgetId?: string) => void
      remove?: (widgetId: string) => void
    }
  }
}

type Props = {
  siteKey: string
  theme?: 'light' | 'dark' | 'auto'
  onToken: (token: string) => void
  onReady?: () => void
  className?: string
}

export function TurnstileWidget({ siteKey, theme = 'auto', onToken, onReady, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const hostRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef<Props['onToken']>(onToken)
  const onReadyRef = useRef<Props['onReady']>(onReady)
  // Turnstile weighs several hundred KB; load it only once the form is close to the viewport.
  const [nah, setNah] = useState(false)

  useEffect(() => {
    onTokenRef.current = onToken
    onReadyRef.current = onReady
  }, [onReady, onToken])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || nah) return
    if (typeof IntersectionObserver === 'undefined') {
      setNah(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNah(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [nah])

  useEffect(() => {
    if (!nah) return
    const hostEl = hostRef.current
    if (!hostEl) return
    const host: HTMLDivElement = hostEl

    let cancelled = false

    function tryRender() {
      if (cancelled) return
      if (!window.turnstile) return
      if (widgetIdRef.current) return

      // Important for React StrictMode + re-renders:
      // ensure the host is empty before rendering a widget.
      host.replaceChildren()

      widgetIdRef.current = window.turnstile.render(host as HTMLElement, {
        sitekey: siteKey,
        theme,
        callback: (token) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => onTokenRef.current(''),
      })
      onReadyRef.current?.()
    }

    tryRender()
    const t = window.setInterval(() => {
      tryRender()
      if (widgetIdRef.current) window.clearInterval(t)
    }, 250)
    return () => {
      cancelled = true
      window.clearInterval(t)
      try {
        if (window.turnstile && widgetIdRef.current) {
          // Prefer remove() (prevents DOM piling up); fallback to reset + manual cleanup.
          window.turnstile.remove?.(widgetIdRef.current)
          window.turnstile.reset(widgetIdRef.current)
        }
      } catch {
        // ignore
      }
      widgetIdRef.current = null
      try {
        host.replaceChildren()
      } catch {
        // ignore
      }
    }
  }, [nah, siteKey, theme])

  return (
    <>
      {nah ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      ) : null}
      <div ref={wrapRef} className={className}>
        <div ref={hostRef} className="min-h-[65px]" />
      </div>
    </>
  )
}

