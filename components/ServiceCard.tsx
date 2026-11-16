import Link from 'next/link'
import { useRouter } from 'next/router'
import { normalizeLocale, tr } from '../lib/i18n'

type Props = {
  title: string
  description: string
  href: string
}

export function ServiceCard({ title, description, href }: Props) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const isInternal = href.startsWith('/')
  const className =
    'group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950'

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <span className="text-sm text-zinc-400 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-200">
          ↗
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
      <div className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {tr(locale, 'weiterlesen', 'read more', 'прочетете още')}{' '}
        <span className="inline-block transition group-hover:translate-x-0.5">→</span>
      </div>
    </>
  )

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {content}
    </a>
  )
}

