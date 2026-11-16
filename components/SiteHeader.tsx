import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { Container } from './Container'
import { normalizeLocale, tr } from '../lib/i18n'

const nav = [
  { labelDe: 'Home', labelEn: 'Home', href: '/' },
  { labelDe: 'Referenzen', labelEn: 'Cases', href: '/referenzen' },
  { labelDe: 'Leistungen', labelEn: 'Services', href: '/leistungen' },
  { labelDe: 'Team', labelEn: 'Team', href: '/team' },
  { labelDe: 'Karriere', labelEn: 'Careers', href: '/karriere' },
  { labelDe: 'Kontakt', labelEn: 'Contact', href: '/kontakt' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    setTheme(root.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    const next = root.classList.contains('dark') ? 'light' : 'dark'
    if (next === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore
    }
    setTheme(next)
  }

  function ThemeIcon({ mode }: { mode: 'light' | 'dark' }) {
    // moon for light->dark action, sun for dark->light action
    if (mode === 'dark') {
      return (
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M12 18.5a6.5 6.5 0 0 0 0-13 6.5 6.5 0 0 0 0 13Zm0 2a8.5 8.5 0 0 1 0-17 8.5 8.5 0 0 1 0 17ZM12 1.5a1 1 0 0 1 1 1V4a1 1 0 1 1-2 0V2.5a1 1 0 0 1 1-1Zm0 18.5a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1ZM1.5 12a1 1 0 0 1 1-1H4a1 1 0 1 1 0 2H2.5a1 1 0 0 1-1-1Zm18.5 0a1 1 0 0 1 1-1H22a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1ZM4.22 4.22a1 1 0 0 1 1.41 0L6.7 5.29a1 1 0 1 1-1.41 1.41L4.22 5.63a1 1 0 0 1 0-1.41Zm13.08 13.08a1 1 0 0 1 1.41 0l1.07 1.07a1 1 0 1 1-1.41 1.41l-1.07-1.07a1 1 0 0 1 0-1.41ZM19.78 4.22a1 1 0 0 1 0 1.41L18.71 6.7a1 1 0 1 1-1.41-1.41l1.07-1.07a1 1 0 0 1 1.41 0ZM6.7 17.3a1 1 0 0 1 0 1.41l-1.07 1.07a1 1 0 1 1-1.41-1.41l1.07-1.07a1 1 0 0 1 1.41 0Z"
          />
        </svg>
      )
    }

    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M21 14.2A8.2 8.2 0 0 1 9.8 3a7.3 7.3 0 1 0 11.2 11.2ZM12 22A9.9 9.9 0 0 1 8.2 2.8a1 1 0 0 1 1.2 1.2A6.2 6.2 0 1 0 20 14.6a1 1 0 0 1 1.2-1.2A9.9 9.9 0 0 1 12 22Z"
        />
      </svg>
    )
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/ecommlab"
            className="inline-flex items-center"
            aria-label={tr(locale, 'Ecommlab Seite', 'Ecommlab page', 'Страница на Ecommlab')}
          >
            <span className="sr-only">ECOMMLAB</span>
            <Image
              src="/brand/logo.svg"
              alt="Ecommlab"
              width={180}
              height={48}
              className="h-8 w-auto dark:hidden"
              priority
            />
            <Image
              src="/brand/logo-white.svg"
              alt="Ecommlab"
              width={180}
              height={48}
              className="hidden h-8 w-auto dark:block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-4 md:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const className =
                'text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              return (
                <Link key={item.href} className={className} href={item.href}>
                  {tr(locale, item.labelDe, item.labelEn, item.labelEn)}
                </Link>
              )
            })}

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-900 transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50 dark:hover:bg-zinc-950"
              aria-label={theme === 'dark' ? tr(locale, 'Hellmodus aktivieren', 'Switch to light mode', 'Включване на светъл режим') : tr(locale, 'Dunkelmodus aktivieren', 'Switch to dark mode', 'Включване на тъмен режим')}
              title={theme === 'dark' ? tr(locale, 'Hellmodus', 'Light mode', 'Светъл режим') : tr(locale, 'Dunkelmodus', 'Dark mode', 'Тъмен режим')}
            >
              <span className="sr-only">
                {theme === 'dark' ? tr(locale, 'Hellmodus', 'Light mode', 'Светъл режим') : tr(locale, 'Dunkelmodus', 'Dark mode', 'Тъмен режим')}
              </span>
              <ThemeIcon mode={theme} />
            </button>

            <div className="ml-2 flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 p-1 text-sm dark:border-zinc-800 dark:bg-zinc-950/50">
              <Link
                href={router.asPath}
                locale="de"
                className={[
                  'rounded-full px-2 py-1 font-semibold transition',
                  locale === 'de'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="Deutsch"
              >
                DE
              </Link>
              <Link
                href={router.asPath}
                locale="en"
                className={[
                  'rounded-full px-2 py-1 font-semibold transition',
                  locale === 'en'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="English"
              >
                EN
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-50 dark:hover:bg-zinc-950 md:hidden"
            aria-label={open ? tr(locale, 'Navigation schließen', 'Close navigation', 'Затваряне на навигацията') : tr(locale, 'Navigation öffnen', 'Open navigation', 'Отваряне на навигацията')}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? tr(locale, 'Schließen', 'Close', 'Затвори') : tr(locale, 'Menü', 'Menu', 'Меню')}</span>
            <span aria-hidden="true" className="relative block h-5 w-6">
              <span
                className={[
                  'absolute left-0 top-0 block h-[2px] w-6 rounded-full bg-current transition-transform',
                  open ? 'translate-y-[9px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute top-[9px] block h-[2px] rounded-full bg-current transition-[opacity,transform,width]',
                  open ? 'left-0 w-6 opacity-0' : 'left-0 w-4 translate-x-2 opacity-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-[18px] block h-[2px] w-6 rounded-full bg-current transition-transform',
                  open ? 'translate-y-[-9px] -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 z-50 h-dvh w-[88%] max-w-sm border-l border-zinc-200 bg-white p-5 shadow-2xl transition-transform dark:border-zinc-800 dark:bg-zinc-950 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {tr(locale, 'Navigation', 'Navigation', 'Навигация')}
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-base font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              {tr(locale, 'Schließen', 'Close', 'Затвори')}
            </button>
          </div>

          <nav className="mt-6 grid gap-1" aria-label={tr(locale, 'Mobile Navigation', 'Mobile navigation', 'Мобилна навигация')}>
            {nav.map((item) => {
              const className =
                'rounded-xl px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900'

              return (
                <Link
                  key={item.href}
                  className={className}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {tr(locale, item.labelDe, item.labelEn, item.labelEn)}
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {tr(locale, 'Sprache', 'Language', 'Език')}
            </div>
            <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 text-sm dark:border-zinc-800 dark:bg-zinc-950">
              <Link
                href={router.asPath}
                locale="de"
                onClick={() => setOpen(false)}
                className={[
                  'rounded-full px-3 py-2 font-semibold transition',
                  locale === 'de'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="Deutsch"
              >
                DE
              </Link>
              <Link
                href={router.asPath}
                locale="en"
                onClick={() => setOpen(false)}
                className={[
                  'rounded-full px-3 py-2 font-semibold transition',
                  locale === 'en'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="English"
              >
                EN
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {tr(locale, 'Darstellung', 'Appearance', 'Изглед')}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              <ThemeIcon mode={theme} />
              {theme === 'dark' ? tr(locale, 'Hell', 'Light', 'Светъл') : tr(locale, 'Dunkel', 'Dark', 'Тъмен')}
            </button>
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {tr(locale, 'Tipp: Mit ', 'Tip: Press ', 'Съвет: с ')}
            <kbd className="rounded border px-1">Esc</kbd>
            {tr(locale, ' kannst du das Menü schließen.', ' to close the menu.', ' можете да затворите менюто.')}
          </div>
        </div>
      </div>
    </header>
  )
}

