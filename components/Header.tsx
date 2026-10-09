"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { SHOP_LINKS } from "@/lib/shop";

const NAV = [
  { label: "Kollektion", href: "/#kollektion" },
  { label: "Handwerk", href: "/#handwerk" },
  { label: "Materialien", href: "/#materialien" },
  { label: "Geschichte", href: "/#geschichte" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollsperre, wenn das Mobile-Menü offen ist
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled || open
          ? "bg-cream/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex max-w-container items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3"
      >
        <a href="/#hero" className="text-ink" aria-label="LOEFFLER SOUL – Startseite">
          <Logo
            className={`w-auto transition-all duration-500 ease-soft ${
              scrolled ? "h-16 sm:h-24" : "h-24 sm:h-32"
            }`}
          />
        </a>

        {/* Desktop-Navigation */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-[0.8rem] uppercase tracking-wide text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Oben dezent umrandet (der Hero-Button trägt das Gewicht),
              nach dem Scrollen dunkel – dann ist er der Weg in den Shop.
              Auch am Handy sichtbar; bei offenem Menü übernimmt der Button im Menü. */}
          <a
            href={SHOP_LINKS.headerButton}
            className={`border px-4 py-2 text-[0.66rem] uppercase tracking-eyebrow transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[0.72rem] ${
              open ? "invisible" : "inline-block"
            } ${
              scrolled
                ? "border-ink bg-ink text-cream hover:border-espresso hover:bg-espresso"
                : "border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream"
            }`}
          >
            Zum Shop
          </a>

          {/* Mobile-Menü-Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="relative h-6 w-7 lg:hidden"
          >
            <span
              className={`absolute left-0 h-px w-full bg-ink transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-ink transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-ink transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile-Menü-Overlay */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-cream transition-[max-height] duration-500 ease-soft lg:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {NAV.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="py-5">
            <a
              href={SHOP_LINKS.menueButton}
              onClick={() => setOpen(false)}
              className="inline-block bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-eyebrow text-cream"
            >
              Zum Shop
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
