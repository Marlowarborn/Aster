import { CrashTarget } from "@/components/ui/CrashTarget";
import { cn } from "@/lib/utils";

/**
 * Ticker cinétique défilant. Décoratif (aria-hidden). Boucle sans couture
 * (2 copies translatées de -50%). Stoppé par prefers-reduced-motion (CSS).
 */
export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const Row = (
    <div
      className={cn(
        "flex shrink-0 items-center gap-8 px-4",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="display-title whitespace-nowrap text-3xl text-ink sm:text-5xl">
            {item}
          </span>
          <CrashTarget className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" crosshair={false} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("flex w-full overflow-hidden border-y border-line py-4", className)}
      aria-hidden
    >
      {Row}
      {Row}
    </div>
  );
}
