import type { GetStaticProps } from 'next'

/**
 * Statische Seiten mit Verfallsdatum (ISR): Das HTML bleibt vorgerendert und
 * wird spätestens alle fünf Minuten im Hintergrund neu erzeugt.
 *
 * Warum: pages/_document.tsx bettet die ConsentOK-Runtime samt Banner-
 * Konfiguration ins HTML ein (lib/consentokRuntime.ts). Ohne Verfallsdatum
 * entsteht dieses HTML einmal beim Build — eine im ConsentOK-Dashboard
 * veröffentlichte Banner-Änderung käme dann erst mit dem nächsten Deploy an.
 * Fünf Minuten entsprechen der Cache-Dauer der Proxy-Route /consentok/cs.js,
 * also der bisherigen Zusage.
 *
 * Einbinden:  export { isrStaticProps as getStaticProps } from '../lib/isr'
 * Seiten mit eigenem getStaticProps setzen `revalidate: ISR_SEKUNDEN` selbst.
 */
export const ISR_SEKUNDEN = 300

export const isrStaticProps: GetStaticProps = async () => ({ props: {}, revalidate: ISR_SEKUNDEN })
