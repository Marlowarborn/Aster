import { CrashTarget } from "@/components/ui/CrashTarget";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeader({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-5">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <CrashTarget className="h-5 w-5" crosshair={false} />
          <span className="tech-label">
            {index} — {kicker}
          </span>
        </div>
        <h2 className="display-title text-5xl text-ink sm:text-7xl">{title}</h2>
      </div>
    </Reveal>
  );
}
