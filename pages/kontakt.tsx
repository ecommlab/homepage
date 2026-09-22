import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Container } from '../components/Container'
import { SiteHeader } from '../components/SiteHeader'
import { TurnstileWidget } from '../components/TurnstileWidget'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Kontakt() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string; captcha?: string }>({})
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'Kontakt', 'Contact')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Sie wollen ein neues Projekt starten, in unser Team kommen oder nur „Hi“ sagen? Wir freuen uns auf Ihre Nachricht.',
            'Want to start a new project, join our team, or just say hi? We look forward to your message.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SiteHeader />

        <main>
          <section className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(24,24,27,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.20),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.10),transparent_60%)]"
            />
            <Container>
              <div className="py-14 sm:py-18">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Kontakt', 'Contact')}
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                  {tr(
                    locale,
                    'Sie wollen ein neues Projekt starten, in unser Team kommen oder nur „Hi“ sagen?',
                    'Want to start a new project, join our team, or just say hi?',
                  )}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Wir freuen uns auf Ihre Nachricht.', 'We look forward to hearing from you.')}
                </p>
              </div>
            </Container>
          </section>

          <section className="py-14 sm:py-16">
            <Container>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Kontaktiere uns', 'Get in touch')}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {tr(
                      locale,
                      'Schreib uns kurz, worum es geht – wir melden uns zeitnah zurück.',
                      'Tell us briefly what it’s about — we’ll get back to you soon.',
                    )}
                  </p>

                  <form
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setStatus('sending')
                      setErrorMsg('')
                      setFieldErrors({})

                      const form = e.currentTarget
                      const fd = new FormData(form)
                      const payload = {
                        name: String(fd.get('name') ?? ''),
                        email: String(fd.get('email') ?? ''),
                        message: String(fd.get('message') ?? ''),
                        _hp: String(fd.get('_hp') ?? ''),
                        turnstileToken: captchaToken,
                      }

                      const nextErrors: typeof fieldErrors = {}
                      if (!payload.name.trim()) nextErrors.name = tr(locale, 'Pflichtfeld', 'Required')
                      if (!payload.email.trim()) nextErrors.email = tr(locale, 'Pflichtfeld', 'Required')
                      if (!payload.message.trim()) nextErrors.message = tr(locale, 'Pflichtfeld', 'Required')
                      if (!captchaToken) nextErrors.captcha = tr(locale, 'Bitte Captcha ausfüllen', 'Please complete the captcha')
                      if (Object.keys(nextErrors).length) {
                        setFieldErrors(nextErrors)
                        setErrorMsg(tr(locale, 'Bitte prüfen Sie die markierten Felder.', 'Please check the highlighted fields.'))
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
                          // non-JSON response (often HTML from proxy/redirect)
                        }

                        if (!r.ok || !json?.ok) {
                          const looksLikeHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')
                          const fallback = looksLikeHtml
                            ? tr(
                                locale,
                                'Server-Antwort war HTML (Proxy/Redirect). Bitte prüfe, ob `/api/contact` wirklich auf die Next.js-App zeigt.',
                                'Server returned HTML (proxy/redirect). Please verify `/api/contact` routes to the Next.js app.',
                              )
                            : raw.slice(0, 200)
                          throw new Error(json?.error || fallback || 'Request failed')
                        }
                        form.reset()
                        setCaptchaToken('')
                        setCaptchaKey((k) => k + 1)
                        setStatus('sent')
                      } catch (err) {
                        setStatus('error')
                        setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
                      }
                    }}
                  >
                    <input
                      name="_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                      defaultValue=""
                    />
                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'Name', 'Name')}
                      </span>
                      <input
                        name="name"
                        required
                        minLength={2}
                        aria-invalid={Boolean(fieldErrors.name)}
                        onInvalid={(e) => {
                          const el = e.currentTarget
                          if (el.validity.valueMissing) {
                            el.setCustomValidity(tr(locale, 'Bitte Name eingeben.', 'Please enter your name.'))
                          } else if (el.validity.tooShort) {
                            el.setCustomValidity(tr(locale, 'Bitte mindestens 2 Zeichen eingeben.', 'Please enter at least 2 characters.'))
                          } else {
                            el.setCustomValidity('')
                          }
                        }}
                        onInput={(e) => e.currentTarget.setCustomValidity('')}
                        className={[
                          'h-11 rounded-xl border bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                          fieldErrors.name ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                        ].join(' ')}
                        placeholder={tr(locale, 'Max Mustermann', 'Jane Doe')}
                      />
                      {fieldErrors.name ? (
                        <div className="text-xs font-semibold text-red-700 dark:text-red-300">{fieldErrors.name}</div>
                      ) : null}
                    </label>

                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'E-Mail', 'Email')}
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        aria-invalid={Boolean(fieldErrors.email)}
                        onInvalid={(e) => {
                          const el = e.currentTarget
                          if (el.validity.valueMissing) {
                            el.setCustomValidity(tr(locale, 'Bitte E-Mail eingeben.', 'Please enter your email address.'))
                          } else if (el.validity.typeMismatch) {
                            el.setCustomValidity(tr(locale, 'Bitte eine gültige E-Mail eingeben.', 'Please enter a valid email address.'))
                          } else {
                            el.setCustomValidity('')
                          }
                        }}
                        onInput={(e) => e.currentTarget.setCustomValidity('')}
                        className={[
                          'h-11 rounded-xl border bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                          fieldErrors.email ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                        ].join(' ')}
                        placeholder={tr(locale, 'name@firma.de', 'name@company.com')}
                      />
                      {fieldErrors.email ? (
                        <div className="text-xs font-semibold text-red-700 dark:text-red-300">{fieldErrors.email}</div>
                      ) : null}
                    </label>

                    <label className="grid gap-1 sm:col-span-2">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'Nachricht', 'Message')}
                      </span>
                      <textarea
                        name="message"
                        rows={6}
                        required
                        minLength={10}
                        aria-invalid={Boolean(fieldErrors.message)}
                        onInvalid={(e) => {
                          const el = e.currentTarget
                          if (el.validity.valueMissing) {
                            el.setCustomValidity(tr(locale, 'Bitte Nachricht eingeben.', 'Please enter a message.'))
                          } else if (el.validity.tooShort) {
                            el.setCustomValidity(tr(locale, 'Bitte mindestens 10 Zeichen eingeben.', 'Please enter at least 10 characters.'))
                          } else {
                            el.setCustomValidity('')
                          }
                        }}
                        onInput={(e) => e.currentTarget.setCustomValidity('')}
                        className={[
                          'rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                          fieldErrors.message ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                        ].join(' ')}
                        placeholder={tr(locale, 'Wobei können wir helfen?', 'How can we help?')}
                      />
                      {fieldErrors.message ? (
                        <div className="text-xs font-semibold text-red-700 dark:text-red-300">
                          {fieldErrors.message}
                        </div>
                      ) : null}
                    </label>

                    <div className="sm:col-span-2">
                      {siteKey ? (
                        <>
                          <TurnstileWidget
                            key={captchaKey}
                            siteKey={siteKey}
                            onToken={(t) => setCaptchaToken(t)}
                            className="mt-1"
                          />
                          {fieldErrors.captcha ? (
                            <div className="mt-2 text-xs font-semibold text-red-700 dark:text-red-300">
                              {fieldErrors.captcha}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {tr(
                            locale,
                            'Captcha ist noch nicht konfiguriert (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
                            'Captcha is not configured yet (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
                          )}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950"
                      >
                        {status === 'sending'
                          ? tr(locale, 'Sende…', 'Sending…')
                          : tr(locale, 'Senden', 'Send')}
                      </button>
                      {status === 'sent' ? (
                        <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                          {tr(
                            locale,
                            'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen zurück!',
                            'Thanks! We will get back to you as soon as possible.',
                          )}
                        </div>
                      ) : null}
                      {status === 'error' ? (
                        <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                          {tr(locale, 'Senden fehlgeschlagen:', 'Sending failed:')} {errorMsg}
                        </div>
                      ) : null}
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Direkter Kontakt', 'Direct contact')}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    E-Mail:{' '}
                    <a className="underline underline-offset-4 hover:no-underline" href="mailto:hello@ecommlab.io">
                      hello@ecommlab.io
                    </a>
                    <br />
                    Telefon: +49 89 41 61 62 48
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Link
                      className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                      href="/impressum"
                    >
                      {tr(locale, 'Impressum', 'Legal notice')}
                    </Link>
                    <Link
                      className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                      href="/datenschutzbestimmungen"
                    >
                      {tr(locale, 'Datenschutzbestimmungen', 'Privacy policy')}
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

