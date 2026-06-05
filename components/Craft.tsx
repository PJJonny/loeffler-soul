import Reveal from "./Reveal";

const STEPS: { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Zuschnitt",
    text: "Jedes Teil wird einzeln aus der Haut geschnitten. Schon hier entscheidet sich, wie die Tasche später sitzt.",
  },
  {
    n: "02",
    title: "Vorbereitung",
    text: "Kanten anlegen, markieren, vorbereiten. Die ruhige Arbeit, die man später nicht sieht, aber spürt.",
  },
  {
    n: "03",
    title: "Nähen",
    text: "Naht für Naht von Hand geführt — gleichmäßig, fest, ohne Eile.",
  },
  {
    n: "04",
    title: "Kanten & Details",
    text: "Kanten werden gearbeitet, Beschläge gesetzt, Übergänge sauber gefasst.",
  },
  {
    n: "05",
    title: "Endmontage",
    text: "Die einzelnen Teile werden zusammengeführt. Aus Zuschnitten wird eine Tasche.",
  },
  {
    n: "06",
    title: "Finale Kontrolle",
    text: "Jede Tasche wird einzeln geprüft, bevor sie das Atelier verlässt.",
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
            <h2 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
              Sechs bis acht Stunden,
              <br className="hidden sm:block" /> ein Paar Hände.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-stone sm:text-lg">
              Von der ersten Schnittlinie bis zur letzten Naht entsteht jede
              Tasche aktuell in eigener Handarbeit — Schritt für Schritt,
              einzeln, ohne Fließband.
            </p>
          </Reveal>
        </div>

        {/* Prozessschritte */}
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={(i % 3) * 100}>
              <div className="group h-full bg-paper p-8 transition-colors duration-500 hover:bg-cream">
                <span className="font-display text-3xl font-light text-cognac/70">
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

        <Reveal delay={150}>
          <p className="mt-8 text-[0.72rem] uppercase tracking-wide text-stone">
            6–8 Stunden reine Handarbeit · 6 Arbeitsschritte · aktuell jede
            Tasche von mir selbst gefertigt
          </p>
        </Reveal>
      </div>
    </section>
  );
}
