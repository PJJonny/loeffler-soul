import Reveal from "./Reveal";

const LINES = [
  "LOEFFLER SOUL steht für Produkte mit Seele.",
  "Für Dinge, die genutzt werden wollen.",
  "Für Materialien, die altern dürfen.",
  "Für Handwerk, das sichtbar bleibt.",
];

export default function Manifest() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <Reveal>
          <p className="mb-10 text-[0.7rem] uppercase tracking-eyebrow text-cognac-deep">
            Das Versprechen
          </p>
        </Reveal>
        <div className="space-y-3 sm:space-y-4">
          {LINES.map((line, i) => (
            <Reveal key={line} delay={i * 140}>
              <p className="font-display text-2xl font-light leading-snug text-ink sm:text-[2.1rem] lg:text-[2.6rem]">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
