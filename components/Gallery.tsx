import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  const photos = siteConfig.gallery;
  if (photos.length === 0) return null; // section masquée si aucune photo

  return (
    <section id="galerie" className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="04" kicker="Visuels" title="Galerie" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 0.04}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
