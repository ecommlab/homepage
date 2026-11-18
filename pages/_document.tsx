import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { consentokRuntime, inlineSicher } from '../lib/consentokRuntime'
import { normalizeLocale } from '../lib/i18n'
import { kyrillischeSchriftdatei } from '../lib/kyrillischeSchrift'
import { alsJsonLd, pfadOhneSprache, strukturierteDaten } from '../lib/strukturierteDaten'

type Props = DocumentInitialProps & { consentokInline: string | null; kyrillisch: string | null; jsonLd: string }

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initial = await Document.getInitialProps(ctx)
    const id = process.env.NEXT_PUBLIC_CONSENTOK_ID
    const kopie = id ? await consentokRuntime(id) : null
    // Strukturierte Daten nur hier, nicht in _app — Begründung in lib/strukturierteDaten.ts
    const jsonLd = alsJsonLd(strukturierteDaten(pfadOhneSprache(ctx.asPath || '/'), normalizeLocale(ctx.locale), process.env.NEXT_PUBLIC_SITE_URL))
    return { ...initial, consentokInline: kopie && inlineSicher(kopie.body) ? kopie.body : null, kyrillisch: ctx.locale === 'bg' ? kyrillischeSchriftdatei() : null, jsonLd }
  }

  render() {
    const consentokId = process.env.NEXT_PUBLIC_CONSENTOK_ID
    const consentokInline = this.props.consentokInline
    const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
    const locale = normalizeLocale(this.props.__NEXT_DATA__?.locale)

    return (
      <Html lang={locale}>
        <Head>
          {/* Kyrillische Schrift nur auf /bg vorladen – Begründung in lib/kyrillischeSchrift.ts */}
          {this.props.kyrillisch ? <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={this.props.kyrillisch} /> : null}

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: this.props.jsonLd }} />

          <script
            type="text/plain"
            data-consentok="statistics"
            src="https://pingbot.eu/api/rum/script/rum_fc34c67850e5493dad8b9776e5ff42b1"
            async
            defer
          />

          {ga4Id ? (
            <>
              {/*
                GA4 gtag after Consentok. cs.js sets consent default (denied)
                and updates it after the banner; gtag then respects GCM.
                type=text/plain + data-cookieconsent: Consentok only activates
                these scripts after statistics consent.
              */}
              {/* eslint-disable-next-line @next/next/next-script-for-ga */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`}
                type="text/plain"
                data-cookieconsent="statistics"
                data-consentok="statistics"
              />
              <script
                type="text/plain"
                data-cookieconsent="statistics"
                data-consentok="statistics"
                dangerouslySetInnerHTML={{
                  __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');
`,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          {/* Theme init: avoid flash before hydration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (systemDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  } catch (e) {}
})();`,
            }}
          />
          {consentokId ? (
            consentokInline ? (
              // ConsentOK muss vor dem ersten Paint laufen (Banner, Consent-
              // Mode-Vorgaben vor gtag). Als synchrones externes Skript war es
              // die teuerste render-blockierende Anfrage der Seite — inline
              // kostet es nur noch seine Bytes. Kopie und Frische: lib/consentokRuntime.ts.
              //
              // Am Anfang des <body>, nicht im <head>: Die Runtime hängt das
              // Banner sofort ein, wenn es den Body schon gibt — im <head>
              // wartet sie auf DOMContentLoaded, also hinter der gesamten
              // Next-Hydration. Das Banner ist das LCP-Element; so kommt es
              // mit dem ersten Bild statt Sekunden später.
              <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: consentokInline }} />
            ) : (
              // Rückfall ohne Kopie im Speicher: extern über die eigene Domain
              // (rewrite in next.config.js), bewusst synchron — kein async/defer.
              // eslint-disable-next-line @next/next/no-sync-scripts
              <script src={`/consentok/cs.js?id=${encodeURIComponent(consentokId)}`} data-cfasync="false" />
            )
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
