http://localhost:3000/en/referenzen/newoneThis is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Sprachen

Deutsch (Standard, ohne Präfix), Englisch (`/en`) und Bulgarisch (`/bg`) – `next.config.js → i18n`, Kern in `lib/i18n.ts`.

- Jede Textstelle trägt alle drei Fassungen: `{ de, en, bg }` in `lib/*.ts`, `tr(locale, de, en, bg)` in Seiten. Fehlt eine, scheitert `npx tsc --noEmit`.
- Startseite: ein Block je Sprache in `lib/startseiteInhalt.ts`.
- Umschalter „DE · EN · BG“: `components/c2/Sprachwahl.tsx` (Kopf, Unterseiten, Mobilmenü).
- Neue Sprache: `appLocales` + `sprachen` in `lib/i18n.ts`, `locales` in `next.config.js`, Texte ergänzen (der Typcheck zeigt jede Lücke), `public/sitemap.xml`.
- Bulgarisch: Kundenansprache «Вие», Karriere «ти». Titelzeilen (`…Zeilen`) und Listentitel sind am Desktop einzeilig (`whitespace-nowrap`) und auf deutsche Wortlängen bemessen – Kyrillisch läuft rund ein Viertel breiter. Zu lange Zeilen ragen dann in die Nachbarspalte oder unter das Formular, ohne dass etwas scrollt. Nach Textänderungen jede betroffene Seite bei 1024, 1440 und 360 px ansehen.
- Die kyrillische Schriftdatei wird nur auf `/bg` vorgeladen (`lib/kyrillischeSchrift.ts`).

## Strukturierte Daten (JSON-LD)

Jede Seite trägt in jeder Sprache einen schema.org-Graph – erzeugt in `lib/strukturierteDaten.ts`, ausgegeben in `pages/_document.tsx`.

- Immer: `Organization` (Angaben wie im Impressum) und `WebSite`; dazu Seitenknoten und `BreadcrumbList`.
- Startseite zusätzlich `FAQPage` aus `lib/startseiteInhalt.ts`, Leistungen `Service`, Referenzen `CreativeWork`, Team `Person`, Übersichten `ItemList`.
- Alle Texte kommen aus denselben Inhaltsdateien wie die Anzeige – JSON-LD darf nichts behaupten, was nicht auf der Seite steht.
- Bewusst kein `JobPosting`: Dafür fehlen Arbeitsort und Veröffentlichungsdatum in `lib/jobs.ts`.
- Nicht in `_app` verlegen: Dort landen die Inhaltsdateien im JavaScript jeder Seite.
- Neue Seite: Pfad in `seiteFuer()` ergänzen, sonst bekommt sie nur Organisation und Website.
- Absolute URLs aus `NEXT_PUBLIC_SITE_URL` (Rückfall `https://ecommlab.io`).

## Deployment

Default target is **ecommlab-cloud** (Hetzner CloudPanel, User `ecomde`). GCP is a standby option.

- Push to `main` → deploy to ecommlab-cloud (same Secrets as mydev.ai)
- Or Actions → **Deploy** → choose `ecommlab-cloud` / `gcloud`

Secrets: `ECOMMLAB_SSH_KEY`, `ECOMMLAB_KNOWN_HOSTS` — see [deploy/README.md](deploy/README.md).
GCP details: [docs/deployment-gcp.md](docs/deployment-gcp.md).

## Environment variables

Create a `.env.local` (recommended for secrets) or use `.env.development` / `.env.production`.
On GCP, runtime secrets live in Secret Manager (not in the image).

### Consentok + Google Analytics 4

- `NEXT_PUBLIC_SITE_URL`: Public base URL (e.g. `https://ecommlab.io`) for canonical/hreflang links and JSON-LD
- `NEXT_PUBLIC_CONSENTOK_ID`: Consentok site key
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`: GA4 Measurement ID (e.g. `G-XXXXXXXXXX`)

Consentok loads first and drives Google Consent Mode. The GA4 gtag (`G-NSFVWJ2Z14`) is marked `data-cookieconsent="statistics"` so Consentok only activates it after statistics consent.

### Contact form (SMTP + Turnstile)

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Server scripts (dev/prod start/stop)

On the server, from the project folder:

```bash
chmod +x scripts/server-start.sh scripts/server-stop.sh

# start dev (default port 3001; always without PM2)
./scripts/server-start.sh dev

# start prod (default port 3000; runs build before start; uses PM2 if available)
./scripts/server-start.sh prod

# stop dev/prod
./scripts/server-stop.sh dev
./scripts/server-stop.sh prod
```

Optional overrides:

- `PORT_DEV=3005 ./scripts/server-start.sh dev`
- `PORT_PROD=3002 ./scripts/server-start.sh prod`
