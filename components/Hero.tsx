"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, Play, Ticket } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CrashTarget } from "@/components/ui/CrashTarget";
import { GlitchText } from "@/components/ui/GlitchText";

const MONTHS_SHORT = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return "";
  const [, y, mo, d] = m;
  return `${d}.${mo}.${y.slice(2)}`;
};

/** CTA principal : 1er lien dispo dans l'ordre presave > streaming > billets, sinon ancre interne. */
function primaryCta(): { label: string; href: string; external: boolean; icon: "play" | "ticket" } {
  const s = siteConfig.streaming;
  const stream = s.presave || s.spotify || s.appleMusic || s.deezer || s.youtube || s.soundcloud || s.bandcamp;
  if (stream) {
    return { label: s.presave ? "Pré-save" : "Écouter", href: stream, external: true, icon: "play" };
  }
  if (siteConfig.party.ticketsUrl) {
    return { label: "Billets", href: siteConfig.party.ticketsUrl, external: true, icon: "ticket" };
  }
  return { label: "Découvrir l'album", href: "#tracklist", external: false, icon: "play" };
}

/** Première section réellement rendue, pour cibler l'indice de scroll. */
function firstSectionAnchor(): string {
  const s = siteConfig.streaming;
  const hasLinks =
    s.presave || s.spotify || s.appleMusic || s.deezer || s.youtube || s.soundcloud || s.bandcamp ||
    siteConfig.party.ticketsUrl || siteConfig.merchUrl ||
    Object.values(siteConfig.socials).some(Boolean);
  if (hasLinks) return "#liens";
  if (siteConfig.party.date) return "#party";
  if (siteConfig.tracklist.length > 0) return "#tracklist";
  return "#party";
}

export function Hero() {
  const reduce = useReducedMotion();
  const cta = primaryCta();
  const scrollTo = firstSectionAnchor();
  const dateShort = siteConfig.releaseDate ? MONTHS_SHORT(siteConfig.releaseDate) : "";

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Fond : motif radial de la pochette (partie graphique droite), sans texte superposé */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={siteConfig.cover}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Voile dégradé : gauche TOTALEMENT opaque (cache le logo/tracklist/"CRASH TEST"
            incrustés sur la pochette, quel que soit le crop), motif/glow visible à droite. */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-[42%] via-bg/70 via-[68%] to-violet-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        <div className="halftone absolute inset-0 opacity-40" />
      </div>

      {/* Cible décorative en rotation lente */}
      <CrashTarget
        className="pointer-events-none absolute -right-16 top-1/4 hidden h-72 w-72 opacity-20 md:block lg:h-96 lg:w-96"
        spin
        crosshair
      />

      {/* Contenu */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-5 py-28 sm:px-8"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-3">
          <CrashTarget className="h-5 w-5" crosshair={false} />
          <span className="tech-label">{siteConfig.band} {"//"} Specimen 01 — LP</span>
        </motion.div>

        <motion.div variants={item}>
          <Image
            src={siteConfig.logo}
            alt={siteConfig.band}
            width={1168}
            height={246}
            priority
            className="logo-white mb-8 h-12 w-auto sm:h-16"
          />
        </motion.div>

        <h1 className="flex flex-col leading-[0.82]">
          <span className="sr-only">
            {siteConfig.band} — {siteConfig.album}
          </span>
          <motion.span
            variants={item}
            aria-hidden
            className="display-title block text-[20vw] text-ink sm:text-[15vw] lg:text-[12rem]"
          >
            <GlitchText text="CRASH" />
          </motion.span>
          <motion.span
            variants={item}
            aria-hidden
            className="display-title holo-text block text-[20vw] sm:text-[15vw] lg:text-[12rem]"
          >
            <GlitchText text="TEST" />
          </motion.span>
        </h1>

        {siteConfig.tagline ? (
          <motion.p variants={item} className="mt-8 max-w-md text-lg text-ink/90 sm:text-xl">
            {siteConfig.tagline}
          </motion.p>
        ) : null}

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
          <motion.a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={cta.label}
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 bg-lime px-8 py-4 font-display text-2xl uppercase tracking-wide text-bg"
          >
            {cta.icon === "ticket" ? (
              <Ticket className="h-5 w-5" aria-hidden />
            ) : (
              <Play className="h-5 w-5 fill-current" aria-hidden />
            )}
            {cta.label}
          </motion.a>

          {dateShort ? (
            <span className="flex items-center gap-3 border border-line px-5 py-4 font-mono text-sm tracking-widest text-ink">
              <CrashTarget className="h-5 w-5" crosshair={false} />
              {dateShort}
            </span>
          ) : null}
        </motion.div>
      </motion.div>

      {/* Indice de scroll */}
      <motion.a
        href={scrollTo}
        aria-label="Faire défiler"
        variants={item}
        initial="hidden"
        animate="show"
        className="mx-auto mb-8 flex items-center gap-2 text-muted transition-colors hover:text-lime"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <ArrowDown className="h-4 w-4" aria-hidden />
          <span className="tech-label">Scroll</span>
        </motion.span>
      </motion.a>
    </section>
  );
}
