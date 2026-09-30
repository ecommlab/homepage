import { useState } from 'react'
import { TurnstileWidget } from '../TurnstileWidget'
import type { StartseiteInhalt } from '../../lib/startseiteInhalt'

/**
 * Kontaktkarte der Startseite (Board C2plus rechts neben „Mehr Umsatz …“, Board C2m unter dem Text).
 *
 * LOGIK 1:1 aus der bisherigen EcommlabPage.tsx übernommen – NICHT verändern:
 *   POST /api/contact  { name, email, message, _hp, turnstileToken }, Honeypot „_hp“, Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY),
 *   Pflichtfeld-/Längenprüfung, Fehlermeldung bei HTML-Antwort, Reset + neues Captcha nach Erfolg.
 * Nur das Aussehen ist neu:
 *   Desktop: Karte p 40 / Radius 32 / surface · Titel 32/1,1 700 · Name + E-Mail zweispaltig (Abstand 16) ·
 *            Felder 56 hoch, Pille, Rand 2 px Tinte · Nachricht 152 hoch, Radius 24 · Button 56 hoch, links.
 *   Mobil:   Karte p 24/20 / Radius 24 · Titel 30/1,06 800 · Felder untereinander, 52 hoch, Radius 16 ·
 *            Nachricht min. 140 hoch · Button 52 hoch, volle Breite.
 */
type Fehler = { name?: string; email?: string; message?: string; captcha?: string }

const feldKlasse =
  'block h-[52px] w-full rounded-[16px] border-2 px-[16px] text-[17px] font-normal leading-none outline-none lg:h-[56px] lg:rounded-full lg:px-[20px]'
const labelKlasse = 'text-[14px] font-semibold leading-none lg:text-[15px] lg:leading-[20px]'
const fehlerText = 'text-[14px] font-semibold text-[#9E2320] dark:text-[#F0A39A]'

const KARTE_START = 'mt-[32px] flex flex-col rounded-[24px] bg-[color:var(--c2-surface)] px-[20px] py-[24px] lg:col-span-6 lg:col-start-7 lg:mt-0 lg:rounded-[32px] lg:p-[40px]'

