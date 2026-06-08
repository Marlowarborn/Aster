import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/** Display: condensed, heavy, uppercase grotesk — slanted via CSS skew (.display-title). */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${siteConfig.band} — ${siteConfig.album}`;
const description =
  siteConfig.tagline || `${siteConfig.album}, le nouvel album de ${siteConfig.band}.`;

/**
 * URL de base absolue pour OG/Twitter : un override explicite (NEXT_PUBLIC_SITE_URL)
 * ou l'URL de prod du config, sinon le déploiement Vercel courant (VERCEL_URL),
 * sinon localhost en dev. Sans ça, l'image OG serait servie en relatif et
 * l'aperçu casserait une fois le lien partagé.
 */
const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  siteConfig.url ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/+$/, "");

// cover.png (carré 2000×2000) = meilleur visuel pour l'unfurl : pochette canonique,
// rendue en entier sur Slack/Discord/WhatsApp/iMessage. story.jpg (vertical) serait
// rogné en bannière et perdrait logo + "CRASH TEST".
const ogImage = {
  url: siteConfig.cover,
  width: 2000,
  height: 2000,
  alt: `${siteConfig.band} — ${siteConfig.album}, pochette de l'album`,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  applicationName: title,
  keywords: [siteConfig.band, siteConfig.album, "album", "musique", "release party"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "music.album",
    locale: "fr_FR",
    url: baseUrl,
    siteName: siteConfig.band,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6a1fc4",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
