"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Lightbox, { type GalleryImage } from "./Lightbox";

/**
 * SKALIERBAR: Diese Datei beschreibt EINE Kollektion ("No. 01 — Die Sling").
 * Für weitere Kollektionen lassen sich GALLERY/SIZES/DETAILS als eigener
 * Datensatz duplizieren bzw. in ein Array von Kollektionen auslagern – die
 * Lightbox (components/Lightbox.tsx) ist bereits wiederverwendbar.
 */

type SizeKey = "Standard" | "Kompakt";

// Bilder je Größe – Grundlage für den klickbaren Bilder-Viewer.
const GALLERY: Record<SizeKey, GalleryImage[]> = {
  Standard: [
    {
      src: "/hero.jpg",
      label: "Am Körper",
      alt: "Die Sling Standard aus cognacfarbenem Vollnarbenleder am Körper getragen",
    },
    {
      src: "/produkt-detail.jpg",
      label: "Leder & Detail",
      alt: "Detailaufnahme von Narbung, Naht und Prägung der Sling Standard",
    },
    {
      src: "/futter.jpg",
      label: "Innenleben",
      alt: "Geöffnete Sling Standard mit geblümtem Futter und Reißverschluss-Innentasche",
    },
    {
      src: "/innen.jpg",
      label: "Beschläge",
      alt: "Umlaufender Reißverschluss und Karabinerhaken der Sling Standard",
    },
  ],
  Kompakt: [
    {
      src: "/produkt-front.jpg",
      label: "An Deck",
      alt: "Die Sling Kompakt aus Vollnarbenleder an Deck eines Segelboots, mit eingeprägtem Logo",
    },
    {
      src: "/getragen.jpg",
      label: "Am Körper",
      alt: "Die Sling Kompakt als Crossbody am Körper getragen – unisex",
    },
    {
      src: "/kompakt-deck2.jpg",
      label: "An Deck",
      alt: "Die Sling Kompakt auf dem Teakdeck eines Segelboots am Bodensee",
    },
    {
      src: "/getragen2.jpg",
      label: "Am Körper",
      alt: "Die Sling Kompakt als Crossbody auf einem Segelboot getragen – unisex, reiferer Träger",
    },
  ],
};

// Ehrliche Eckdaten – keine erfundenen Marken, keine Übertreibung.
const SPECS: [string, string][] = [
  ["Form", "Kompakte Sling / Crossbody"],
  ["Trageweise", "Vor der Brust oder am Rücken"],
  ["Material", "Pflanzlich gegerbtes Vollnarbenleder"],
  ["Größen", "Standard & Kompakt"],
  ["Innenleben", "Hauptfach mit Innentasche (beide Größen)"],
  ["Beschläge", "Ausgewählte Metallbeschläge, robuster Reißverschluss"],
  ["Fertigung", "In eigener Handarbeit"],
  ["Verfügbarkeit", "Auf Vorbestellung"],
];

