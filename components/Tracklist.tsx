import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CrashTarget } from "@/components/ui/CrashTarget";

export function Tracklist() {
  const tracks = siteConfig.tracklist;
  if (tracks.length === 0) return null;

  return (
    <section id="tracklist" className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="03" kicker="Album" title="Tracklist" />

      <ul className="flex flex-col">
        {tracks.map((t, i) => (
          <Reveal as="li" key={t.n} delay={i * 0.05}>
            <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-5 transition-colors hover:bg-surface/50 sm:gap-8 sm:py-6">
              <span className="font-mono text-sm text-muted tabular-nums sm:text-base">
                {t.n.toString().padStart(2, "0")}
              </span>
              <span className="flex items-center gap-4">
                <span className="display-title text-3xl text-ink transition-colors group-hover:text-lime sm:text-5xl">
                  {t.title}
                </span>
                <CrashTarget
                  className="h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  crosshair={false}
                />
              </span>
              {t.duration ? (
                <span className="font-mono text-sm text-muted tabular-nums sm:text-base">
                  {t.duration}
                </span>
              ) : (
                <span />
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
