import Image from "next/image";
import Reveal from "./Reveal";
import { ZoomImage, type LightboxItem } from "./Lightbox";

const FACTS: [string, string][] = [
  ["Hauptleder", "Pflanzlich gegerbtes, nubukiertes Rindleder"],
  ["Weitere Leder", "Master Büffelnappa & geprägtes Büffelleder"],
  ["Gerbung", "Je nach Lederart – siehe Produktbeschreibung"],
  ["Herkunft", "Bezug über einen Großhändler in Süddeutschland"],
  ["Beschläge", "Ausgewählte Metallbeschläge, robuster Reißverschluss"],
  ["Produktion", "Kleine Chargen, keine Massenproduktion"],
  ["Reparatur", "Auch nach Jahren prüfen wir individuelle Lösungen"],
];

// Details aus der Nähe (Querformat 4:3, Fotos aus dem Onlineshop) – öffnen
// die Großansicht. Bei neuen Fotos width/height anpassen (Pixelmaße der Datei).
const DETAILS: LightboxItem[] = [
  {
    src: "/detail-praegung.jpg",
    alt: "Nahaufnahme der Sling in Taupe: geprägtes LOEFFLER-SOUL-Logo, Nähte und silberner Reißverschluss",
    caption: "Leder, Naht und Prägung",
    width: 1448,
    height: 1086,
  },
  {
    src: "/detail-gurt.jpg",
    alt: "Nahaufnahme: Der Ledergurt läuft durch einen Vierkantring direkt in die Tasche, mit sichtbaren Nähten",
    caption: "Gurtansatz mit Vierkantring",
    width: 1403,
    height: 1052,
  },
  {
    src: "/detail-innen.jpg",
    alt: "Geöffnete Sling aus braunem, strukturiertem Leder mit braunem Innenfutter und Reißverschlussfach",
    caption: "Innenleben, je nach Modell",
    width: 1448,
    height: 1086,
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

        {/* Details aus der Nähe – am Handy wischbar, ab Tablet nebeneinander */}
        <Reveal>
          <ul
            aria-label="Fotos: Details der Sling"
            className="scrollbar-none -mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 lg:gap-8"
          >
            {DETAILS.map((d, i) => (
              <li key={d.src} className="w-[84%] shrink-0 snap-start sm:w-auto">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <ZoomImage items={DETAILS} index={i}>
                      <Image
                        src={d.src}
                        alt={d.alt}
                        fill
                        sizes="(max-width: 640px) 84vw, (max-width: 1400px) 32vw, 440px"
                        className="img-zoom object-cover"
                      />
                    </ZoomImage>
                  </div>
                  <figcaption className="mt-3 text-sm leading-snug text-stone">
                    {d.caption}
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
