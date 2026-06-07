import Image from "next/image";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section
      id="geschichte"
      className="scroll-mt-36 border-y border-line bg-sand"
    >
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-cognac-deep">
            <span className="h-px w-8 bg-cognac" />
            Die Geschichte hinter LOEFFLER SOUL
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Aus Handwerk, nicht aus einem Businessplan.
          </h2>
        </Reveal>

        <div className="mt-9 space-y-6 text-base leading-relaxed text-ink/80 sm:text-lg">
          <Reveal delay={160}>
            <p>
              Ich nähe, seit ich ein Teenager bin. Mit 18 habe ich während eines
              Freiwilligen Sozialen Jahres in Kenia in einem Schneiderprojekt
              gearbeitet. Dort entstanden an handbetriebenen Nähmaschinen
              wiederverwendbare Hygieneartikel für Frauen. Diese Zeit hat meinen
              Blick auf Material, Handarbeit und Wertschöpfung geprägt — auf das,
              was entsteht, wenn man mit einfachen Mitteln etwas Haltbares macht.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <figure className="mx-auto my-2 max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                {/* BILD: Alina im Schneiderprojekt in Kenia -> /public/kenia.jpg */}
                <Image
                  src="/kenia.jpg"
                  alt="Alina Loeffler näht im Schneiderprojekt in Kenia an einer handbetriebenen Nähmaschine"
                  fill
                  sizes="(max-width: 768px) 100vw, 28rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[0.68rem] uppercase tracking-eyebrow text-stone">
                Schneiderprojekt in Kenia
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={220}>
            <blockquote className="border-l-2 border-cognac py-2 pl-6">
              <p className="font-display text-2xl font-normal leading-snug text-ink sm:text-3xl">
                Ich wollte Dinge machen, die man behält — nicht ersetzt.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={260}>
            <p>
              Danach kamen Studium, Büroalltag, digitale Arbeitswelten. Der
              Wunsch, wieder etwas mit den eigenen Händen zu schaffen, blieb.
              LOEFFLER SOUL ist die Antwort darauf: Produkte, die nicht für eine
              Saison gemacht sind, sondern für viele Jahre. Dinge, die altern
              dürfen, Charakter entwickeln und ihre eigene Geschichte erzählen.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <p className="pt-2 font-display text-lg text-ink/70">
              — Alina Loeffler, Gründerin
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
