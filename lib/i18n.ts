/**
 * Sprachen der Seite. Deutsch ist Standard (ohne Pfadpräfix), Englisch und Bulgarisch liegen unter /en bzw. /bg
 * (next.config.js → i18n). Jede Textstelle trägt alle drei Fassungen; fehlt eine, scheitert der Typcheck.
 */
export const appLocales = ['de', 'en', 'bg'] as const
export type AppLocale = (typeof appLocales)[number]

/** Kürzel und Eigenname je Sprache – für den Umschalter (components/c2/Sprachwahl.tsx). */
export const sprachen: readonly { code: AppLocale; kurz: string; name: string }[] = [
  { code: 'de', kurz: 'DE', name: 'Deutsch' },
  { code: 'en', kurz: 'EN', name: 'English' },
  { code: 'bg', kurz: 'BG', name: 'Български' },
]

export function normalizeLocale(locale?: string): AppLocale {
  return locale === 'en' || locale === 'bg' ? locale : 'de'
}

export function tr(locale: AppLocale, de: string, en: string, bg: string) {
  return locale === 'bg' ? bg : locale === 'en' ? en : de
}

/** Pfad mit Sprachpräfix: Deutsch ohne, sonst /en bzw. /bg. */
export function lokalPfad(locale: AppLocale, pfad: string) {
  if (locale === 'de') return pfad
  return pfad === '/' ? `/${locale}` : `/${locale}${pfad}`
}
