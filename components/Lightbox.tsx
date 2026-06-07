"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = { src: string; alt: string; label: string };

/**
 * Robuster, abhängigkeitsfreier Bild-Viewer (Lightbox).
 * - Rendert per Portal direkt an <body>: kein übergeordnetes Element mit
 *   transform/filter/overflow kann das fixed-Overlay stören.
 * - Verwaltet den aktuellen Index selbst: Blättern funktioniert unabhängig
 *   vom Eltern-State zuverlässig.
 * - Tastatur: ← / → blättern, Esc schließt. Klick auf den Hintergrund schließt.
 * Wiederverwendbar für jede Kollektion (einfach images + startIndex übergeben).
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

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bilder${groupTitle ? ` — ${groupTitle}` : ""}`}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Schließen"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10"
      >
        <span aria-hidden className="text-xl leading-none">
          ✕
        </span>
      </button>

      {n > 1 && (
        <button
          type="button"
          aria-label="Vorheriges Bild"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10 sm:left-6"
        >
          <span aria-hidden className="text-2xl leading-none">
            ‹
          </span>
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="m-0 flex max-h-[88vh] max-w-4xl flex-col items-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          className="max-h-[80vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-[0.7rem] uppercase tracking-eyebrow text-cream/80">
          {img.label}
          {groupTitle ? ` · ${groupTitle}` : ""}{" "}
          <span className="text-cream/50">
            ({idx + 1}/{n})
          </span>
        </figcaption>
      </figure>

      {n > 1 && (
        <button
          type="button"
          aria-label="Nächstes Bild"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10 sm:right-6"
        >
          <span aria-hidden className="text-2xl leading-none">
            ›
          </span>
        </button>
      )}
    </div>
  );

  return createPortal(overlay, document.body);
}
