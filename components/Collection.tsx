import Image from "next/image";
import Reveal from "./Reveal";
import { AB_PREIS, SHOP_LINKS } from "@/lib/shop";

/*
  DIE KOLLEKTION
  --------------
  Zwei Karten, eine je Größe – mit Foto, Maßen und Link in den Shop.
  Der Preis steht bewusst nur einmal („ab …“, siehe AB_PREIS in lib/shop.ts),
  nicht auf jeder Karte.

  Fotos (Querformat 4:3, freigestellt auf Creme):
    /public/sling-beige.jpg  → Kompakt
    /public/sling-braun.jpg  → Standard
  Maße wie im Shop angegeben (Breite × Höhe).
*/

const MODELLE = [
  {
    name: "Sling Kompakt",
    masse: "ca. 30 × 15 cm",
    bild: "/sling-beige.jpg",
    alt: "Sling Kompakt in Beige: kleine Ledertasche im Format einer Bauchtasche, mit silbernem Reißverschluss und verstellbarem Gurt",
    text: "Eine Nummer kleiner, etwa im Format einer klassischen Bauchtasche. Platz für Portemonnaie, Smartphone, Schlüssel und Brillenetui – mehr braucht es manchmal nicht.",
    href: SHOP_LINKS.kollektionKompakt,
  },
  {
    name: "Sling Standard",
    masse: "ca. 45 × 23 cm",
    bild: "/sling-braun.jpg",
    alt: "Sling Standard in Braun: große Crossbody-Ledertasche mit silbernem Reißverschluss und breitem, verstellbarem Gurt",
    text: "Die großzügige, ursprüngliche Größe der Sling. Platz für Geldbörse, Schlüssel, Telefon und alles, was im Alltag dazugehört.",
    href: SHOP_LINKS.kollektionStandard,
  },
];

// Fakten rund um den Kauf (Versanddauer laut Versandbedingungen im Shop)
const VERSPRECHEN = [
  { titel: "Von Hand gefertigt", text: "Schritt für Schritt am Bodensee" },
  { titel: "Auch nach Jahren für dich da", text: "Reparaturen prüfen wir individuell" },
  { titel: "Versandfertig in 1–2 Werktagen", text: "Versand innerhalb Deutschlands" },
  { titel: "Persönlich erreichbar", text: "Wir antworten selbst per E-Mail" },
];

export default function Collection() {
  return (
    <section id="kollektion" className="scroll-mt-36 border-t border-line bg-cream">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        {/* Kopf: Text links, Preis rechts */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
                <span className="h-px w-8 bg-cognac" />
                Die Kollektion
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
                Die Sling – eine Form, zwei Größen.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
                Getragen vor der Brust, am Rücken oder als Crossbody liegt sie
                nah am Körper und lässt Bewegungsfreiheit. Jede Tasche ist ein
                Unikat – Leder und Farbe variieren von Stück zu Stück.
              </p>
            </Reveal>
          </div>

          {/* Preis – bewusst nur einmal, für beide Größen */}
          <Reveal delay={240}>
            <div className="lg:text-right">
              <p className="whitespace-nowrap font-display text-3xl font-normal text-ink">
                ab {AB_PREIS}
              </p>
              <p className="mt-2 max-w-xs text-[0.75rem] leading-relaxed text-stone lg:ml-auto">
                Endpreis zzgl.{" "}
                <a
                  href={SHOP_LINKS.versandkosten}
                  className="underline decoration-stone/40 underline-offset-2 transition-colors duration-300 hover:text-ink hover:decoration-ink"
                >
                  Versandkosten
                </a>
                . Gemäß §&nbsp;19 UStG wird keine Umsatzsteuer berechnet.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Zwei Karten – die ganze Karte ist klickbar */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {MODELLE.map((m, i) => (
            <Reveal key={m.name} delay={i * 120} className="h-full">
              <article className="group relative flex h-full flex-col border border-line bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={m.bild}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 660px"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-normal text-ink">
                      {m.name}
                    </h3>
                    <p className="text-sm text-stone">{m.masse}</p>
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-stone">
                    {m.text}
                  </p>
                  <a
                    href={m.href}
                    aria-label={`${m.name} im Shop ansehen`}
                    className="mt-8 inline-flex w-fit items-center gap-3 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 after:absolute after:inset-0 group-hover:bg-ink group-hover:text-cream"
                  >
                    Im Shop ansehen
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Was beim Kauf zählt – ruhig, ohne Icons */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 text-sm leading-snug text-ink/80 lg:grid-cols-4 lg:gap-8">
          {VERSPRECHEN.map((v) => (
            <li key={v.titel}>
              <span className="block text-ink">{v.titel}</span>
              <span className="mt-1 block text-[0.8rem] text-stone">{v.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
