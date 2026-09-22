# Deploy auf CloudPanel (ecommlab-cloud)

> Standard-Ziel: Hetzner `91.98.93.10`, Site-User `ecomde`,
> Pfad `/home/ecomde/htdocs/ecommlab.de`. nginx proxied `ecommlab.de` und
> `ecommlab.io` auf `127.0.0.1:3000`. GCP bleibt Standby:
> [../docs/deployment-gcp.md](../docs/deployment-gcp.md).

## Deploy

Automatisch bei jedem Push auf `main` (Ziel `ecommlab-cloud`)
oder manuell: Actions → *Deploy* → *Run workflow* → Ziel wählen.

Lokal:

```bash
./scripts/deploy.sh ecomde@91.98.93.10
```

### Ablauf (Release-basiert)

```
/home/ecomde/htdocs/ecommlab.de/
├── releases/<timestamp>-<sha>/   ein vollständiger Build pro Deploy
├── shared/.env.production        wird in jedes Release kopiert (nicht im Repo)
└── current -> releases/<…>       aktives Release, pm2 startet von hier
```

1. Sync in ein **neues** Release (`rsync --link-dest` auf das aktive → nur Änderungen werden übertragen). Alle `.env*` aus dem Repo sind ausgeschlossen.
2. `npm ci` + `next build` im neuen Release — Live läuft unverändert weiter.
3. Smoke-Test: neues Release kurz auf `127.0.0.1:3100` starten, HTTP 200 erwartet (`SMOKE_PORT` überschreibbar).
4. `current` atomar umschalten, pm2 neu starten, Healthcheck auf Port 3000.
5. Healthcheck rot → automatischer Rollback auf das vorherige Release.
6. Alte Releases aufräumen (`KEEP_RELEASES`, Default 5).

Schlägt 2. oder 3. fehl, wird das halbfertige Release gelöscht; Live bleibt unberührt.

**Rollback** (manuell, auf das vorherige Release):

```bash
./scripts/deploy.sh rollback ecomde@91.98.93.10
```

**Migration:** Beim ersten Deploy wird `ecommlab.de/.env.production` nach
`shared/.env.production` kopiert. Der alte Code im Site-Root wird danach nicht
mehr genutzt und kann manuell entfernt werden (`releases/`, `shared/`,
`current` behalten).

> Der Symlink-Ansatz für `.env.production` funktioniert nicht: `next build`
> nimmt die Env-Datei in den Webpack-Graph auf und bricht bei einem Ziel
> außerhalb des Projektordners mit *Module parse failed* ab.

### Repository-Secrets (identisch zu mydev.ai)

| Secret | Inhalt |
|---|---|
| `ECOMMLAB_SSH_KEY` | Privater Deploy-Schlüssel (ed25519, ohne Passphrase) |
| `ECOMMLAB_KNOWN_HOSTS` | `91.98.93.10 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH3zZl4eHDwbpn0i3zE20hKUbaSy37ddMOeDFGC3d9hh` |

Unter *Settings → Secrets and variables → Actions* dieselben Werte wie im
mydev.ai-Repo eintragen. **Wichtig:** `ECOMMLAB_KNOWN_HOSTS` muss die neue IP
`91.98.93.10` enthalten, nicht mehr `49.12.194.37`.

Solange `ECOMMLAB_SSH_KEY` fehlt, überspringt der Workflow den Deploy sichtbar.

Der öffentliche Schlüssel muss in `/home/ecomde/.ssh/authorized_keys` stehen
(derselbe wie bei `/home/mydev/.ssh/authorized_keys`).

## Betrieb

| Aufgabe | Befehl |
|---|---|
| Status | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 show ecommlab-prod"'` |
| Logs | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 logs ecommlab-prod --lines 100"'` |
| Neustart | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 restart ecommlab-prod"'` |
| Update | `./scripts/deploy.sh ecomde@91.98.93.10` |
