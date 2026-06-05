import Image from "next/image";
import Reveal from "./Reveal";

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
const SIZES: { name: string; price: string; text: string; note: string }[] = [
  {
    name: "Sling — Standard",
    price: "429 €",
    text:
      "Die ursprüngliche Größe. Platz für Geldbörse, Schlüssel, Telefon und das, was im Alltag mitkommt.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
  {
    name: "Sling — Kompakt",
    price: "349 €",
    text:
      "Eine Nummer kleiner, etwa im Format einer klassischen Bauchtasche. Reduziert auf das Nötige, noch näher am Körper.",
    note: "Mit Innentasche · Auf Vorbestellung",
  },
];

const DETAILS = [
  {
    src: "/produkt-detail.jpg",
    alt: "Detail: Narbung, Naht und Prägung des Leders",
    cap: "Leder & Detail",
  },
  {
    src: "/getragen.jpg",
    alt: "Die Sling körpernah getragen",
    cap: "Am Körper",
  },
  {
    src: "/innen.jpg",
    alt: "Umlaufender Reißverschluss und Karabinerhaken",
    cap: "Beschläge",
  },
];

export default function Collection() {
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
            <h2 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
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

        {/* Zeile 1: große Frontansicht + Beschreibung & Eckdaten */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0} className="lg:col-span-7">
            <figure className="group relative aspect-[4/3] overflow-hidden bg-sand">
              {/* BILD: Frontansicht der Tasche -> /public/produkt-front.jpg (Querformat 4:3) */}
              <Image
                src="/produkt-front.jpg"
                alt="Frontansicht der LOEFFLER SOUL Sling aus Vollnarbenleder"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-zoom object-cover"
              />
            </figure>
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

        {/* Zeile 2: Detail · getragen · Beschläge */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:mt-8 lg:gap-8">
          {DETAILS.map((img, i) => (
            <Reveal key={img.src} delay={i * 120}>
              <figure className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  {/* BILD: ersetze die Datei in /public mit gleichem Namen */}
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
                  {img.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Zwei Größen + Vorbestellung */}
        <Reveal>
          <div className="mt-20 max-w-2xl border-t border-line pt-14">
            <h3 className="font-display text-3xl font-light leading-tight text-ink sm:text-3xl">
              Zwei Größen, dieselbe Form
            </h3>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-stone">
              Die Sling gibt es in zwei Größen — beide mit Innentasche, beide
              aktuell auf Vorbestellung. So findest du die Tasche, die zu deinem
              Alltag passt.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {SIZES.map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <div className="flex h-full flex-col bg-paper p-8 sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="font-display text-2xl font-light text-ink">
                  {s.name}
                </h4>
                <span className="font-display text-xl font-light text-ink">
                  {s.price}
                </span>
              </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-stone">
                  {s.text}
                </p>
                <p className="mt-6 text-[0.68rem] uppercase tracking-eyebrow text-stone">
                  {s.note}
                </p>
                <a
                  href="#kontakt"
                  className="mt-5 inline-flex w-fit items-center gap-2 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Auf die Warteliste
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-stone">
            Ein weiteres Modell ist bereits als Prototyp entworfen. Wie viele
            Stücke die Kollektion am Ende umfasst, entscheidet sich Schritt für
            Schritt — wir kündigen Neues an, sobald es so weit ist.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
