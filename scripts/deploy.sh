#!/usr/bin/env bash
#
# Release-basierter Deploy der ecommlab Homepage auf den CloudPanel-Host.
#
#   ./scripts/deploy.sh [ssh-host]            # Deploy (Default: ecomde@91.98.93.10)
#   ./scripts/deploy.sh rollback [ssh-host]   # zurück auf das vorherige Release
#
# Layout auf dem Server (BASE = /home/ecomde/htdocs/ecommlab.de):
#   BASE/releases/<timestamp>-<sha>/   je Deploy ein vollständiger Build
#   BASE/shared/.env.production        Runtime-/Build-Env, wird in jedes Release kopiert
#                                      (kein Symlink: next build bündelt sonst die Datei
#                                      außerhalb des Projekts und bricht ab)
#   BASE/current -> releases/<…>       aktives Release (pm2 läuft von hier)
#
# Ablauf: Sync in neues Release → npm ci + next build → Smoke-Test auf
# SMOKE_PORT → Symlink atomar umschalten → pm2 neu starten → Healthcheck
# (bei Fehler automatischer Rollback) → alte Releases aufräumen.
# Schlägt Build oder Smoke-Test fehl, bleibt das Live-Release unberührt.
#
set -euo pipefail

MODE="deploy"
if [ "${1:-}" = "rollback" ]; then MODE="rollback"; shift; fi

HOST="${1:-ecomde@91.98.93.10}"
APP="ecommlab-prod"
BASE="${ECOMMLAB_REMOTE_DIR:-/home/ecomde/htdocs/ecommlab.de}"
PORT="3000"
SMOKE_PORT="${SMOKE_PORT:-3100}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
SKIP_VERIFY="${SKIP_VERIFY:-0}"

RELEASES="${BASE}/releases"
SHARED="${BASE}/shared"
CURRENT="${BASE}/current"

# Remote-Kommando MIT nvm-Umgebung: node/npm/pm2 liegen unter ~/.nvm und
# stehen in nicht-interaktiven SSH-Shells sonst nicht im PATH.
NVM_PRELUDE='export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null;'
rsh() { ssh "$HOST" "${NVM_PRELUDE} $*"; }

step() { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
ok()   { printf '  \033[0;32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[0;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\n\033[0;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

pm2_others() {
  rsh "pm2 jlist" | node -e '
    let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
      const others=JSON.parse(d).filter(p=>p.name!=="'"$APP"'")
        .map(p=>`${p.name}:${p.pid}:${p.pm2_env.status}`).sort();
      console.log(others.join("\n"));
    });'
}

# Symlink atomar umsetzen (ln + mv -T = rename(2)) und pm2 aus dem Release starten.
# --only ist zwingend: ohne Eingrenzung behandelt start die Ecosystem-Datei
# als Soll-Zustand des GESAMTEN pm2-Bestands dieses Users.
# delete + start statt startOrReload: Reload merkt sich script/interpreter der
# alten App und mischt nur Args — das hat den Prozess totgelegt.
activate() {
  local rel="$1"
  rsh "ln -sfn '${RELEASES}/${rel}' '${CURRENT}.tmp' && mv -Tf '${CURRENT}.tmp' '${CURRENT}' \
    && cd '${CURRENT}' && (pm2 delete ${APP} >/dev/null 2>&1 || true) \
    && pm2 start deploy/ecosystem.config.cjs --only ${APP} --update-env >/dev/null"
}

healthcheck() {
  local code=""
  for _ in $(seq 1 20); do
    code=$(ssh "$HOST" "curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:${PORT}/" 2>/dev/null || true)
    [ "$code" = "200" ] && { echo "$code"; return 0; }
    sleep 2
  done
  echo "${code:-none}"; return 1
}

current_release() { rsh "[ -L '${CURRENT}' ] && basename \"\$(readlink -f '${CURRENT}')\" || true"; }

