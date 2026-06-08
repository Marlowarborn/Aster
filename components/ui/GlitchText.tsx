"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Titre avec glitch au survol (RGB split). Pur CSS via pseudo-layers data-text.
 * Désactivé si prefers-reduced-motion.
 */
export function GlitchText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const active = hover && !reduce;

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-10">{text}</span>
      {active && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 z-0 translate-x-[3px] translate-y-[-2px] text-lime opacity-80 mix-blend-screen"
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 translate-x-[-3px] translate-y-[2px] text-[#ff4ecd] opacity-80 mix-blend-screen"
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
