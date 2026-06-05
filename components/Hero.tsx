import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-cream pt-40 sm:pt-48 lg:pt-52"
    >
      <div className="mx-auto grid max-w-container items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <Reveal delay={0}>
            <p className="mb-7 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Handgefertigt in Eigenarbeit · Kleine Chargen
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display text-[2.3rem] font-light leading-[1.1] text-ink sm:text-[2.9rem] lg:text-[3.5rem]">
              Entworfen für{" "}
              <span className="text-cognac-deep">Jahre</span>,
              <br />
              nicht für Saisons.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-7 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Handgefertigte Taschen aus pflanzlich gegerbtem Vollnarbenleder.
              Entworfen, um mit der Zeit persönlicher zu werden.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#kollektion"
                className="group inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-[0.74rem] uppercase tracking-eyebrow text-cream transition-colors duration-300 hover:bg-espresso"
              >
                Erste Kollektion entdecken
                <span className="transition-transform duration-300 ease-soft group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#kontakt"
                className="link-underline self-center text-[0.78rem] uppercase tracking-wide text-ink"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </Reveal>
        </div>

        {/* Hauptvisual */}
        <Reveal delay={200} className="order-1 lg:order-2">
          <figure className="group relative aspect-[3/4] w-full overflow-hidden bg-sand">
            {/*
              HERO-BILD
              Ersetze /public/hero.jpg durch dein eigenes Bild (Hochformat 3:4).
              Empfehlung: das Lifestyle-Foto, auf dem die Tasche getragen wird.
            */}
            <Image
              src="/hero.jpg"
              alt="LOEFFLER SOUL Tasche, am Körper getragen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-zoom object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
              No. 01 — Die Sling
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
