import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CrashTarget } from "@/components/ui/CrashTarget";

export const metadata = {
  title: `404 — ${siteConfig.band}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="halftone absolute inset-0 -z-10 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-deep/20 via-transparent to-bg" />

      <CrashTarget className="mb-8 h-20 w-20" />

      <p className="tech-label mb-4">
        {siteConfig.band} {"//"} erreur système
      </p>

      <h1 className="display-title text-[30vw] leading-none text-ink sm:text-[12rem]">404</h1>

      <p className="mt-6 max-w-md text-lg text-muted">
        Crash non contrôlé. Cette page n&apos;a pas survécu à l&apos;impact.
      </p>

      <Link
        href="/"
        className="mt-10 flex items-center gap-3 bg-lime px-8 py-4 font-display text-2xl uppercase tracking-wide text-bg"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden />
        Retour à l&apos;album
      </Link>
    </main>
  );
}