export function Kontaktformular({
  t,
  className = KARTE_START,
  titelAls: Titel = 'h3',
}: {
  t: StartseiteInhalt['kontakt']
  /** Klassen der Karte (Standard: Startseite). Kontaktseite: mobil Rand + raised, Desktop wie Startseite. */
  className?: string
  /** Überschrift der Karte: h3 (Startseite, unter „Mehr Umsatz …“) oder h2 (Kontaktseite) */
  titelAls?: 'h2' | 'h3'
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [fehler, setFehler] = useState<string>('')
  const [feldFehler, setFeldFehler] = useState<Fehler>({})
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  const rand = (f?: string) => ({
    borderColor: f ? '#9E2320' : 'var(--c2-ink)',
    background: 'var(--c2-surface)',
    color: 'var(--c2-ink)',
  })

  return (
    <div className={className}>
      <Titel
        id="c2-form-titel"
        className="m-0 text-balance text-[30px] font-extrabold leading-[1.06] tracking-[-0.025em] [font-variation-settings:'SHRP'_100] lg:text-[32px] lg:font-bold lg:leading-[1.1] lg:tracking-[-0.015em] lg:[font-variation-settings:'SHRP'_50]"
      >
        {t.formTitel}
      </Titel>
      <p className="m-0 mt-[12px] text-pretty text-[17px] leading-[1.55] lg:text-[18px] lg:leading-[1.5]">{t.formText}</p>

      <form
        aria-labelledby="c2-form-titel"
        className="mt-[24px] flex flex-col gap-[16px] lg:gap-0"
        onSubmit={async (e) => {
          e.preventDefault()
          setStatus('sending')
          setFehler('')
          setFeldFehler({})

          const form = e.currentTarget
          const fd = new FormData(form)
          const payload = {
            name: String(fd.get('name') ?? ''),
            email: String(fd.get('email') ?? ''),
            message: String(fd.get('message') ?? ''),
            _hp: String(fd.get('_hp') ?? ''),
            turnstileToken: captchaToken,
          }

          const next: Fehler = {}
          if (!payload.name.trim()) next.name = t.pflichtfeld
          if (!payload.email.trim()) next.email = t.pflichtfeld
          if (!payload.message.trim()) next.message = t.pflichtfeld
          if (!captchaToken) next.captcha = t.captchaFehlt
          if (Object.keys(next).length) {
            setFeldFehler(next)
            setFehler(t.felderPruefen)
            setStatus('error')
            return
          }

          try {
            const r = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
            const raw = await r.text()
            let json: { ok?: boolean; error?: string } | null = null
            try {
              json = raw ? (JSON.parse(raw) as { ok?: boolean; error?: string }) : null
            } catch {
              // keine JSON-Antwort (oft HTML von Proxy/Redirect)
            }
            if (!r.ok || !json?.ok) {
              const looksLikeHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')
              const fallback = looksLikeHtml ? t.htmlAntwort : raw.slice(0, 200)
              throw new Error(json?.error || fallback || 'Request failed')
            }
            form.reset()
            setCaptchaToken('')
            setCaptchaKey((k) => k + 1)
            setStatus('sent')
          } catch (err) {
            setStatus('error')
            setFehler(err instanceof Error ? err.message : 'Unknown error')
          }
        }}
      >
        <input name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" defaultValue="" />

        <div className="flex flex-col gap-[16px] lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="c2-name" className={labelKlasse}>
              {t.name}
            </label>
            <input
              id="c2-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              aria-invalid={Boolean(feldFehler.name)}
              aria-describedby={feldFehler.name ? 'c2-name-fehler' : undefined}
              onInvalid={(e) => {
                const el = e.currentTarget
                if (el.validity.valueMissing) el.setCustomValidity(t.nameFehlt)
                else if (el.validity.tooShort) el.setCustomValidity(t.nameKurz)
                else el.setCustomValidity('')
              }}
              onInput={(e) => e.currentTarget.setCustomValidity('')}
              placeholder={t.phName}
              className={feldKlasse}
              style={rand(feldFehler.name)}
            />
            {feldFehler.name ? (
              <p id="c2-name-fehler" className={`m-0 ${fehlerText}`}>
                {feldFehler.name}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="c2-email" className={labelKlasse}>
              {t.email}
            </label>
            <input
              id="c2-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(feldFehler.email)}
              aria-describedby={feldFehler.email ? 'c2-email-fehler' : undefined}
              onInvalid={(e) => {
                const el = e.currentTarget
                if (el.validity.valueMissing) el.setCustomValidity(t.emailFehlt)
                else if (el.validity.typeMismatch) el.setCustomValidity(t.emailUngueltig)
                else el.setCustomValidity('')
              }}
              onInput={(e) => e.currentTarget.setCustomValidity('')}
              placeholder={t.phEmail}
              className={feldKlasse}
              style={rand(feldFehler.email)}
            />
            {feldFehler.email ? (
              <p id="c2-email-fehler" className={`m-0 ${fehlerText}`}>
                {feldFehler.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-[8px] lg:mt-[20px]">
          <label htmlFor="c2-nachricht" className={labelKlasse}>
            {t.nachricht}
          </label>
          <textarea
            id="c2-nachricht"
            name="message"
            rows={5}
            required
            minLength={10}
            aria-invalid={Boolean(feldFehler.message)}
            aria-describedby={feldFehler.message ? 'c2-nachricht-fehler' : undefined}
            onInvalid={(e) => {
              const el = e.currentTarget
              if (el.validity.valueMissing) el.setCustomValidity(t.nachrichtFehlt)
              else if (el.validity.tooShort) el.setCustomValidity(t.nachrichtKurz)
              else el.setCustomValidity('')
            }}
            onInput={(e) => e.currentTarget.setCustomValidity('')}
            placeholder={t.phNachricht}
            className="block min-h-[140px] w-full resize-y rounded-[16px] border-2 px-[16px] py-[14px] text-[17px] font-normal leading-[1.5] outline-none lg:h-[152px] lg:min-h-0 lg:resize-none lg:rounded-[24px] lg:px-[20px] lg:py-[16px]"
            style={rand(feldFehler.message)}
          />
          {feldFehler.message ? (
            <p id="c2-nachricht-fehler" className={`m-0 ${fehlerText}`}>
              {feldFehler.message}
            </p>
          ) : null}
        </div>

        <div className="lg:mt-[20px]">
          {siteKey ? (
            <>
              <TurnstileWidget key={captchaKey} siteKey={siteKey} onToken={(tok) => setCaptchaToken(tok)} />
              {feldFehler.captcha ? <p className={`m-0 mt-[8px] ${fehlerText}`}>{feldFehler.captcha}</p> : null}
            </>
          ) : (
            <p className="m-0 text-[13px] leading-[1.4]" style={{ color: 'var(--c2-muted)' }}>
              {t.captchaNichtKonfiguriert}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="c2-pill-ink mt-[8px] inline-flex h-[52px] w-full items-center justify-center rounded-full border-0 px-[24px] text-[17px] font-semibold leading-none disabled:opacity-60 lg:mt-[24px] lg:h-[56px] lg:w-auto lg:self-start lg:px-[28px]"
          style={{ fontFamily: 'inherit' }}
        >
          {status === 'sending' ? t.sendet : t.senden}
        </button>

        <div aria-live="polite">
          {status === 'sent' ? (
            <p className="m-0 mt-[16px] rounded-[16px] bg-[#DCEFE2] px-[16px] py-[12px] text-[15px] leading-[1.5] text-[#1B6E3A] dark:bg-[#15301F] dark:text-[#9FD8B0]">{t.danke}</p>
          ) : null}
          {status === 'error' ? (
            <p className="m-0 mt-[16px] rounded-[16px] bg-[#F8DEDC] px-[16px] py-[12px] text-[15px] leading-[1.5] text-[#9E2320] dark:bg-[#3A1715] dark:text-[#F0A39A]">
              {t.fehlgeschlagen} {fehler}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}
