/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Slimmer Cloud Run image (see Dockerfile)
  output: 'standalone',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },
  // ConsentOK über die eigene Domain (pages/api/consentok-cs.ts): spart dem
  // Browser den Verbindungsaufbau zu consentok.eu. Ohne locale:false — in
  // Next 13.4 verhindert die Option mit i18n, dass die Regel greift.
  async rewrites() {
    return [{ source: '/consentok/cs.js', destination: '/api/consentok-cs' }]
  },
  async redirects() {
    return [
      // Nur Seiten-URLs umleiten, keine Dateien unter /public/portfolio/*
      { source: '/portfolio', destination: '/referenzen', permanent: true },
      { source: '/portfolio/:slug([^/.]+)', destination: '/referenzen/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
