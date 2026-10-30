import type { NextApiRequest, NextApiResponse } from 'next'
import { consentokRuntime, istSiteKey } from '../../lib/consentokRuntime'

/**
 * ConsentOK-Runtime über die eigene Domain (/consentok/cs.js → hierher, siehe
 * next.config.js). Seit dem Inlining in pages/_document.tsx ist das der
 * Rückfall für den Fall, dass beim Rendern keine Kopie im Speicher war —
 * sowie für Seiten, die das Skript extern einbinden.
 *
 * Eigene Route statt reinem Proxy: So bestimmen WIR die Cache-Dauer. Ein
 * Proxy reicht die Header von consentok.eu durch (Edge 1 Stunde), und dessen
 * Cache-Leerung beim Veröffentlichen erreicht die Cloudflare-Zone von
 * ecommlab.io nicht. Mit 5 Minuten kommen Banner-Änderungen zügig an.
 * Ohne Kopie leiten wir auf das Original um, damit das Banner nie fehlt.
 */
const HOST = 'https://consentok.eu'

export default async function consentokCs(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id ?? '')
  if (!istSiteKey(id)) {
    res.status(400).setHeader('Content-Type', 'application/javascript; charset=utf-8').send('/* consentok: ungültiger Schlüssel */\n')
    return
  }
  const kopie = await consentokRuntime(id)
  if (!kopie) {
    res.redirect(307, `${HOST}/cs.js?id=${id}`)
    return
  }
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600')
  if (kopie.etag) res.setHeader('ETag', kopie.etag)
  if (kopie.etag && req.headers['if-none-match'] === kopie.etag) {
    res.status(304).end()
    return
  }
  res.status(200).send(kopie.body)
}
