/**
 * SITE_CONFIG — source unique de vérité.
 *
 * Toute donnée affichée sur le site vient d'ici. Aucun lien / texte n'est
 * hardcodé ailleurs. Règle d'or : un champ vide ("") => l'élément correspondant
 * est masqué proprement (pas de bouton mort, pas de "undefined", jamais de valeur inventée).
 */

export type Track = { n: number; title: string; duration?: string };

export type GalleryImage = { src: string; alt: string };

export const siteConfig = {
  band: "Aster",
  album: "Crash Test",
  tagline: "",

  // ISO date — sert au countdown de sortie ET à la date de la release party.
  releaseDate: "2026-06-19",

  // Visuels réels (dans /public/assets).
  logo: "/assets/logo.png", // ASTER seul, noir sur transparent (affiché en blanc via .logo-white)
  cover: "/assets/cover.png", // pochette 1:1 complète (texte déjà incrusté — ne rien superposer dessus)
  poster: "/assets/story.jpg", // visuel vertical (logo + cible + "CRASH TEST 19 06 26")

  party: {
    date: "2026-06-19", // jour de l'event (même que la sortie)
    time: "20:00", // heure
    venue: "Le Scandale", // lieu
    address: "68 rue Blanche, 75009",
    city: "Paris",
    ticketsUrl: "", // billetterie — à remplir
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Le+Scandale%2C+68+rue+Blanche%2C+75009+Paris",
  },

  // Liens streaming — à remplir. Vide => bouton masqué.
  streaming: {
    spotify: "",
    appleMusic: "",
    deezer: "",
    youtube: "",
    soundcloud: "",
    bandcamp: "",
    presave: "",
  },

  // Réseaux — à remplir. Vide => icône masquée.
  socials: {
    instagram: "https://www.instagram.com/a_s.t.e_r/",
    tiktok: "",
    youtube: "",
    facebook: "",
    x: "",
  },

  merchUrl: "", // boutique — à remplir

  tracklist: [
    { n: 1, title: "O'MALEY", duration: "3:14" },
    { n: 2, title: "SAINTMAUPEL", duration: "3:53" },
    { n: 3, title: "ÈVE", duration: "3:22" },
    { n: 4, title: "FARFADET", duration: "3:54" },
    { n: 5, title: "ICHOU", duration: "3:31" },
  ] as Track[],

  // Photos du groupe. Vide => section galerie masquée.
  gallery: [] as GalleryImage[],

  // Mails de contact — à remplir. Vide => lien masqué.
  contact: {
    booking: "",
    press: "",
  },

  // SEO / URL de prod (à mettre à jour après déploiement Vercel).
  url: "https://aster-zeta-red.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
