import Link from 'next/link'
import type { StartseiteInhalt } from '../../lib/startseiteInhalt'
import { EtikettFeld } from './EtikettFeld'
import { ConsentOkIcon, EcommlabLogo, PingbotIcon } from './Marken'

declare global {
  interface Window {
    consentok?: { showSettings?: () => void; renew?: () => void }
  }
}

/**
 * Fuß der Startseite: Tintenfeld mit Logo-Etikett (wie der Hero, 264 × 96 / 156 × 64).
 * Desktop (Board C2plus): 12er-Raster ab 136 px unter der Feldkante, 16 px / 1,7 · Adresse (4) · Kontakt (3) · Rechtliches (2) · Produkte (3).
 * Mobil (Board C2m): alles untereinander ab 92 px, 15 px / 1,6.
 * „Cookie-Einstellungen“ öffnet den Consentok-Dialog (consentok.renew()).
 * Zusatz gegenüber dem Board: Hell/Dunkel-Umschalter unter „Cookie-Einstellungen“.
 */
export function StartFuss({ t, thema, onThema }: { t: StartseiteInhalt; thema: 'light' | 'dark'; onThema: () => void }) {
  const f = t.fuss
  const linkKlasse = 'inline-flex min-h-[30px] items-center no-underline lg:min-h-0'
  return (
    <footer className="px-[16px] pb-[16px]">
      <EtikettFeld
        color="var(--c2-ink-field)"
        textColor="var(--c2-on-ink)"
        dark
        tab={{ h: 64, pl: 16, pr: 16 }}
        tabLg={{ h: 96, pl: 64, pr: 40 }}
        etikett={
          <Link href="/" aria-label={t.kopf.startseite} className="block" style={{ color: 'var(--c2-ink)' }}>
            <EcommlabLogo className="w-[124px] lg:w-[160px]" />
          </Link>
        }
      >
        <div className="flex flex-col px-[24px] pb-[28px] pt-[92px] text-[15px] leading-[1.6] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-[24px] lg:px-[64px] lg:pb-[64px] lg:pt-[136px] lg:text-[16px] lg:leading-[1.7]">
          <p className="m-0 lg:col-span-4">
            Ecommlab GmbH
            <br />
            Turnerstraße 15
            <br />
            81827 München
          </p>
          <p className="m-0 mt-[12px] flex flex-col items-start lg:col-span-3 lg:col-start-5 lg:mt-0">
            <a href="mailto:hello@ecommlab.io" className="no-underline">
              hello@ecommlab.io
            </a>
            <a href="tel:+498941616248" className="no-underline">
              +49 89 41 61 62 48
            </a>
          </p>
          <div className="mt-[24px] flex flex-col items-start lg:col-span-2 lg:col-start-8 lg:mt-0">
            <Link href="/impressum" className={linkKlasse}>
              {f.impressum}
            </Link>
            <Link href="/datenschutzbestimmungen" className={linkKlasse}>
              {f.datenschutz}
            </Link>
            <Link href="/nutzungsbedingungen" className={linkKlasse}>
              {f.agb}
            </Link>
            <button
              type="button"
              onClick={() => {
                const api = window.consentok
                if (api?.showSettings) api.showSettings()
                else api?.renew?.()
              }}
              className="inline-flex min-h-[30px] items-center border-0 bg-transparent p-0 text-left lg:min-h-0"
              style={{ color: 'inherit', font: 'inherit' }}
            >
              {f.cookies}
            </button>
            <button
              type="button"
              onClick={onThema}
              className="inline-flex min-h-[30px] items-center border-0 bg-transparent p-0 text-left lg:min-h-0"
              style={{ color: 'inherit', font: 'inherit' }}
            >
              {thema === 'dark' ? f.hell : f.dunkel}
            </button>
          </div>
          <div className="mt-[24px] flex flex-col gap-[4px] lg:col-span-3 lg:col-start-10 lg:mt-0 lg:gap-0">
            <p className="m-0 text-[13px] font-semibold leading-[20px] lg:text-[14px] lg:leading-[27px]" style={{ color: 'var(--c2-muted-on-ink)' }}>
              {f.produkte}
            </p>
            <div className="flex items-center gap-[20px] lg:-mt-[8px]">
              <a href="https://pingbot.eu" className="inline-flex min-h-[44px] items-center gap-[8px] text-[16px] font-bold leading-none no-underline">
                <PingbotIcon />
                <span>Pingbot</span>
              </a>
              <a href="https://consentok.eu" className="inline-flex min-h-[44px] items-center gap-[8px] text-[16px] font-bold leading-none no-underline">
                <ConsentOkIcon />
                <span>ConsentOK</span>
              </a>
            </div>
          </div>
        </div>
      </EtikettFeld>
    </footer>
  )
}
