import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { normalizeLocale, sprachen } from '../../lib/i18n'

/**
 * Sprachumschalter „DE · EN · BG“ – eine Quelle für Startseite, Unterseiten und Mobilmenü.
 * Die aktive Sprache ist Text (aria-current), die anderen sind Links auf dieselbe Seite in der anderen Sprache.
 * Aussehen kommt vom Aufrufer (Kopf und Mobilmenü setzen unterschiedlich).
 */
export function Sprachwahl({ linkKlasse, aktivKlasse, trennerKlasse }: { linkKlasse: string; aktivKlasse: string; trennerKlasse?: string }) {
  const router = useRouter()
  const aktiv = normalizeLocale(router.locale)
  return (
    <>
      {sprachen.map((s, i) => (
        <Fragment key={s.code}>
          {i > 0 ? (
            <span aria-hidden className={trennerKlasse}>
              ·
            </span>
          ) : null}
          {s.code === aktiv ? (
            <span lang={s.code} aria-current="true" className={aktivKlasse}>
              {s.kurz}
            </span>
          ) : (
            <Link href={router.asPath} locale={s.code} lang={s.code} hrefLang={s.code} aria-label={s.name} className={linkKlasse}>
              {s.kurz}
            </Link>
          )}
        </Fragment>
      ))}
    </>
  )
}
