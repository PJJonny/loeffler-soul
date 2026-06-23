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
      src: "/sling-beige.jpg",
      label: "Studio",
      alt: "Die Sling Standard aus pflanzlich gegerbtem, nubukiertem Rindleder in Beige",
    },
    {
      src: "/produkt-detail.jpg",
      label: "Leder & Detail",
      alt: "Detailaufnahme von Narbung, Naht und Prägung der Sling Standard",
    },
    {
      src: "/futter.jpg",
      label: "Innenleben",
      alt: "Geöffnete Sling Standard mit Reißverschluss-Innentasche",
    },
    {
      src: "/innen.jpg",
      label: "Beschläge",
      alt: "Umlaufender Reißverschluss und Karabinerhaken der Sling Standard",
    },
  ],
  Kompakt: [
    {
      src: "/sling-braun.jpg",
      label: "Studio",
      alt: "Die Sling aus pflanzlich gegerbtem, nubukiertem Rindleder in Braun, mit eingeprägtem Logo",
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
  ["Form", "Sling / Crossbody"],
  ["Trageweise", "Vor der Brust oder am Rücken"],
  ["Material", "Pflanzlich gegerbtes, nubukiertes Rindleder"],
  ["Größen", "Standard ca. 45 × 23 cm · Kompakt ca. 30 × 15 cm"],
  ["Innenleben", "Hauptfach mit Innentasche (beide Größen)"],
  ["Beschläge", "Ausgewählte Metallbeschläge, robuster Reißverschluss"],
  ["Fertigung", "In eigener Handarbeit"],
  ["Verfügbarkeit", "Auf Vorbestellung"],
];

// Zwei Größen derselben Form
const SIZES: { key: SizeKey; name: string; maße: string; text: string; note: string }[] = [
  {
    key: "Standard",
    name: "Sling — Standard",
    maße: "Ca. 45 × 23 cm",
    text:
      "Die ursprüngliche Größe. Platz für Geldbörse, Schlüssel, Telefon und alles, was im Alltag noch dazugehört. Ein Platzproblem wird es mit der Sling Standard nicht geben.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
  {
    key: "Kompakt",
    name: "Sling — Kompakt",
    maße: "Ca. 30 × 15 cm",
    text:
      "Eine Nummer kleiner, etwa im Format einer klassischen Bauchtasche. Reduziert auf das Nötigste, noch näher am Körper. Als Crossbody getragen ein stilvoller, unisex Begleiter für den Alltag.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
];

// No. 02 — Luna (Schultertasche)
const LUNA_SPECS: [string, string][] = [
  ["Form", "Schultertasche"],
  ["Trageweise", "Über der Schulter oder am gebeugten Arm"],
  ["Material", "Zweifach geprägtes Büffelleder (Krokodil- und Straußenprägung) - weitere Ledervariationen sind möglich"],
  ["Größe", "Ca. 32 × 25 cm"],
  ["Innenleben", "Hauptfach (geschlossen durch Magnetknopf) mit gesonderter Innentasche mit Reißverschluss"],
  ["Fertigung", "In eigener Handarbeit"],
  ["Verfügbarkeit", "Auf Vorbestellung"],
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
              onClick={() => open("Kompakt", "/sling-braun.jpg")}
              className="group block w-full cursor-zoom-in text-left"
              aria-label="Bilder der Sling ansehen"
            >
              <figure className="relative aspect-[4/3] overflow-hidden bg-sand">
                {/* TITELBILD der Kollektion -> /public/sling-braun.jpg (sauberer Produktshot) */}
                <Image
                  src="/sling-braun.jpg"
                  alt="Die Sling aus pflanzlich gegerbtem, nubukiertem Rindleder in Braun, mit eingeprägtem Logo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-zoom object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
                  Die Sling
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
              Die Sling gibt es in zwei Größen - Standard und Kompakt - beide mit
              gesonderter Innentasche mit Reißverschluss und beide aktuell auf
              Vorbestellung. Ob vor der Brust oder am Rücken getragen: mit der
              Sling hast du eine Tasche die sich an deinen Körper anpasst und dich
              ideal im Alltag begleitet. Tipp: Tippe auf eine Größe, um durch alle
              Bilder zu blättern.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <figure className="mt-10">
            <div className="relative mx-auto aspect-[4/5] max-w-2xl overflow-hidden bg-cream">
              {/* BILD: Größenvergleich beider Größen -> /public/groessen.jpg */}
              <Image
                src="/groessen.jpg"
                alt="Größenvergleich der Sling: oben die kleinere Kompakt, unten die größere Standard"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
              Größenvergleich — Kompakt (ca. 30 × 15 cm) · Standard (ca. 45 × 23 cm)
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
                  <span className="text-[0.74rem] uppercase tracking-wide text-stone">
                    {s.maße}
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
            Preise, Versandkosten und alle steuerlichen Angaben erhältst du
            transparent in deinem persönlichen Angebot — die Anfrage ist
            unverbindlich.
          </p>
        </Reveal>

        {/* No. 02 — Luna */}
        <Reveal>
          <div
            id="luna"
            className="mt-24 max-w-2xl scroll-mt-36 border-t border-line pt-14"
          >
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Die zweite Form
            </p>
            <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              No. 02 — Luna
            </h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Die Luna verbindet feminine Linien mit funktionalem Design. Über
              der Schulter oder am gebeugten Arm getragen, ist sie ein
              vielseitiger Begleiter — für den Alltag ebenso wie für besondere Anlässe.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0} className="lg:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden bg-sand">
              {/* BILD: Luna -> /public/luna.jpg */}
              <Image
                src="/luna.jpg"
                alt="Die Luna Schultertasche aus geprägtem Büffelleder in Dunkelbraun"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-zoom object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
                Luna
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center">
              <p className="text-base leading-relaxed text-ink/80">
                Eine Schultertasche von zeitloser Eleganz: formstabil und
                charaktervoll durch geprägtes Büffelleder — getragen über der
                Schulter oder am Arm.
              </p>
              <dl className="mt-8 divide-y divide-line border-t border-line">
                {LUNA_SPECS.map(([term, val]) => (
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
              <a
                href="#kontakt"
                className="mt-8 inline-flex w-fit items-center gap-2 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Auf die Warteliste
              </a>
            </div>
          </Reveal>
        </div>

        {/* Die ganze Kollektion */}
        <Reveal>
          <figure className="mt-20">
            <div className="relative aspect-[3/2] overflow-hidden bg-cream">
              {/* BILD: Gruppenbild der Kollektion -> /public/kollektion-gruppe.jpg */}
              <Image
                src="/kollektion-gruppe.jpg"
                alt="Die Kollektion von LOEFFLER SOUL: die Luna Schultertasche und die Sling in mehreren Lederfarben"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
              Sling & Luna — auch in weiteren Lederarten und -Farben möglich
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-stone">
            Unsere Kollektion wächst mit Bedacht — jedes Modell und jede Farbe ein bewusstes Versprechen. Neues präsentieren wir, wenn es unseren Anspruch an Qualität und Handwerk erfüllt.
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
