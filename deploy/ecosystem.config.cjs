/**
 * pm2-Konfiguration für die ecommlab Homepage (CloudPanel Site-User).
 *
 * Beschreibt AUSSCHLIESSLICH die App "ecommlab-prod". Pfade werden aus
 * dem Ort dieser Datei abgeleitet. Gestartet wird über den Symlink
 * /home/ecomde/htdocs/ecommlab.de/current; Node löst __dirname real auf,
 * cwd ist also das konkrete Release unter releases/<timestamp>-<sha>.
 */

const path = require('node:path')
const ROOT = path.resolve(__dirname, '..')

module.exports = {
  apps: [
    {
      name: 'ecommlab-prod',
      cwd: ROOT,
      // Wie der laufende Prozess vor dem Deploy: `pm2 start npm -- start -- -p 3000`.
      // startOrReload merkt sich sonst den alten `script: npm` und mischt neue Args
      // (ohne `--`) darüber — npm crasht dann mit "npm start [-- <args>]".
      script: 'npm',
      args: 'start -- -p 3000',
      exec_mode: 'fork',
      instances: 1,
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: '700M',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
}
