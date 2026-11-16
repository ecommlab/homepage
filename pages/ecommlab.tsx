import type { GetServerSideProps } from 'next'
import { lokalPfad, normalizeLocale } from '../lib/i18n'

export default function EcommlabRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Avoid duplicate content: /ecommlab should be the homepage (/)
  // Respect locale routing: /en/ecommlab -> /en, /bg/ecommlab -> /bg
  const destination = lokalPfad(normalizeLocale(ctx.locale), '/')
  return {
    redirect: {
      destination,
      permanent: true,
    },
  }
}

