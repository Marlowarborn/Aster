import Image from "next/image";
import { MapPin, Ticket, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/ui/Countdown";
import { MagneticButton } from "@/components/ui/MagneticButton";

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Format "2026-06-19" -> "19 JUIN 2026" sans dépendre de la locale runtime. */
function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1] ?? "";
  return `${Number(d)} ${month} ${y}`.toUpperCase();
}

export function Party() {
  const p = siteConfig.party;
  if (!p.date) return null;

  const locationLine = [p.venue, p.city].filter(Boolean).join(" · ");

  return (
    <section id="party" className="relative overflow-hidden border-y border-line bg-violet-deep/20">
      <div className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeader index="02" kicker="Live" title="Release Party" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Poster vertical (story) */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[1240/1753] w-full max-w-sm overflow-hidden border border-line">
              <Image
                src={siteConfig.poster}
                alt={`Affiche ${siteConfig.album} — release party`}
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Détails + countdown */}
          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <Reveal>
              <p className="display-title text-5xl text-lime sm:text-7xl">{formatDate(p.date)}</p>
            </Reveal>

            <Reveal>
              <Countdown date={p.date} />
            </Reveal>

            {(locationLine || p.time || p.address) && (
              <Reveal className="flex flex-col gap-3 text-lg">
                {p.time ? (
                  <span className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-target" aria-hidden />
                    {p.time}
                  </span>
                ) : null}
                {locationLine ? (
                  <span className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-target" aria-hidden />
                    {locationLine}
                  </span>
                ) : null}
                {p.address ? <span className="tech-label ml-8">{p.address}</span> : null}
              </Reveal>
            )}

            {(p.ticketsUrl || p.mapUrl) && (
              <Reveal className="flex flex-wrap items-center gap-4">
                {p.ticketsUrl ? (
                  <MagneticButton href={p.ticketsUrl} ariaLabel="Réserver des billets" strength={0.25}>
                    <span className="group flex items-center gap-3 bg-target px-7 py-4 font-display text-xl uppercase tracking-wide text-bg">
                      <Ticket className="h-5 w-5" aria-hidden />
                      Réserver
                    </span>
                  </MagneticButton>
                ) : null}
                {p.mapUrl ? (
                  <MagneticButton href={p.mapUrl} ariaLabel="Voir sur la carte" strength={0.25}>
                    <span className="flex items-center gap-3 border border-line px-7 py-4 font-display text-xl uppercase tracking-wide text-ink transition-colors hover:border-lime hover:text-lime">
                      <MapPin className="h-5 w-5" aria-hidden />
                      Itinéraire
                    </span>
                  </MagneticButton>
                ) : null}
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
