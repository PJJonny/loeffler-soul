import Reveal from "./Reveal";

const PRINCIPLES: { n: string; title: string; text: string }[] = [
  {
    n: "I",
    title: "Ehrlich",
    text: "Wir behaupten nichts, was wir nicht belegen können. Lieber sagen wir offen, wo wir heute stehen — und was noch nicht abschließend geklärt ist.",
  },
  {
    n: "II",
    title: "Langlebig",
    text: "Gebaut, um über Jahre genutzt zu werden. Eine Tasche, die man behält, statt sie zu ersetzen — und die mit der Zeit besser zu einem passt.",
  },
  {
    n: "III",
    title: "Handgefertigt",
    text: "Jede Tasche entsteht aktuell Schritt für Schritt in eigener Hand. Kein Fließband, keine anonyme Serie — sondern einzeln gefertigte Stücke.",
  },
  {
    n: "IV",
    title: "Transparent",
    text: "Wir benennen Herkunft, Material und Grenzen so klar wie möglich. Vertrauen entsteht nicht aus Versprechen, sondern aus Nachvollziehbarkeit.",
  },
];

export default function Principles() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-container px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <p className="mb-12 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
            <span className="h-px w-8 bg-cognac" />
            Wofür wir stehen
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 90}>
              <div className="flex h-full flex-col bg-paper p-8 lg:p-9">
                <span className="font-display text-2xl font-light text-cognac/70">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
