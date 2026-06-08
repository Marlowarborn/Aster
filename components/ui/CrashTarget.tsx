import { cn } from "@/lib/utils";

/**
 * Marque signature du groupe : cible crash-test.
 * Cercle divisé en 4 quadrants alternés jaune (#F5C518) / noir, + crosshair.
 * Purement géométrique (SVG inline) — réutilisée partout : puces, séparateurs,
 * loader, accents au hover.
 */
export function CrashTarget({
  className,
  spin = false,
  crosshair = true,
  title,
}: {
  className?: string;
  spin?: boolean;
  crosshair?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(spin && "animate-spin-slow", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(50 50)">
        {/* quadrants */}
        <path d="M0 0 L0 -44 A44 44 0 0 1 44 0 Z" fill="#f5c518" />
        <path d="M0 0 L44 0 A44 44 0 0 1 0 44 Z" fill="#0a0a0a" />
        <path d="M0 0 L0 44 A44 44 0 0 1 -44 0 Z" fill="#f5c518" />
        <path d="M0 0 L-44 0 A44 44 0 0 1 0 -44 Z" fill="#0a0a0a" />
        <circle r="44" fill="none" stroke="#ffffff" strokeWidth="4" />
        {crosshair ? (
          <g stroke="#ffffff" strokeWidth="4">
            <line x1="-50" y1="0" x2="50" y2="0" />
            <line x1="0" y1="-50" x2="0" y2="50" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
