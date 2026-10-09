"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { SHOP_LINKS } from "@/lib/shop";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-cream pt-36 sm:pt-44"
    >
      <div className="mx-auto grid max-w-container items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <Reveal delay={0}>
            <p className="mb-7 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Handgefertigt in kleinen Chargen
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display text-[2.3rem] font-normal leading-[1.1] text-ink sm:text-[2.9rem] lg:text-[3.5rem]">
              Entworfen für{" "}
              <span className="text-cognac-deep">Jahre</span>,
              <br />
              nicht für Saisons.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-7 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Handgefertigte Ledertaschen vom Bodensee, aus sorgfältig
              ausgewähltem Leder. Entworfen, um mit der Zeit persönlicher zu
              werden.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9">
              {/* Primär: der Weg in den Shop */}
              <a
                href={SHOP_LINKS.heroButton}
                className="group inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-[0.74rem] uppercase tracking-eyebrow text-cream transition-colors duration-300 hover:bg-espresso"
              >
                Zum Shop
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
                >
                  →
                </span>
              </a>

              {/* Sekundär: dezent, für alle, die erst mehr wissen wollen */}
              <div className="flex items-center justify-center gap-7 sm:justify-start">
                <a
                  href="#handwerk"
                  className="link-underline text-[0.74rem] uppercase tracking-wide text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  Handwerk entdecken
                </a>
                <a
                  href="#kollektion"
                  className="link-underline text-[0.74rem] uppercase tracking-wide text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  Größen & Preise
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hauptvisual */}
        <Reveal delay={200} className="order-1 lg:order-2">
          {/* Bild + Plakette führen in die Kollektion im Shop */}
          <a
            href={SHOP_LINKS.heroBild}
            aria-label="Die Sling im Shop ansehen"
            className="group block"
          >
            {/* Tablet hochkant: Querformat-Ausschnitt, damit Überschrift
                und Shop-Button ohne Scrollen sichtbar bleiben */}
            <figure className="relative aspect-[3/4] w-full overflow-hidden bg-sand sm:aspect-[4/3] lg:aspect-[3/4]">
              {/* HERO-BILD: /public/hero.jpg (Hochformat 3:4, Motiv mittig) */}
              <Image
                src="/hero.jpg"
                alt="Handgefertigte LOEFFLER SOUL Sling aus nubukiertem Rindleder, am Körper getragen"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="img-zoom object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/85 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm transition-colors duration-300 group-hover:bg-ink group-hover:text-cream">
                Die Sling · Standard
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                >
                  →
                </span>
              </figcaption>
            </figure>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
