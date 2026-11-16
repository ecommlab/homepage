import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { normalizeLocale, tr } from '../lib/i18n'

type Props = {
  /**
   * Ab welcher Scroll-Position (px) der Button sichtbar wird.
   */
  showAfter?: number
}

function scrollToTop() {
  const smooth: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' }
  const instant: ScrollToOptions = { top: 0, left: 0, behavior: 'auto' }
  const root = document.scrollingElement as HTMLElement | null

  const candidates = Array.from(document.querySelectorAll<HTMLElement>('body *')).filter((el) => {
    const style = window.getComputedStyle(el)
    const canScrollY =
      (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'overlay') &&
      el.scrollHeight > el.clientHeight
    const canScrollX =
      (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'overlay') &&
      el.scrollWidth > el.clientWidth
    return canScrollY || canScrollX
  })

  const run = () => {
    window.scrollTo(smooth)
    root?.scrollTo(smooth)
    document.documentElement.scrollTo(smooth)
    document.body.scrollTo?.(smooth)
    candidates.forEach((el) => el.scrollTo(smooth))
  }

  // Fokus entfernen: fokussierte Inputs/Buttons können den Viewport wieder runterziehen.
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  run()
  requestAnimationFrame(run)
  window.setTimeout(run, 120)

  // Fallback nur falls ein Browser smooth ignoriert.
  window.setTimeout(() => {
    const y =
      window.scrollY ??
      window.pageYOffset ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      0
    if (y > 20) {
      window.scrollTo(instant)
      root?.scrollTo(instant)
      document.documentElement.scrollTo(instant)
      document.body.scrollTo?.(instant)
      candidates.forEach((el) => el.scrollTo(instant))
    }
  }, 700)
}

export function BackToTopButton({ showAfter = 700 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function getScrollY() {
      const base = Math.max(
        window.scrollY ?? 0,
        window.pageYOffset ?? 0,
        document.documentElement.scrollTop ?? 0,
        document.body.scrollTop ?? 0,
        (document.scrollingElement as HTMLElement | null)?.scrollTop ?? 0,
      )

      // Fallback: falls ein interner Container scrollt, dessen Position berücksichtigen
      let maxContainerScroll = 0
      const nodes = document.querySelectorAll<HTMLElement>('body *')
      nodes.forEach((el) => {
        if (el.scrollTop > maxContainerScroll) maxContainerScroll = el.scrollTop
      })

      return Math.max(base, maxContainerScroll)
    }

    function update() {
      setVisible(getScrollY() > showAfter)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    document.addEventListener('scroll', update, { capture: true, passive: true })
    window.addEventListener('touchmove', update, { passive: true })
    window.addEventListener('resize', update, { passive: true } as AddEventListenerOptions)
    window.addEventListener('orientationchange', update, { passive: true } as AddEventListenerOptions)
    const t = window.setInterval(update, 300)

    return () => {
      window.removeEventListener('scroll', update)
      document.removeEventListener('scroll', update as EventListener, true)
      window.removeEventListener('touchmove', update)
      window.removeEventListener('resize', update as EventListener)
      window.removeEventListener('orientationchange', update as EventListener)
      window.clearInterval(t)
    }
  }, [showAfter])

  const locale = normalizeLocale(useRouter().locale)

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(false)
    scrollToTop()
  }, [])

  if (!visible) return null

  return (
    <a
      href="#page-top"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[2147483647] inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 pointer-events-auto dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-50 dark:hover:bg-zinc-950"
      aria-label={tr(locale, 'Nach oben scrollen', 'Scroll to top', 'Към началото на страницата')}
      title={tr(locale, 'Nach oben', 'Back to top', 'Нагоре')}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 pointer-events-none">
        <path
          fill="currentColor"
          d="M12 4.5a1 1 0 0 1 .7.29l6.5 6.5a1 1 0 0 1-1.4 1.42L13 8.91V19a1 1 0 1 1-2 0V8.91l-4.8 4.8a1 1 0 1 1-1.4-1.42l6.5-6.5a1 1 0 0 1 .7-.29Z"
        />
      </svg>
    </a>
  )
}

