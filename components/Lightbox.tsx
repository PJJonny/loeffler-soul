"use client";

import { useCallback, useEffect } from "react";

export type GalleryImage = { src: string; alt: string; label: string };

/**
 * Schlichter, abhängigkeitsfreier Bild-Viewer (Lightbox).
 * Wiederverwendbar für jede Kollektion: einfach eine Liste von Bildern + Index übergeben.
 * Tastatur: ← / → blättern, Esc schließt. Klick auf den Hintergrund schließt ebenfalls.
 */
export default function Lightbox({
  images,
  index,
  groupTitle,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  index: number;
  groupTitle?: string;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const n = images.length;
  const go = useCallback(
    (d: number) => onChange((index + d + n) % n),
    [index, n, onChange]
  );

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

  if (n === 0) return null;
  const img = images[Math.max(0, Math.min(index, n - 1))];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bilder${groupTitle ? ` — ${groupTitle}` : ""}`}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Schließen"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10"
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
          className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10 sm:left-6"
        >
          <span aria-hidden className="text-2xl leading-none">
            ‹
          </span>
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] max-w-4xl flex-col items-center"
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
            ({index + 1}/{n})
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
          className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream/90 transition hover:bg-cream/10 sm:right-6"
        >
          <span aria-hidden className="text-2xl leading-none">
            ›
          </span>
        </button>
      )}
    </div>
  );
}
