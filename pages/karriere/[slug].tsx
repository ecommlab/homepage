import Head from 'next/head'
import { useRouter } from 'next/router'
import { JobDetailPage } from '../../components/JobDetailPage'
import { getJobBySlug, jobs } from '../../lib/jobs'
import { normalizeLocale, tr } from '../../lib/i18n'

export default function JobDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const job = getJobBySlug(slug)

  if (router.isFallback) return null
  if (!job) return null

  return (
    <>
      <Head>
        <title>{`${job.title[locale]} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(locale, `${job.title.de} – Komm in unser Team.`, `${job.title.en} – Join our team.`)}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobDetailPage job={job} />
    </>
  )
}

export function getStaticPaths({ locales }: { locales?: readonly string[] }) {
  const locs = locales ?? ['de', 'en']
  return {
    paths: locs.flatMap((locale) => jobs.map((j) => ({ params: { slug: j.slug }, locale }))),
    fallback: false,
  }
}

export function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } }
}

