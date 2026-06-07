import Reveal from "./Reveal";

const FACTS: [string, string][] = [
  ["Leder", "Pflanzlich gegerbtes Vollnarbenleder"],
  ["Herkunft", "Rinder aus dem DACH-Raum"],
  ["Bezug", "Ledermanufaktur Geiser Leder, Süddeutschland"],
  ["Weitere Leder", "Ausgewählte Nubuk- & Büffelleder"],
  ["Beschläge", "Ausgewählte Metallbeschläge, robuster Reißverschluss"],
  ["Produktion", "Kleine Chargen, keine Massenproduktion"],
];

const NOTES: { title: string; text: string }[] = [
  {
    title: "Beschläge",
    text: "Ausgewählte Metallbeschläge und ein robuster Reißverschluss — nach Funktionalität, Haltbarkeit und stimmigem Gesamtbild gewählt.",
  },
  {
    title: "Reparatur",
    text: "Unsere Taschen sind so konstruiert, dass sie lange genutzt werden können. Sollte nach Jahren intensiver Nutzung eine Reparatur nötig werden, prüfen wir individuelle Lösungen.",
  },
  {
    title: "Auflage",
    text: "Wir produzieren bewusst in kleinen Chargen und begrenzten Auflagen — jede Tasche mit Zeit und Aufmerksamkeit gefertigt.",
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
                Die aktuelle Tasche entsteht aus pflanzlich gegerbtem
                Vollnarbenleder mit natürlicher Oberfläche. Das Leder stammt von
                Rindern aus dem DACH-Raum und wird über die süddeutsche
                Ledermanufaktur Geiser Leder bezogen.
              </p>
              <p>
                Die Herkunft ist regional nachvollziehbar — aktuell jedoch noch
                nicht bis zum einzelnen Hof rückverfolgbar. Das sagen wir lieber
                offen, als mehr zu behaupten, als wir sicher wissen.
              </p>
              <p>
                Leder ist ein Nebenprodukt der Lebensmittelwirtschaft. Die Tiere
                werden nicht ausschließlich für Leder gehalten; wir nutzen ein
                bereits vorhandenes Material so sinnvoll wie möglich. Für uns
                bedeutet bewusster Umgang vor allem: Langlebigkeit, kleine
                Chargen und keine saisonale Wegwerfmode.
              </p>
              <p>
                Je nach Kollektion verwenden wir zudem ausgewählte Nubuk- und
                Büffelleder aus dem Sortiment von Geiser Leder.
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

        {/* Ehrliche Notizen */}
        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {NOTES.map((note, i) => (
            <Reveal key={note.title} delay={i * 100}>
              <div className="h-full bg-cream p-8">
                <h3 className="font-display text-lg text-ink">{note.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {note.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
