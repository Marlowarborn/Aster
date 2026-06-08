import { ImageResponse } from "next/og";

/**
 * apple-touch-icon en PNG (iOS n'affiche pas correctement un SVG comme icône
 * d'écran d'accueil). On rasterise la CrashTarget — même géométrie que app/icon.svg —
 * via next/og, sans dépendance externe ni nouvel asset.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// CrashTarget : cible crash-test (4 quadrants jaune/noir + anneau blanc + crosshair).
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180"><rect width="64" height="64" fill="#0a0a0a"/><g transform="translate(32 32)"><path d="M0 0 L0 -26 A26 26 0 0 1 26 0 Z" fill="#f5c518"/><path d="M0 0 L26 0 A26 26 0 0 1 0 26 Z" fill="#0a0a0a"/><path d="M0 0 L0 26 A26 26 0 0 1 -26 0 Z" fill="#f5c518"/><path d="M0 0 L-26 0 A26 26 0 0 1 0 -26 Z" fill="#0a0a0a"/><circle r="26" fill="none" stroke="#ffffff" stroke-width="3"/><line x1="-31" y1="0" x2="31" y2="0" stroke="#ffffff" stroke-width="3"/><line x1="0" y1="-31" x2="0" y2="31" stroke="#ffffff" stroke-width="3"/></g></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        width={180}
        height={180}
        alt="Aster"
        src={`data:image/svg+xml,${encodeURIComponent(ICON_SVG)}`}
      />
    ),
    { ...size }
  );
}
