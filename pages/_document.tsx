import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const consentokId = process.env.NEXT_PUBLIC_CONSENTOK_ID
    const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
    const locale = this.props.__NEXT_DATA__?.locale === 'en' ? 'en' : 'de'

    return (
      <Html lang={locale}>
        <Head>
          {consentokId ? (
            <>
              {/*
                cs.js 0.1.0 reads banner.notice.countries and aborts before
                mounting the dialog when a published config has no notice
                block. Fill that gap as the config object is assigned.
              */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(){var key='__consentok';try{Object.defineProperty(window,key,{configurable:true,set:function(cfg){if(cfg&&cfg.banner&&!cfg.banner.notice){cfg.banner.notice={countries:[]}}Object.defineProperty(window,key,{configurable:true,writable:true,value:cfg})}})}catch(e){}})();`,
                }}
              />
              {/* Consentok must run first so GCM defaults exist before gtag. */}
              {/* eslint-disable-next-line @next/next/no-sync-scripts */}
              <script
                src={`https://consentok.eu/cs.js?id=${encodeURIComponent(consentokId)}`}
                data-cfasync="false"
              />
            </>
          ) : null}

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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
