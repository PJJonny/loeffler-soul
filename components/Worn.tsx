import Image from "next/image";
import Reveal from "./Reveal";

/*
  GETRAGEN
  --------
  Die Sling am Körper – Frauen und Männer, vor der Brust und am Rücken.
  Am Handy wischbar (eine Bildreihe), ab Tablet als Raster.
  Bilder (Hochformat 3:4) liegen in /public.
*/

const BILDER = [
  {
    src: "/getragen-see.jpg",
    alt: "Frau trägt die Sling Kompakt in Taupe vor der Brust, im Hintergrund ein See mit Segelbooten",
    cap: "Vor der Brust",
  },
  {
    src: "/getragen.jpg",
    alt: "Mann trägt die Sling in Dunkelbraun als Crossbody auf dem Rücken, im Hintergrund ein See",
    cap: "Am Rücken",
  },
  {
    src: "/getragen-wiese.jpg",
    alt: "Frau geht durch eine Wiese und trägt die Sling in Hellblau quer über dem Rücken",
    cap: "Unterwegs",
  },
  {
    src: "/getragen2.jpg",
    alt: "Mann sitzt auf einem Segelboot und trägt die Sling in Taupe quer über dem Rücken",
    cap: "Mit an Bord",
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
              Vor der Brust, am Rücken oder mit an Bord: Die Sling ist unisex und
              trägt sich so, wie es zu dir passt.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ul
            aria-label="Fotos: die Sling im Alltag"
            tabIndex={0}
            className="scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6"
          >
            {BILDER.map((b) => (
              <li key={b.src} className="w-[74%] shrink-0 snap-start sm:w-auto">
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                    <Image
                      src={b.src}
                      alt={b.alt}
                      fill
                      sizes="(max-width: 640px) 74vw, (max-width: 1024px) 50vw, (max-width: 1400px) 25vw, 330px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-ink/70">{b.cap}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
