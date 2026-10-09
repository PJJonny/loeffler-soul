import Reveal from "./Reveal";

const STEPS: { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Zuschnitt",
    text: "Jedes Teil wird einzeln aus der Haut geschnitten. Schon hier entscheidet sich, wie die Tasche später aussieht. Durch die individuelle Oberflächenstruktur des Leders entsteht bereits hier ein echtes Unikat.",
  },
  {
    n: "02",
    title: "Vorbereitung",
    text: "Kanten schärfen, umlegen und präzise vorbereiten. Hier entsteht die Grundlage für saubere Linien, exakte Passformen und die Qualität, die später überzeugt.",
  },
  {
    n: "03",
    title: "Nähen",
    text: "Naht für Naht von Hand geführt — gleichmäßig und ohne Eile.",
  },
  {
    n: "04",
    title: "Branding & Details",
    text: "Die Tasche wird mit dem LOEFFLER SOUL Logo versehen, Beschläge eingearbeitet und Übergänge sauber erfasst.",
  },
  {
    n: "05",
    title: "Sauberes Finish",
    text: "Die einzelnen Teile werden zusammengeführt und die offenen Kanten gefärbt und versiegelt. Aus Zuschnitten wird eine fertige Tasche.",
  },
  {
    n: "06",
    title: "Finale Kontrolle",
    text: "Jede Tasche wird einzeln geprüft, bevor sie das Atelier verlässt. Wir wollen sichergehen, dass die Qualität den höchsten Standards entspricht und die Erwartungen unserer Kunden erfüllt.",
  },
];

export default function Craft() {
  return (
    <section id="handwerk" className="scroll-mt-36 border-t border-line bg-paper">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
              <span className="h-px w-8 bg-cognac" />
              Handwerk
            </p>
          </Reveal>
          <Reveal delay={100}>
            {/* PERSÖNLICHE AUSSAGE (2 von 2): stimmt, solange jede Tasche
                komplett von einer Person gefertigt wird. Sonst z. B.:
                „Sechs bis acht Stunden reine Handarbeit.“
                Siehe README, Abschnitt „Wenn weitere Hände mitfertigen“. */}
            <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Sechs bis acht Stunden,
              <br className="hidden sm:block" /> ein Paar Hände.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Vom ersten Schnitt bis zur letzten Naht entsteht jede Tasche in
              Handarbeit am Bodensee — Schritt für Schritt, ohne Fließband.
            </p>
          </Reveal>
        </div>

        {/* Prozessschritte */}
        {/* Trennlinien als Rahmen je Feld (bleiben auch während der
            Einblend-Animation exakt 1 px breit) */}
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={(i % 3) * 100}>
              <div className="group h-full border-b border-r border-line bg-paper p-8 transition-colors duration-500 hover:bg-cream">
                <span className="font-display text-3xl font-normal text-cognac/70">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* PERSÖNLICHE AUSSAGE (1 von 2): nur wahr, solange Alina jede
            Tasche selbst fertigt. Fertigen weitere Hände mit, an diesem Tag
            ersetzen, z. B. durch „Gefertigt in Handarbeit am Bodensee – von
            Alina Loeffler und ihrem Team.“
            Siehe README, Abschnitt „Wenn weitere Hände mitfertigen“. */}
        <Reveal delay={150}>
          <p className="mt-8 flex items-start gap-3 text-sm text-stone">
            <span aria-hidden="true" className="mt-2.5 h-px w-8 shrink-0 bg-cognac" />
            <span>
              Jede Tasche fertigt{" "}
              <span className="text-ink">Alina Loeffler</span> selbst – vom
              Zuschnitt bis zur finalen Kontrolle.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