# ─────────────────────────────────────────────────────────────── Rollback
if [ "$MODE" = "rollback" ]; then
  step "Rollback auf ${HOST}"
  CUR=$(current_release)
  [ -n "$CUR" ] || die "Kein aktives Release (${CURRENT}) gefunden."
  PREV=$(rsh "ls -1 '${RELEASES}' | sort | grep -B1 -x '${CUR}' | head -n1")
  [ -n "$PREV" ] && [ "$PREV" != "$CUR" ] || die "Kein Release vor ${CUR} vorhanden."
  activate "$PREV"
  CODE=$(healthcheck) || die "Rollback auf ${PREV}: App antwortet nicht (Status ${CODE})."
  rsh "pm2 save >/dev/null"
  ok "Aktiv: ${PREV} (vorher ${CUR}), HTTP ${CODE}"
  exit 0
fi

# ─────────────────────────────────────────────────────────────── Deploy
if [ "$SKIP_VERIFY" = "1" ]; then
  step "Lint-Gate übersprungen (SKIP_VERIFY=1)"
else
  step "Lokaler Lint"
  npm run lint >/dev/null || die "Lint rot — Deploy abgebrochen."
  ok "Lint grün"
fi

SHA=$(git rev-parse --short=12 HEAD 2>/dev/null || echo manual)
REL="$(date -u +%Y%m%d%H%M%S)-${SHA}"

step "Voraussetzungen auf ${HOST}"
MISSING=$(rsh 'for c in node npm pm2 rsync curl; do command -v $c >/dev/null || echo $c; done')
[ -z "$MISSING" ] || die "Auf ${HOST} fehlen: $(echo "$MISSING" | tr "\n" " ")"
ok "node/npm/pm2/rsync/curl vorhanden"

step "Bestandsaufnahme pm2 auf ${HOST}"
BEFORE=$(pm2_others)
echo "$BEFORE" | sed 's/^/  · /'
ok "$(echo "$BEFORE" | grep -c . || true) Fremddienste erfasst (bleiben unberührt)"

step "Release-Struktur & shared/.env.production"
# Einmalige Migration: die bisher im Site-Root liegende .env.production übernehmen.
rsh "mkdir -p '${RELEASES}' '${SHARED}' \
  && { [ -f '${SHARED}/.env.production' ] || { [ -f '${BASE}/.env.production' ] && cp -p '${BASE}/.env.production' '${SHARED}/.env.production' && echo migrated; } || true; }"
rsh "test -f '${SHARED}/.env.production'" || die "${SHARED}/.env.production fehlt — bitte auf dem Server anlegen."
ok "shared/.env.production vorhanden"

step "Übertrage Quellcode → releases/${REL}"
PREV_REAL=$(rsh "[ -d '${CURRENT}' ] && readlink -f '${CURRENT}' || true")
LINK_DEST=()
[ -n "$PREV_REAL" ] && LINK_DEST=(--link-dest="$PREV_REAL")   # unveränderte Dateien als Hardlink
rsync -az ${LINK_DEST[@]+"${LINK_DEST[@]}"} \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude '.idea/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude '.pids/' \
  --exclude '.env*' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude 'docs/' \
  ./ "${HOST}:${RELEASES}/${REL}/"
rsh "cp -p '${SHARED}/.env.production' '${RELEASES}/${REL}/.env.production'"
ok "Dateien synchronisiert (keine .env* aus dem Repo)"

# Ab hier: bei Fehlern das halbfertige Release entfernen, Live bleibt unberührt.
cleanup_failed() { rsh "rm -rf '${RELEASES}/${REL}'" || true; }
fail() { cleanup_failed; die "$*"; }

step "npm ci (Release ${REL})"
rsh "cd '${RELEASES}/${REL}' && npm ci --no-audit --no-fund --prefer-offline --loglevel=error" \
  || fail "npm ci fehlgeschlagen — Live unverändert."
ok "Abhängigkeiten installiert"

step "Production-Build (next build)"
rsh "cd '${RELEASES}/${REL}' && npm run build" || fail "next build fehlgeschlagen — Live unverändert."
rsh "test -d '${RELEASES}/${REL}/.next'" || fail "Build-Artefakt fehlt (.next) — Live unverändert."
ok "Build fertig"

