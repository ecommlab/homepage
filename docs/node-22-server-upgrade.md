# Server-Upgrade auf Node 22 (ecommlab-cloud)

Kontext: Node 20 ist seit den Security-Releases vom 21.10.2026 EOL und erhält
keine Patches mehr (u. a. Brotli-RCE CVE-2026-111497, TLS-Bypässe). Das Repo
ist bereits umgestellt (engines `>=22.0.0`, `.nvmrc` = 22, Dockerfile
`node:22-bookworm-slim`). Dieser Leitfaden hebt den Produktionsserver an.

Zielsystem: `ecomde@91.98.93.10` (CloudPanel), Site `/home/ecomde/htdocs/ecommlab.de`,
App `ecommlab-prod` via pm2 + nvm, Port 3000.

## Wichtig vorab

- pm2 ist bei nvm **pro Node-Version** global installiert
  (`~/.nvm/versions/node/vXX/lib/node_modules/pm2`). Beim Versionswechsel muss
  pm2 unter Node 22 mitinstalliert werden — `--reinstall-packages-from`
  erledigt das.
- Der pm2-Daemon läuft bis zum Neustart weiter unter Node 20. `pm2 kill` +
  `pm2 resurrect` startet ihn unter Node 22 neu und stoppt dabei **alle
  pm2-Apps dieses Users für einige Sekunden** (auch die Fremddienste, die
  deploy.sh überwacht). Zeitfenster entsprechend wählen.

## Schritte (als ecomde auf dem Server)

```bash
# 1. Bestandsaufnahme
nvm ls
node -v            # erwartet: v20.x
pm2 ls

# 2. Node 22.23.4 installieren, globale Pakete (pm2) mitnehmen
nvm install 22.23.4 --reinstall-packages-from=default

# 3. Default-Alias umstellen (nicht-interaktive SSH-Shells, deploy.sh)
nvm alias default 22.23.4
nvm use default
node -v            # erwartet: v22.23.4
command -v pm2     # erwartet: ~/.nvm/versions/node/v22.23.4/bin/pm2

# 4. pm2-Daemon unter Node 22 neu starten (kurze Downtime aller pm2-Apps!)
pm2 save
pm2 kill
pm2 resurrect
pm2 ls             # alle Apps wieder online?

# 5. Healthcheck Homepage
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/   # erwartet: 200
```

## Danach

1. Frisches Deploy auslösen (GitHub Actions „Deploy“ oder lokal
   `./scripts/deploy.sh`), damit das Release mit Node 22 gebaut wird
   (`npm ci` baut native Abhängigkeiten wie `sharp` neu).
2. Wenn alles stabil läuft: `nvm uninstall 20` (erst nach einigen Tagen,
   falls Rollback nötig).

## Rollback

```bash
nvm alias default 20   # bzw. die konkrete 20.x-Version aus `nvm ls`
nvm use default
pm2 kill && pm2 resurrect
```