// Zwei Größen derselben Form
const SIZES: { key: SizeKey; name: string; price: string; text: string; note: string }[] = [
  {
    key: "Standard",
    name: "Sling — Standard",
    price: "429 €",
    text:
      "Die ursprüngliche Größe. Platz für Geldbörse, Schlüssel, Telefon und das, was im Alltag mitkommt.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
  {
    key: "Kompakt",
    name: "Sling — Kompakt",
    price: "349 €",
    text:
      "Eine Nummer kleiner, etwa im Format einer klassischen Bauchtasche. Reduziert auf das Nötige, noch näher am Körper. Als Crossbody getragen ein ruhiger, unisex Begleiter durch den Tag.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
];

// Detail-Kacheln – jede eindeutig einer Größe zugeordnet.
const DETAILS: { src: string; alt: string; cap: string; size: SizeKey }[] = [
  {
    src: "/produkt-detail.jpg",
    size: "Standard",
    alt: "Detail: Narbung, Naht und Prägung des Leders der Sling Standard",
    cap: "Leder & Detail · Standard",
  },
  {
    src: "/getragen.jpg",
    size: "Kompakt",
    alt: "Die Sling Kompakt als Crossbody am Körper getragen – unisex",
    cap: "Am Körper · Kompakt",
  },
  {
    src: "/futter.jpg",
    size: "Standard",
    alt: "Innenleben der Sling Standard: geblümtes Futter und Reißverschluss-Innentasche",
    cap: "Innenleben · Standard",
  },
];

export default function Collection() {
  const [view, setView] = useState<{ size: SizeKey; index: number } | null>(null);

  const open = (size: SizeKey, src: string) => {
    const i = GALLERY[size].findIndex((g) => g.src === src);
    setView({ size, index: i < 0 ? 0 : i });
  };

  // Erlaubt das Öffnen der Galerie von außen (z. B. Klick auf das Hero-Bild)
  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail as {
        size?: SizeKey;
        index?: number;
      };
      if (d?.size === "Standard" || d?.size === "Kompakt") {
        const max = GALLERY[d.size].length - 1;
        const idx = Math.min(Math.max(d.index ?? 0, 0), max);
        setView({ size: d.size, index: idx });
      }
    };
    window.addEventListener("loeffler:open-gallery", handler as EventListener);
    return () =>
      window.removeEventListener(
        "loeffler:open-gallery",
        handler as EventListener
      );
  }, []);

  return (
    <section id="kollektion" className="scroll-mt-36 bg-cream">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        {/* Kopf */}
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Die erste Kollektion
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              No. 01 — Die Sling
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Eine kompakte Tasche für alle, die nur das Wesentliche mitnehmen.
              Getragen vor der Brust oder am Rücken, liegt sie nah am Körper und
              lässt Bewegungsfreiheit. Es ist unser erstes Modell — die Tasche,
              mit der LOEFFLER SOUL beginnt.
            </p>
          </Reveal>
        </div>

        {/* Zeile 1: große Frontansicht (Kompakt) + Beschreibung & Eckdaten */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0} className="lg:col-span-7">
            <button
              type="button"
              onClick={() => open("Kompakt", "/produkt-front.jpg")}
              className="group block w-full cursor-zoom-in text-left"
              aria-label="Bilder der Sling Kompakt ansehen"
            >
              <figure className="relative aspect-[4/3] overflow-hidden bg-sand">
                {/* BILD: Frontansicht (Kompakt, Segelboot) -> /public/produkt-front.jpg */}
                <Image
                  src="/produkt-front.jpg"
                  alt="Die Sling Kompakt aus Vollnarbenleder an Deck eines Segelboots, mit eingeprägtem Logo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-zoom object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
                  Sling Kompakt
                </figcaption>
                <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.6rem] uppercase tracking-eyebrow text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  Bilder ansehen
                </span>
              </figure>
            </button>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center">
              <p className="text-base leading-relaxed text-ink/80">
                Klare Linie, keine Saisonware. Eine Form, die nicht aus einem
                Trend entstanden ist, sondern aus der Frage: Was braucht man im
                Alltag wirklich?
              </p>
              <dl className="mt-8 divide-y divide-line border-t border-line">
                {SPECS.map(([term, val]) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-[0.68rem] uppercase tracking-eyebrow text-stone">
                      {term}
                    </dt>
                    <dd className="text-right text-sm text-ink">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Zeile 2: Detailkacheln – jede mit Größenangabe, klickbar */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:mt-8 lg:gap-8">
          {DETAILS.map((img, i) => (
            <Reveal key={img.src} delay={i * 120}>
              <button
                type="button"
                onClick={() => open(img.size, img.src)}
                className="group block w-full cursor-zoom-in text-left"
                aria-label={`Bilder ansehen: ${img.cap}`}
              >
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="img-zoom object-cover"
                    />
                    <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-[0.56rem] uppercase tracking-eyebrow text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      Ansehen
                    </span>
                  </div>
                  <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
                    {img.cap}
                  </figcaption>
                </figure>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Zwei Größen + Vorbestellung */}
        <Reveal>
          <div className="mt-20 max-w-2xl border-t border-line pt-14">
            <h3 className="font-display text-3xl font-normal leading-tight text-ink sm:text-3xl">
              Zwei Größen, dieselbe Form
            </h3>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-stone">
              Die Sling gibt es in zwei Größen — beide mit Innentasche, beide
              unisex und aktuell auf Vorbestellung. Ob über der Schulter oder als
              Crossbody getragen: So findest du die Form, die zu deinem Alltag
              passt. Tipp: Tippe auf eine Größe, um durch alle Bilder zu blättern.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <figure className="mt-10">
            <div className="relative aspect-[3/2] overflow-hidden bg-sand">
              {/* BILD: Größenvergleich beider Größen -> /public/groessen.jpg */}
              <Image
                src="/groessen.jpg"
                alt="Größenvergleich der Sling: oben die kleinere Kompakt, unten die größere Standard, mit Maßband"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
              Größenvergleich — oben die Kompakt, unten die Standard
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {SIZES.map((s, i) => (
            <Reveal key={s.key} delay={i * 120}>
              <div className="flex h-full flex-col bg-paper p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-2xl font-normal text-ink">
                    {s.name}
                  </h4>
                  <span className="font-display text-xl font-normal text-ink">
                    {s.price}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-stone">
                  {s.text}
                </p>
                <p className="mt-6 text-[0.68rem] uppercase tracking-eyebrow text-stone">
                  {s.note}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href="#kontakt"
                    className="inline-flex w-fit items-center gap-2 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Auf die Warteliste
                  </a>
                  <button
                    type="button"
                    onClick={() => open(s.key, GALLERY[s.key][0].src)}
                    className="inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-eyebrow text-cognac transition-colors duration-300 hover:text-cognac-deep"
                  >
                    Bilder ansehen
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-5 max-w-prose text-[0.78rem] leading-relaxed text-stone/80">
            Richtpreise. Versandkosten und alle steuerlichen Angaben erhältst du
            transparent in deinem persönlichen Angebot — die Anfrage ist
            unverbindlich.
          </p>
        </Reveal>

        <Reveal>
          <figure className="mt-16">
            <div className="relative aspect-[3/2] overflow-hidden bg-sand">
              {/* BILD: Farbpalette der Sling -> /public/farben.jpg */}
              <Image
                src="/farben.jpg"
                alt="Mehrere Sling-Taschen in verschiedenen Lederfarben auf einer Lederhaut im Atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
              Auch in weiteren Lederfarben — kleine Chargen
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-stone">
            Ein weiteres Modell ist bereits als Prototyp entworfen. Wie viele
            Stücke die Kollektion am Ende umfasst, entscheidet sich Schritt für
            Schritt — wir kündigen Neues an, sobald es so weit ist.
          </p>
        </Reveal>
      </div>

      {view && (
        <Lightbox
          images={GALLERY[view.size]}
          startIndex={view.index}
          groupTitle={`Sling ${view.size}`}
          onClose={() => setView(null)}
        />
      )}
    </section>
  );
}
