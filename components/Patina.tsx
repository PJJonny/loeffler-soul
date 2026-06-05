import Image from "next/image";
import Reveal from "./Reveal";

export default function Patina() {
  return (
    <section className="bg-espresso text-cream">
      <div className="mx-auto grid max-w-container items-stretch gap-0 lg:grid-cols-2">
        {/* Bild */}
        <Reveal className="relative">
          <figure className="group relative h-72 w-full overflow-hidden bg-cognac-deep sm:h-96 lg:h-full lg:min-h-[34rem]">
            {/* BILD: Leder-Detail, das Patina zeigt -> /public/produkt-detail.jpg */}
            <Image
              src="/produkt-detail.jpg"
              alt="Pflanzlich gegerbtes Vollnarbenleder mit beginnender Patina"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-zoom object-cover"
            />
          </figure>
        </Reveal>

        {/* Text */}
        <div className="flex items-center px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="max-w-prose">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-cream/60">
                <span className="h-px w-8 bg-cognac" />
                Designed to Age
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-3xl font-light leading-tight sm:text-[2.7rem]">
                Die Tasche wird nicht verbraucht.
                <br />
                Sie wird <span className="text-cognac">persönlicher</span>.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-cream/80">
                <p>
                  Pflanzlich gegerbtes Vollnarbenleder hat eine natürliche,
                  offene Oberfläche. Gebrauch, Sonnenlicht und Berührung
                  verändern sie — langsam, sichtbar, unverwechselbar.
                </p>
                <p>
                  Was als gleichmäßige Fläche beginnt, bekommt mit der Zeit
                  Tiefe. Gebrauchsspuren werden nicht zum Makel, sondern Teil
                  der Geschichte. Keine zwei Taschen altern gleich.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
