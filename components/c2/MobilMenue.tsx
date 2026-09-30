import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import type { StartseiteInhalt } from '../../lib/startseiteInhalt'
import { Pfeil, Schliessen } from './Icons'

/**
 * Mobiles Vollbild-Menü (< 1024 px), Board C2m „m-menu“.
 * Papiergrund, Innenabstand 24 · Kopfzeile 48 hoch („Menü“ 14 px muted + Schließen-Knopf 48 × 48 Tinte) ·
 * Links 30 px/800 SHRP 100, je 64 hoch mit 2-px-Linien und Pfeil 22 px · Kontakt-Pille 52 hoch · unten Sprache DE · EN.
 * Zusatz gegenüber dem Board: Hell/Dunkel-Umschalter unten rechts (bisherige Funktion der Seite bleibt erhalten).
 *
 * Barrierefreiheit: role="dialog" + aria-modal, Fokus springt auf „Schließen“, Escape schließt,
 * Tab bleibt im Menü, Seite dahinter scrollt nicht, Fokus kehrt zum Menü-Knopf zurück.
 */
export type MenuePunkt = { href: string; label: string }

export function MobilMenue({
  offen,
  onSchliessen,
  punkte,
  kontakt,
  t,
  thema,
  onThema,
}: {
  offen: boolean
  onSchliessen: () => void
  punkte: MenuePunkt[]
  kontakt: MenuePunkt
  t: StartseiteInhalt
  thema: 'light' | 'dark'
  onThema: () => void
}) {
  const router = useRouter()
  const dialog = useRef<HTMLDivElement>(null)
  const zu = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!offen) return
    const vorher = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    zu.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onSchliessen()
        return
      }
      if (e.key !== 'Tab' || !dialog.current) return
      const f = dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!f.length) return
      const erst = f[0]
      const letzt = f[f.length - 1]
      if (e.shiftKey && document.activeElement === erst) {
        e.preventDefault()
        letzt.focus()
      } else if (!e.shiftKey && document.activeElement === letzt) {
        e.preventDefault()
        erst.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      vorher?.focus?.()
    }
  }, [offen, onSchliessen])

  useEffect(() => {
    router.events.on('routeChangeStart', onSchliessen)
    return () => router.events.off('routeChangeStart', onSchliessen)
  }, [router.events, onSchliessen])

  if (!offen) return null
  const en = router.locale === 'en'

  return (
    <div
      ref={dialog}
      id="c2-menue"
      role="dialog"
      aria-modal="true"
      aria-label={t.kopf.menue}
      className="c2-motion fixed inset-0 z-50 flex flex-col overflow-y-auto p-[24px] lg:hidden"
      style={{ background: 'var(--c2-paper)', color: 'var(--c2-ink)', animation: 'c2-menu 200ms var(--c2-ease-out) both' }}
    >
      <div className="flex h-[48px] items-center justify-between">
        <span className="text-[14px] font-semibold leading-none" style={{ color: 'var(--c2-muted)' }}>
          {t.kopf.menue}
        </span>
        <button
          ref={zu}
          type="button"
          aria-label={t.kopf.menueSchliessen}
          onClick={onSchliessen}
          className="c2-pill-ink -mr-[8px] flex h-[48px] w-[48px] items-center justify-center rounded-full border-0 p-0"
        >
          <Schliessen />
        </button>
      </div>
      <nav aria-label={t.kopf.hauptnavigation} className="mt-[32px] flex flex-col border-b-2" style={{ borderColor: 'var(--c2-ink)' }}>
        {punkte.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="flex min-h-[64px] items-center justify-between border-t-2 text-[30px] font-extrabold leading-none tracking-[-0.02em] no-underline [font-variation-settings:'SHRP'_100]"
            style={{ borderColor: 'var(--c2-ink)' }}
          >
            {p.label}
            <Pfeil size={22} strokeWidth={2.2} />
          </Link>
        ))}
      </nav>
      <div className="mt-[28px] flex">
        <Link href={kontakt.href} className="c2-pill-ink inline-flex h-[52px] flex-1 items-center justify-center rounded-full px-[24px] text-[17px] font-semibold leading-none no-underline">
          {kontakt.label}
        </Link>
      </div>
      <div className="mt-auto flex items-center justify-between pt-[28px] text-[15px] font-semibold leading-none">
        <nav aria-label={t.kopf.sprache} className="flex items-center gap-[12px]">
          {en ? (
            <Link href={router.asPath} locale="de" lang="de" hrefLang="de" className="flex min-h-[44px] items-center font-medium no-underline">
              DE
            </Link>
          ) : (
            <span aria-current="true" className="flex min-h-[44px] items-center">
              DE
            </span>
          )}
          <span aria-hidden>·</span>
          {en ? (
            <span aria-current="true" className="flex min-h-[44px] items-center">
              EN
            </span>
          ) : (
            <Link href={router.asPath} locale="en" lang="en" hrefLang="en" className="flex min-h-[44px] items-center font-medium no-underline">
              EN
            </Link>
          )}
        </nav>
        <button type="button" onClick={onThema} className="flex min-h-[44px] items-center border-0 bg-transparent p-0 font-medium" style={{ color: 'inherit', fontFamily: 'inherit' }}>
          {thema === 'dark' ? t.fuss.hell : t.fuss.dunkel}
        </button>
      </div>
    </div>
  )
}
