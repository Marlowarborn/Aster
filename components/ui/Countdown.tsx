"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
  };
}

const PAD = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setParts(diff(target));
    // prefers-reduced-motion : on fige le compteur sur un instantané (pas de tic
    // chaque seconde), conformément au respect du mouvement réduit.
    if (reduce) return;
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target, reduce]);

  const done = mounted && target - Date.now() <= 0;

  if (done) {
    return (
      <p className="display-title text-4xl text-lime sm:text-6xl" aria-live="polite">
        Disponible maintenant
      </p>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "Jours", value: parts.days },
    { label: "Heures", value: parts.hours },
    { label: "Min", value: parts.minutes },
    { label: "Sec", value: parts.seconds },
  ];

  return (
    <div
      className="flex flex-wrap gap-3 sm:gap-4"
      aria-label="Compte à rebours jusqu'à la sortie"
      suppressHydrationWarning
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[68px] flex-col items-center border border-line bg-surface/60 px-3 py-3 sm:min-w-[92px] sm:px-5 sm:py-4"
        >
          <span
            className="font-mono text-3xl font-bold tabular-nums text-ink sm:text-5xl"
            suppressHydrationWarning
          >
            {mounted ? PAD(u.value) : "--"}
          </span>
          <span className="tech-label mt-1">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
