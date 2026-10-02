import { INSTAGRAM_URL, SHOP_LINKS } from "@/lib/shop";

const LINKS = [
  { label: "Kollektion", href: "/#kollektion" },
  { label: "Handwerk", href: "/#handwerk" },
  { label: "Materialien", href: "/#materialien" },
  { label: "Geschichte", href: "/#geschichte" },
  { label: "Kontakt", href: "/#kontakt" },
];

const LEGAL = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Kontakt", href: "/#kontakt" },
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
];

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-container px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          {/* Marke */}
          <div>
            <p className="font-display text-2xl leading-none tracking-[0.16em] text-cream">
              <span className="font-medium">LOEFFLER</span>{" "}
              <span className="font-normal">SOUL</span>
            </p>
            <p className="mt-6 max-w-xs font-display text-xl font-normal leading-snug text-cream/90">
              Handgefertigte Taschen mit Charakter.
            </p>
            <a
              href="mailto:info@loefflersoul.de"
              className="link-underline mt-6 inline-block text-sm text-cream/70"
            >
              info@loefflersoul.de
            </a>
            <div className="mt-8">
              <a
                href={SHOP_LINKS.footerButton}
                className="group inline-flex items-center gap-3 border border-cream/30 px-6 py-3 text-[0.7rem] uppercase tracking-eyebrow text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-espresso"
              >
                Zum Shop
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer-Navigation">
            <p className="text-[0.66rem] uppercase tracking-eyebrow text-cream/40">
              Entdecken
            </p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline text-sm text-cream/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rechtliches & Social */}
          <div>
            <p className="text-[0.66rem] uppercase tracking-eyebrow text-cream/40">
              Mehr
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-underline text-sm text-cream/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-7 text-[0.72rem] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LOEFFLER SOUL · Alina Loeffler</p>
          <p>Handgefertigt in kleinen Chargen.</p>
        </div>
      </div>
    </footer>
  );
}
