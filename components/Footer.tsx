import Image from "next/image";
import { Mail } from "lucide-react";
import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiFacebook,
  SiX,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { siteConfig } from "@/lib/site-config";
import { CrashTarget } from "@/components/ui/CrashTarget";

function socials(): { key: string; label: string; href: string; Icon: IconType }[] {
  const s = siteConfig.socials;
  return [
    { key: "instagram", label: "Instagram", href: s.instagram, Icon: SiInstagram },
    { key: "tiktok", label: "TikTok", href: s.tiktok, Icon: SiTiktok },
    { key: "youtube", label: "YouTube", href: s.youtube, Icon: SiYoutube },
    { key: "facebook", label: "Facebook", href: s.facebook, Icon: SiFacebook },
    { key: "x", label: "X", href: s.x, Icon: SiX },
  ].filter((r) => r.href);
}

export function Footer() {
  const year = new Date().getFullYear();
  const s = socials();
  const { booking, press } = siteConfig.contact;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-site px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo + baseline */}
          <div className="flex flex-col gap-4">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.band}
              width={1168}
              height={246}
              className="logo-white h-9 w-auto"
            />
            {siteConfig.tagline ? (
              <p className="max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
            ) : null}
          </div>

          {/* Contact */}
          {(booking || press) && (
            <div className="flex flex-col gap-3">
              <span className="tech-label">Contact</span>
              {booking ? (
                <a
                  href={`mailto:${booking}`}
                  className="flex items-center gap-2 text-ink transition-colors hover:text-lime"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Booking — {booking}
                </a>
              ) : null}
              {press ? (
                <a
                  href={`mailto:${press}`}
                  className="flex items-center gap-2 text-ink transition-colors hover:text-lime"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Presse — {press}
                </a>
              ) : null}
            </div>
          )}

          {/* Réseaux */}
          {s.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="tech-label">Suivre</span>
              <div className="flex flex-wrap gap-3">
                {s.map((row) => (
                  <a
                    key={row.key}
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={row.label}
                    className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-lime hover:text-lime"
                  >
                    <row.Icon className="h-5 w-5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bas de page */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <span className="tech-label flex items-center gap-2">
            <CrashTarget className="h-4 w-4" crosshair={false} />
            © {year} {siteConfig.band} — {siteConfig.album}
          </span>
          <span className="tech-label">Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}
