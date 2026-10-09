import Image from "next/image";
import Reveal from "./Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/shop";

/*
  AUS DEM ATELIER – NEUE ENTWÜRFE
  -------------------------------
  Bewusst ruhig und knapp: Das Handwerk bleibt das Versprechen, KI ist ein
  Werkzeug beim Entwerfen – keine Schlagzeile. Die Entwürfe sind klar als
  solche markiert (keine fertigen Produkte). Der Aufruf zum Feedback zeigt,
  welcher Entwurf am meisten gefragt ist.

  Bilder (quadratisch): /public/entwurf-falte01.jpg, entwurf-ufer02.jpg,
  entwurf-gondel02.jpg. Kommt ein Modell in die Kollektion, hier entfernen
  und im Bereich „Die Kollektion“ ergänzen.
*/

const ENTWUERFE = [
  {
    name: "FALTE 01",
    text: "Henkeltasche mit diagonaler Falte",
    bild: "/entwurf-falte01.jpg",
    alt: "Entwurfszeichnung FALTE 01: Henkeltasche mit diagonaler Falte",
  },
  {
    name: "UFER 02",
    text: "Schultertasche mit geschwungenem Vorderfach",
    bild: "/entwurf-ufer02.jpg",
    alt: "Entwurfsvisualisierung UFER 02: Schultertasche aus braunem Nubuk mit geschwungenem Vorderfach",
  },
  {
    name: "GONDEL 02",
    text: "Sichelförmige Schultertasche",
    bild: "/entwurf-gondel02.jpg",
    alt: "Entwurfsvisualisierung GONDEL 02: sichelförmige Schultertasche in Taupe, an einem Haken hängend",
  },
];

export default function Innovation() {
  return (
    <section id="entwuerfe" className="scroll-mt-36 border-t border-line bg-paper">
      {/* Reihenfolge am Handy: Text → Entwürfe → Feedback-Button.
          Ab Desktop: Text und Button links, Entwürfe rechts. */}
      <div className="mx-auto grid max-w-container gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-8 lg:py-28">
        <Reveal className="lg:self-end">
          <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
            <span className="h-px w-8 bg-cognac" />
            Aus dem Atelier
          </p>
          <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Neue Entwürfe in Arbeit.
          </h2>
          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-stone">
            <p>
              Drei neue Modelle befinden sich gerade in Entwicklung und
              Umsetzungsprüfung. Beim Entwerfen und bei den Schnittmustern
              arbeiten wir mit unserer handwerklichen Erfahrung und mit moderner
              KI. Ob ein Entwurf in die Kollektion kommt, entscheidet sich am
              echten Leder – genäht wird weiterhin jede Tasche von Hand.
            </p>
            <p>
              Wir wollen uns ständig weiterentwickeln. Welcher Entwurf gefällt
              dir? Dein Feedback hilft uns bei der Entscheidung.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <ul className="grid grid-cols-3 gap-3 sm:gap-5">
            {ENTWUERFE.map((e) => (
              <li key={e.name}>
                <figure>
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <Image
                      src={e.bild}
                      alt={e.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 240px"
                      className="object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-0.5 text-[0.62rem] text-ink">
                      Entwurf
                    </span>
                  </div>
                  <figcaption className="mt-3">
                    <span className="block font-display text-[0.95rem] leading-tight text-ink sm:text-lg">
                      {e.name}
                    </span>
                    <span className="mt-1 block text-[0.72rem] leading-snug text-stone sm:text-[0.8rem]">
                      {e.text}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.72rem] text-stone/80">
            Abbildungen sind Entwurfsvisualisierungen, Namen sind Arbeitstitel.
          </p>
        </Reveal>

        <Reveal delay={160} className="lg:self-start">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="/#kontakt"
              className="inline-flex items-center border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              Feedback geben
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-ink/80"
            >
              {INSTAGRAM_HANDLE} folgen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
