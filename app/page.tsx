import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Links } from "@/components/Links";
import { Party } from "@/components/Party";
import { Tracklist } from "@/components/Tracklist";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

function dateShort(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1].slice(2)}` : "";
}

export default function Home() {
  const ticker = [siteConfig.album, siteConfig.band, dateShort(siteConfig.releaseDate)].filter(
    Boolean
  );

  return (
    <main>
      <Hero />
      <Marquee items={ticker} />
      <Links />
      <Party />
      <Marquee items={ticker} reverse />
      <Tracklist />
      <Gallery />
      <Footer />
    </main>
  );
}