step "Smoke-Test auf 127.0.0.1:${SMOKE_PORT}"
rsh "cd '${RELEASES}/${REL}' \
  && ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:${SMOKE_PORT}/ \
  && { NODE_ENV=production nohup ./node_modules/.bin/next start -p ${SMOKE_PORT} >/tmp/${APP}-smoke.log 2>&1 & PID=\$!; \
       CODE=; for i in \$(seq 1 20); do CODE=\$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:${SMOKE_PORT}/ || true); [ \"\$CODE\" = 200 ] && break; sleep 1; done; \
       kill \$PID 2>/dev/null; wait \$PID 2>/dev/null; [ \"\$CODE\" = 200 ]; }" \
  || fail "Smoke-Test fehlgeschlagen (Port ${SMOKE_PORT} belegt oder App antwortet nicht; /tmp/${APP}-smoke.log) — Live unverändert."
ok "Neues Release antwortet mit HTTP 200"

step "Live schalten: current → releases/${REL}"
PREV=$(current_release)
if ! activate "$REL"; then
  [ -n "$PREV" ] && activate "$PREV" && rsh "pm2 save >/dev/null"
  die "pm2 start fehlgeschlagen — zurück auf ${PREV:-<keins>}."
fi
if CODE=$(healthcheck); then
  ok "HTTP ${CODE} auf 127.0.0.1:${PORT}"
else
  warn "Healthcheck rot (Status ${CODE})"
  if [ -n "$PREV" ]; then
    activate "$PREV" && rsh "pm2 save >/dev/null"
    RB=$(healthcheck) || die "Rollback auf ${PREV} ebenfalls rot (Status ${RB}) — sofort prüfen: pm2 logs ${APP}"
    die "Automatischer Rollback auf ${PREV} (HTTP ${RB}); Release ${REL} bleibt zur Analyse liegen (pm2 logs ${APP})."
  fi
  die "App antwortet nicht und es gibt kein vorheriges Release."
fi
rsh "pm2 save >/dev/null" && ok "pm2-Prozessliste gespeichert (überlebt Reboot)"

step "Nachbardienste unverändert?"
AFTER=$(pm2_others)
if [ "$BEFORE" = "$AFTER" ]; then
  ok "Alle Fremddienste mit identischer PID/Status weiterhin online"
else
  printf '\n\033[1;31m✗ ACHTUNG: Zustand fremder pm2-Dienste hat sich geändert!\033[0m\n' >&2
  diff <(echo "$BEFORE") <(echo "$AFTER") | sed 's/^/    /' >&2 || true
  BROKEN=$(comm -13 <(echo "$AFTER" | grep -o '^[^:]*:.*:online' | cut -d: -f1 | sort) \
                    <(echo "$BEFORE" | grep -o '^[^:]*:.*:online' | cut -d: -f1 | sort) || true)
  if [ -n "$BROKEN" ]; then
    printf '\033[1;31m  Nicht mehr online: %s\033[0m\n' "$(echo "$BROKEN" | tr '\n' ' ')" >&2
    die "Deploy hat fremde Dienste beeinträchtigt."
  fi
  warn "Änderung ohne Verschlechterung (keine Aktion nötig)."
fi

step "Alte Releases aufräumen (behalte ${KEEP_RELEASES})"
rsh "cd '${RELEASES}' && ACTIVE=\$(basename \"\$(readlink -f '${CURRENT}')\") \
  && ls -1 | sort | head -n -${KEEP_RELEASES} | grep -vx \"\$ACTIVE\" | xargs -r rm -rf"
ok "Erledigt"

printf '\n\033[1;32m✔ Deploy abgeschlossen\033[0m — Release %s, App "%s" auf %s, Port %s\n' "$REL" "$APP" "$HOST" "$PORT"
printf '   Rollback: ./scripts/deploy.sh rollback %s\n' "$HOST"
