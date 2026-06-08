import Image from "next/image";
import { ArrowUpRight, Ticket, ShoppingBag } from "lucide-react";
import {
  SiSpotify,
  SiApplemusic,
  SiYoutube,
  SiSoundcloud,
  SiBandcamp,
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiX,
} from "react-icons/si";
import { FaDeezer } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CrashTarget } from "@/components/ui/CrashTarget";

type LinkRow = { key: string; label: string; href: string; Icon: IconType; brand: string };

function streamingRows(): LinkRow[] {
  const s = siteConfig.streaming;
  return (
    [
      { key: "spotify", label: "Spotify", href: s.spotify, Icon: SiSpotify, brand: "#1DB954" },
      { key: "apple", label: "Apple Music", href: s.appleMusic, Icon: SiApplemusic, brand: "#FA57C1" },
      { key: "deezer", label: "Deezer", href: s.deezer, Icon: FaDeezer, brand: "#A238FF" },
      { key: "youtube", label: "YouTube", href: s.youtube, Icon: SiYoutube, brand: "#FF0000" },
      { key: "soundcloud", label: "SoundCloud", href: s.soundcloud, Icon: SiSoundcloud, brand: "#FF5500" },
      { key: "bandcamp", label: "Bandcamp", href: s.bandcamp, Icon: SiBandcamp, brand: "#629AA9" },
    ] as LinkRow[]
  ).filter((r) => r.href);
}

function socialRows(): LinkRow[] {
  const s = siteConfig.socials;
  return (
    [
      { key: "instagram", label: "Instagram", href: s.instagram, Icon: SiInstagram, brand: "#E1306C" },
      { key: "tiktok", label: "TikTok", href: s.tiktok, Icon: SiTiktok, brand: "#ffffff" },
      { key: "youtube", label: "YouTube", href: s.youtube, Icon: SiYoutube, brand: "#FF0000" },
      { key: "facebook", label: "Facebook", href: s.facebook, Icon: SiFacebook, brand: "#1877F2" },
      { key: "x", label: "X", href: s.x, Icon: SiX, brand: "#ffffff" },
    ] as LinkRow[]
  ).filter((r) => r.href);
}

function PlatformButton({ row }: { row: LinkRow }) {
  const { label, href, Icon, brand } = row;
  return (
    <MagneticButton href={href} ariaLabel={`Écouter sur ${label}`} className="w-full" strength={0.2}>
      <div
        className="group flex w-full items-center justify-between border border-line bg-surface/40 px-5 py-5 transition-colors duration-200 hover:border-lime hover:bg-surface"
        style={{ ["--brand" as string]: brand }}
      >
        <span className="flex items-center gap-4">
          <Icon className="h-6 w-6 shrink-0 text-ink transition-colors duration-200 group-hover:[color:var(--brand)]" aria-hidden />
          <span className="font-display text-2xl uppercase tracking-wide text-ink">{label}</span>
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-lime"
          aria-hidden
        />
      </div>
    </MagneticButton>
  );
}

export function Links() {
  const streaming = streamingRows();
  const socials = socialRows();
  const presave = siteConfig.streaming.presave;
  const tickets = siteConfig.party.ticketsUrl;
  const merch = siteConfig.merchUrl;

  const hasAnything =
    streaming.length > 0 || socials.length > 0 || presave || tickets || merch;

  // Si vraiment aucun lien, on masque toute la section plutôt qu'afficher un vide.
  if (!hasAnything) return null;

  return (
    <section id="liens" className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="01" kicker="Le hub" title="Écouter & Suivre" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Pochette — art complet, jamais surchargé de texte */}
        <Reveal className="lg:sticky lg:top-10 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden border border-line">
            <Image
              src={siteConfig.cover}
              alt={`${siteConfig.band} — ${siteConfig.album}, pochette de l'album`}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Liens */}
        <div className="flex flex-col gap-3">
          {presave ? (
            <Reveal>
              <MagneticButton href={presave} ariaLabel="Pré-sauvegarder l'album" className="w-full" strength={0.2}>
                <div className="group flex w-full items-center justify-between bg-lime px-5 py-5 text-bg transition-transform">
                  <span className="flex items-center gap-4">
                    <CrashTarget className="h-6 w-6" crosshair={false} />
                    <span className="font-display text-2xl uppercase tracking-wide">Pré-save</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </MagneticButton>
            </Reveal>
          ) : null}

          {streaming.length > 0 && (
            <div className="flex flex-col gap-3">
              {streaming.map((row, i) => (
                <Reveal key={row.key} delay={i * 0.04}>
                  <PlatformButton row={row} />
                </Reveal>
              ))}
            </div>
          )}

          {(tickets || merch) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {tickets ? (
                <Reveal>
                  <MagneticButton href={tickets} ariaLabel="Billetterie de la release party" className="w-full" strength={0.2}>
                    <div className="group flex w-full items-center justify-between border border-target bg-target px-5 py-5 text-bg">
                      <span className="flex items-center gap-3">
                        <Ticket className="h-6 w-6" aria-hidden />
                        <span className="font-display text-xl uppercase tracking-wide">Billets</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                    </div>
                  </MagneticButton>
                </Reveal>
              ) : null}
              {merch ? (
                <Reveal>
                  <MagneticButton href={merch} ariaLabel="Boutique merch" className="w-full" strength={0.2}>
                    <div className="group flex w-full items-center justify-between border border-line bg-surface/40 px-5 py-5 transition-colors hover:border-lime hover:bg-surface">
                      <span className="flex items-center gap-3">
                        <ShoppingBag className="h-6 w-6" aria-hidden />
                        <span className="font-display text-xl uppercase tracking-wide">Merch</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-lime" aria-hidden />
                    </div>
                  </MagneticButton>
                </Reveal>
              ) : null}
            </div>
          )}

          {socials.length > 0 && (
            <Reveal className="mt-4 flex flex-wrap items-center gap-3">
              <span className="tech-label mr-2">Réseaux</span>
              {socials.map((row) => (
                <MagneticButton
                  key={row.key}
                  href={row.href}
                  ariaLabel={row.label}
                  strength={0.3}
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-line bg-surface/40 text-ink transition-colors hover:border-lime hover:text-lime">
                    <row.Icon className="h-5 w-5" aria-hidden />
                  </span>
                </MagneticButton>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
