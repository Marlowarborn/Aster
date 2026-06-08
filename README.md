# Aster — Crash Test

Landing page one-page (remplace un Linktree) pour la sortie de l'album **Crash Test** d'**Aster**.
Next.js 14 (App Router) · TypeScript strict · Tailwind · Framer Motion · déploiement Vercel zero-config.

---

## 🚀 Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
```

Node 18.17+ recommandé.

---

## ✏️ Tout éditer depuis un seul fichier : `lib/site-config.ts`

C'est **la source unique de vérité**. Aucun lien ni texte n'est codé en dur ailleurs.

**Règle d'or :** un champ laissé vide (`""` ou `[]`) masque proprement l'élément correspondant
— jamais de bouton mort, jamais de `undefined`.

Exemples :

- `streaming.spotify: ""` → le bouton Spotify n'apparaît pas.
- Tous les liens (`streaming`, `socials`, `ticketsUrl`, `merchUrl`) vides → **la section LIENS entière est masquée**.
- `gallery: []` → la section Galerie est masquée.
- `contact.booking` / `contact.press` vides → les mails du footer sont masqués.
- `party.date` vide → la section Release Party est masquée.

Le **CTA principal du hero** s'adapte automatiquement : Pré-save › streaming › billets › (fallback) ancre interne.

---

## 🖼️ Assets — où les mettre

Dépose les fichiers dans `public/assets/` et référence leur chemin dans `site-config.ts` :

| Champ config | Fichier actuel | Rôle |
|---|---|---|
| `logo`   | `/assets/logo.png`  | Logo ASTER seul (noir/transparent). Affiché en **blanc** sur fond foncé via la classe CSS `.logo-white`. Hero + footer. |
| `cover`  | `/assets/cover.png` | Pochette 1:1 (texte déjà incrusté). Utilisée **telle quelle** dans la section Liens + image OG ; en fond de hero seul le **motif radial droit** est montré (recadrage `object-right` + voile dégradé), jamais de texte superposé. |
| `poster` | `/assets/story.jpg` | Visuel vertical (logo + cible + date). Affiche de la section Release Party. |

> Pour remplacer un asset : dépose le nouveau fichier dans `public/assets/` et mets à jour le chemin
> dans `site-config.ts`. Les images sont servies via `next/image` (optimisation auto sur Vercel).

---

## 🎨 Direction artistique (dérivée des assets)

- **Palette** : violet profond `#2E1065` / violet électrique `#6A1FC4`, lime acide `#C9DB3A`,
  reflets holographiques (cyan/magenta/lilas), noir `#0A0A0A`, blanc. Accent fonctionnel = jaune cible `#F5C518`.
- **Marque signature** : la **cible crash-test** (4 quadrants jaune/noir + crosshair) recodée en SVG inline
  (`components/ui/CrashTarget.tsx`), réutilisée partout : favicon, puces, séparateurs, loader, accents au hover, ticker.
- **Typo** : `Anton` (display condensé très gras, MAJ, italique via skew CSS `.display-title`) ×
  `Space Grotesk` (corps) × `JetBrains Mono` (étiquettes techniques) — toutes via `next/font` (auto-hébergées, zéro `<link>`).
- **Textures** : halftone (trame de points), grain léger en overlay global, reflets iridescents, contraste fort.
  Pas de glassmorphism, pas de dégradé générique.
- **Interactions** : reveal staggered au hero, apparition au scroll (`whileInView`), countdown qui ticke,
  ticker cinétique, magnetic buttons, glitch RGB sur le titre au hover. **`prefers-reduced-motion` respecté partout.**

---

## 🧱 Structure

```
app/
  layout.tsx        # fonts next/font, metadata SEO/OpenGraph/Twitter, lang fr, theme-color
  page.tsx          # assemblage one-page
  globals.css       # tokens palette (CSS vars), halftone, grain, glitch, reduced-motion
  icon.svg          # favicon = cible crash-test (SVG)
components/
  Hero.tsx          # hero plein écran, titre glitch, countdown date, CTA adaptatif
  Links.tsx         # LE hub (remplace Linktree) : pochette + plateformes + billets/merch + réseaux
  Party.tsx         # release party : countdown + affiche + lieu/date + CTA billets
  Tracklist.tsx     # tracklist numérotée, durées, reveal
  Gallery.tsx       # galerie photos (masquée si vide)
  Footer.tsx        # logo, contacts mailto, réseaux, ©
  Marquee.tsx       # ticker cinétique
  SectionHeader.tsx
  ui/
    CrashTarget.tsx MagneticButton.tsx GlitchText.tsx Countdown.tsx Reveal.tsx
lib/
  site-config.ts    # ⭐ source unique de vérité
  utils.ts
public/assets/      # logo.png, cover.png, story.jpg
```

---

## ▲ Déployer sur Vercel (zero-config)

1. Pousse le repo sur GitHub/GitLab/Bitbucket.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importe le repo.
3. Vercel détecte Next.js automatiquement : **aucune config**. Clique **Deploy**.
4. Une fois en ligne, mets à jour `url` dans `site-config.ts` avec le domaine final
   (sert aux balises OpenGraph/Twitter), puis redeploie.

Build de prod validé localement : `next build` passe sans erreur ni warning (page 100 % statique).

---

## ⚙️ Notes techniques

- `next.config.mjs` active `dangerouslyAllowSVG` uniquement pour servir le favicon SVG via `next/image` au besoin.
- L'image OG est la pochette (`cover.png`, 2000×2000). Pour une OG dédiée, change `siteConfig.cover` ou ajoute un champ.
- Les liens externes ont `target="_blank" rel="noopener noreferrer"` ; les boutons-icônes ont des `aria-label` ; focus visible et contrastes AA assurés.
