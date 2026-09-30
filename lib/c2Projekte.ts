/**
 * Bilder der Referenzen im C2-Design (Kacheln, Keyfacts-Bild, Zusatzbilder) – ergänzt lib/portfolio.ts / lib/portfolioCases.ts.
 * Kachelbild: wie auf der Startseite (Bär Schuhe nutzt baer-schuhe.png statt baer-header.png).
 * Pfundskerl: Motiv enthält eingebrannte Badges → `crop` (Bild 142,86 % breit, nach oben versetzt).
 * Alt-Texte beschreiben das Motiv (Boards), nicht nur den Projektnamen.
 */
export type C2Bild = { src: string; alt: { de: string; en: string }; pos?: string; crop?: boolean }

export const c2Kachel: Record<string, C2Bild> = {
  newone: { src: '/portfolio/newone.png', pos: '50% 50%', alt: { de: 'Newone – Armbänder am Handgelenk im warmen Licht', en: 'Newone – bracelets on a wrist in warm light' } },
  'baer-schuhe': { src: '/portfolio/baer-schuhe.png', pos: '50% 35%', alt: { de: 'Bär Schuhe – Frau mit Lederschuhen in beiden Händen', en: 'Bär Schuhe – woman holding leather shoes in both hands' } },
  'liquid-life': { src: '/portfolio/liquid-life.png', pos: '50% 15%', alt: { de: 'Liquid Life – Mountainbiker im Sprung auf einem Waldtrail', en: 'Liquid Life – mountain biker jumping on a forest trail' } },
  'pfundskerl-xxl-de': { src: '/portfolio/pfundskerl.jpeg', crop: true, alt: { de: 'Pfundskerl – Model in olivgrüner Winterjacke vor Nebellandschaft', en: 'Pfundskerl – model in an olive winter jacket against a misty landscape' } },
  kaipara: { src: '/portfolio/kaipara.jpg', pos: '50% 40%', alt: { de: 'Kaipara – Mann im dunkelgrünen Longsleeve vor Bergkulisse', en: 'Kaipara – man in a dark green long-sleeve shirt against mountains' } },
  'riess-ambiente': { src: '/portfolio/riess-ambiente.png', pos: '50% 50%', alt: { de: 'Riess-Ambiente – dunkles Ledersofa im Wohnraum', en: 'Riess-Ambiente – dark leather sofa in a living room' } },
}

/** Keyfacts-Bild der Detailseite = imageSrc aus lib/portfolio.ts; hier nur bessere Alt-Texte, wo das Motiv abweicht. */
export const c2BildAlt: Record<string, { de: string; en: string }> = {
  '/portfolio/baer-header.png': { de: 'Bär Schuhe – Paar in hellen Sneakern auf cremefarbenem Grund', en: 'Bär Schuhe – couple in light sneakers on a cream background' },
  '/portfolio/baer-before-keyfacts.png': {
    de: 'Bär Schuhe – Header-Motiv: Frau und Mann in braunen Schnürschuhen vor hellem Grund',
    en: 'Bär Schuhe – header image: woman and man in brown lace-up shoes on a light background',
  },
  '/portfolio/baer-before-keyfacts-1.png': { de: 'Bär Schuhe – Kategorieseite Damenschuhe im Shop', en: 'Bär Schuhe – women’s shoes category page in the shop' },
  '/portfolio/baer-before-keyfacts-2.png': { de: 'Bär Schuhe – Produktseite im Shop', en: 'Bär Schuhe – product page in the shop' },
}
