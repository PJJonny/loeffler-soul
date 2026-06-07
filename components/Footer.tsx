
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
              href="mailto:loefflersoul@gmail.com"
              className="link-underline mt-6 inline-block text-sm text-cream/70"
            >
              loefflersoul@gmail.com
            </a>
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
