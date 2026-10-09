import Image from "next/image";
import Reveal from "./Reveal";

const FACTS: [string, string][] = [
  ["Hauptleder", "Pflanzlich gegerbtes, nubukiertes Rindleder"],
  ["Weitere Leder", "Master Büffelnappa & geprägtes Büffelleder"],
  ["Gerbung", "Je nach Lederart – siehe Produktbeschreibung"],
  ["Herkunft", "Bezug über einen Großhändler in Süddeutschland"],
  ["Beschläge", "Ausgewählte Metallbeschläge, robuster Reißverschluss"],
  ["Produktion", "Kleine Chargen, keine Massenproduktion"],
  ["Reparatur", "Auch nach Jahren prüfen wir individuelle Lösungen"],
];

// Details aus der Nähe (Hochformat 3:4, /public)
const DETAILS = [
  {
    src: "/produkt-detail.jpg",
    alt: "Nahaufnahme der Sling: Leder, Naht und Reißverschluss",
    cap: "Leder, Naht und Prägung",
  },
  {
    src: "/innen.jpg",
    alt: "Nahaufnahme von Karabinerhaken, Gurt und Reißverschluss der Sling",
    cap: "Karabiner und Reißverschluss",
  },
  {
    src: "/futter.jpg",
    alt: "Geöffnete Sling mit geblümtem Innenfutter",
    cap: "Innenleben, je nach Modell",
  },
];

export default function Materials() {
  return (
    <section id="materialien" className="scroll-mt-36 bg-cream">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Materialien & Herkunft
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Wir benennen, was wir wissen.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Prosa */}
          <Reveal delay={0} className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-ink/80">
              <p>
                Für unsere Taschen verwenden wir sorgfältig ausgewählte Leder,
                die wir ausschließlich über einen süddeutschen Großhändler
                beziehen. Je nach Modell und Farbe kommen unterschiedliche
                Lederarten zum Einsatz. Welches Leder eine Tasche hat, steht
                genau in ihrer Produktbeschreibung im Shop.
              </p>
              <p>
                Der größte Teil unserer Taschen entsteht aus pflanzlich
                gegerbtem Rindleder mit samtig-weicher, offenporiger Oberfläche
                und integriertem Fleckschutz. Es wird chromfrei, metallfrei und
                ohne erdölbasierte Gerbstoffe hergestellt. Das Leder entsteht
                als Nebenprodukt der Lebensmittelindustrie – die Tiere werden
                nicht eigens für die Ledergewinnung gehalten.
              </p>
              <p>
                Leder ist ein natürliches, langlebiges Material, und jedes
                bringt seine eigene Haptik und Struktur mit. Wir möchten Taschen
                schaffen, die nicht nach einer Saison ersetzt werden, sondern
                mit der Zeit ihren eigenen Charakter entwickeln.
              </p>
            </div>
          </Reveal>

          {/* Fakten */}
          <Reveal delay={120} className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {FACTS.map(([term, val]) => (
                <div key={term} className="py-4">
                  <dt className="text-[0.66rem] uppercase tracking-eyebrow text-stone">
                    {term}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] text-ink">{val}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Details aus der Nähe */}
        <Reveal>
          <ul className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {DETAILS.map((d) => (
              <li key={d.src}>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1400px) 30vw, 420px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.72rem] leading-snug text-stone sm:text-sm">
                    {d.cap}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
