import Image from "next/image";
import Reveal from "./Reveal";
import InstagramIcon from "./InstagramIcon";
import { ZoomImage, type LightboxItem } from "./Lightbox";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/shop";

/*
  GETRAGEN
  --------
  Die Sling am Körper – bei Männern und Frauen, am Rücken, vor dem Körper,
  an der Hüfte. Fotos aus dem Onlineshop bzw. vom See (nur zugeschnitten,
  Taschen unverändert). Bildunterschrift (caption) passend zum Foto halten.
  Am Handy wischbar (eine Bildreihe), ab Tablet als Raster. Jedes Foto
  öffnet die Großansicht. Darunter der Weg zu mehr Bildern auf Instagram.
  Bilder (Hochformat 3:4) liegen in /public – bei neuen Fotos width/height
  anpassen (Pixelmaße der Datei).
*/

const BILDER: LightboxItem[] = [
  {
    src: "/getragen-mann-see.jpg",
    alt: "Mann steht am Seeufer und trägt die Sling in Braun quer über dem Rücken, im Hintergrund der See und ein Ort am anderen Ufer",
    caption: "Am See",
    width: 840,
    height: 1120,
  },
  {
    src: "/getragen-see-bank.jpg",
    alt: "Frau sitzt auf einer Holzbank am See, trägt die Sling vor dem Körper und öffnet den Reißverschluss",
    caption: "Griffbereit",
    width: 787,
    height: 1049,
  },
  {
    src: "/getragen-ruecken.jpg",
    alt: "Rückansicht: Frau trägt die Sling Standard aus schwarzem, strukturiertem Leder quer über dem Rücken",
    caption: "Am Rücken",
    width: 1086,
    height: 1448,
  },
  {
    src: "/getragen-huefte.jpg",
    alt: "Sling Kompakt in Hellblau, quer über den Körper an der Hüfte getragen, zu einem schwarzen Kleid",
    caption: "An der Hüfte",
    width: 985,
    height: 1313,
  },
];

export default function Worn() {
  return (
    <section id="getragen" className="scroll-mt-36 border-y border-line bg-sand">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-cognac-deep">
              <span className="h-px w-8 bg-cognac" />
              Getragen
            </p>
            <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Für jeden Tag gemacht.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-prose text-base leading-relaxed text-ink/75 sm:text-lg">
              Am Rücken, griffbereit vor dem Körper oder an der Hüfte: Die Sling
              ist unisex und trägt sich so, wie es zu dir passt.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ul
            aria-label="Fotos: die Sling im Alltag"
            className="scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6"
          >
            {BILDER.map((b, i) => (
              <li key={b.src} className="w-[74%] shrink-0 snap-start sm:w-auto">
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                    <ZoomImage items={BILDER} index={i}>
                      <Image
                        src={b.src}
                        alt={b.alt}
                        fill
                        sizes="(max-width: 640px) 74vw, (max-width: 1024px) 50vw, (max-width: 1400px) 25vw, 330px"
                        className="img-zoom object-cover"
                      />
                    </ZoomImage>
                  </div>
                  <figcaption className="mt-3 text-sm text-ink/70">{b.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Mehr Bilder: Instagram */}
        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base leading-relaxed text-ink/75">
              Mehr Momente mit der Sling – und neue Taschen – zeigen wir auf
              Instagram.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              <InstagramIcon className="h-[1.05rem] w-[1.05rem]" />
              {INSTAGRAM_HANDLE} folgen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
