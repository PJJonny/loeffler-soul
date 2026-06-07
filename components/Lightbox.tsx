"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = { src: string; alt: string; label: string };

/**
 * Robuster, abhängigkeitsfreier Bild-Viewer (Lightbox).
 * - Rendert per Portal direkt an <body>: kein übergeordnetes Element kann
 *   das fixed-Overlay stören.
 * - Verwaltet den aktuellen Index selbst -> Blättern funktioniert zuverlässig.
 * - Pfeile kleben am Bildrand (auf jeder Bildschirmgröße sichtbar), mit
 *   kräftigem Hintergrund. Bildtitel in gut lesbarem Feld.
 * - Tastatur: ← / → blättern, Esc schließt. Klick auf den Hintergrund schließt.
 */
export default function Lightbox({
  images,
  startIndex = 0,
  groupTitle,
  onClose,
}: {
  images: GalleryImage[];
  startIndex?: number;
  groupTitle?: string;
  onClose: () => void;
}) {
  const n = images.length;
  const [i, setI] = useState(startIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setI(startIndex), [startIndex]);

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  if (!mounted || n === 0) return null;
  const idx = ((i % n) + n) % n;
  const img = images[idx];

  const navBtn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-ink/55 text-cream ring-1 ring-cream/40 backdrop-blur-sm transition hover:bg-ink/80 sm:h-14 sm:w-14";

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bilder${groupTitle ? ` — ${groupTitle}` : ""}`}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center gap-5 bg-ink/95 p-4 backdrop-blur-sm sm:p-6"
    >
      {/* Schließen */}
      <button
        type="button"
        aria-label="Schließen"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/40 backdrop-blur-sm transition hover:bg-cream/25"
      >
        <span aria-hidden className="text-xl leading-none">
          ✕
        </span>
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="m-0 flex flex-col items-center gap-4"
      >
        {/* Bild + Pfeile (Pfeile kleben am Bildrand) */}
        <div className="relative inline-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="block max-h-[78vh] w-auto max-w-[88vw] rounded-sm object-contain shadow-2xl"
          />

          {n > 1 && (
            <>
              <button
                type="button"
                aria-label="Vorheriges Bild"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-3 ${navBtn}`}
              >
                <span aria-hidden className="text-2xl leading-none">
                  ‹
                </span>
              </button>

              <button
                type="button"
                aria-label="Nächstes Bild"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-3 ${navBtn}`}
              >
                <span aria-hidden className="text-2xl leading-none">
                  ›
                </span>
              </button>
            </>
          )}
        </div>

        {/* Bildtitel – klar lesbares Feld */}
        <figcaption className="rounded-full bg-ink/75 px-5 py-2 text-center text-[0.72rem] uppercase tracking-eyebrow text-cream ring-1 ring-cream/15">
          {img.label}
          {groupTitle ? ` · ${groupTitle}` : ""}{" "}
          <span className="text-cream/60">
            ({idx + 1}/{n})
          </span>
        </figcaption>
      </figure>
    </div>
  );

  return createPortal(overlay, document.body);
}
