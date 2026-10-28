"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/*
  GROSSANSICHT (LIGHTBOX)
  -----------------------
  Jedes Foto der Seite lässt sich anklicken bzw. antippen und groß ansehen.

  - Blättern: Pfeile, Pfeiltasten, Wischen (Handy), Miniaturen (Desktop)
  - Schließen: ✕, Esc, Klick neben das Bild, nach unten wischen und die
    Zurück-Taste bzw. -Geste am Handy
  - Zoom: am Desktop ins Bild klicken (der Ausschnitt folgt der Maus),
    am Handy wie gewohnt mit zwei Fingern
  - barrierearm: echter Dialog, der Fokus bleibt darin und springt danach
    zurück zum Bild; Screenreader hören „Bild 2 von 4“
  - respektiert die Systemeinstellung „Bewegung reduzieren“

  Verwendung in einem Abschnitt:
    <div className="relative aspect-[3/4] overflow-hidden">
      <ZoomImage items={BILDER} index={i}>
        <Image src=… fill … />
      </ZoomImage>
    </div>
  items = alle Bilder der Gruppe (zum Blättern), index = dieses Bild.
*/

export type LightboxItem = {
  src: string;
  alt: string;
  /** kurze Bildunterschrift in der Großansicht */
  caption?: string;
  /** Maße der Bilddatei in Pixeln (für das Seitenverhältnis) */
  width: number;
  height: number;
};

type OpenFn = (items: LightboxItem[], index: number) => void;

const LightboxContext = createContext<OpenFn | null>(null);

/** Einmal um den Seiteninhalt legen (app/page.tsx). */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback<OpenFn>((items, index) => {
    if (!items.length) return;
    const active = document.activeElement;
    trigger.current = active instanceof HTMLElement ? active : null;
    setState({ items, index: Math.min(Math.max(index, 0), items.length - 1) });
  }, []);

  const close = useCallback(() => {
    setState(null);
    const el = trigger.current;
    trigger.current = null;
    if (el) window.requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state ? <Viewer items={state.items} start={state.index} onClose={close} /> : null}
    </LightboxContext.Provider>
  );
}

/**
 * Macht ein Bild anklickbar. Füllt den (relativ positionierten) Bildrahmen
 * vollständig aus; das Bild selbst kommt als children hinein.
 */
export function ZoomImage({
  items,
  index = 0,
  label,
  small = false,
  children,
}: {
  items: LightboxItem[];
  index?: number;
  /** Text für Screenreader; Standard: „Bild vergrößern: <Bildunterschrift>“ */
  label?: string;
  /** kleinere Lupe für kleine Bildkacheln */
  small?: boolean;
  children: ReactNode;
}) {
  const open = useContext(LightboxContext);
  const item = items[index];
  const lupe = small
    ? "bottom-1.5 right-1.5 h-6 w-6 sm:bottom-2.5 sm:right-2.5 sm:h-8 sm:w-8"
    : "bottom-2.5 right-2.5 h-8 w-8 sm:bottom-3 sm:right-3 sm:h-9 sm:w-9";
  return (
    <button
      type="button"
      onClick={() => open?.(items, index)}
      aria-haspopup="dialog"
      aria-label={label ?? `Bild vergrößern: ${item?.caption ?? item?.alt ?? ""}`}
      className="group group/zoom absolute inset-0 block h-full w-full cursor-zoom-in"
    >
      {children}
      {/* Lupe: am Desktop beim Darüberfahren, am Handy immer sichtbar */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute flex items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 shadow-[0_2px_12px_rgba(33,28,23,0.18)] transition duration-300 ease-soft group-hover/zoom:scale-105 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 [@media(hover:none)]:opacity-90 ${lupe}`}
      >
        <ExpandIcon className={small ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */

const ZOOM = 2.2;
const SIZES = "(max-width: 640px) 100vw, 75vw";

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [query]);
  return match;
}

type Gesture = { id: number; x: number; y: number; t: number; axis: "" | "x" | "y" };

function Viewer({
  items,
  start,
  onClose,
}: {
  items: LightboxItem[];
  start: number;
  onClose: () => void;
}) {
  const n = items.length;
  const [index, setIndex] = useState(start);
  const [dir, setDir] = useState<-1 | 0 | 1>(0);
  const [shown, setShown] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [settle, setSettle] = useState(false);

  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const finePointer = useMedia("(hover: hover) and (pointer: fine)");

  const root = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const pointerType = useRef("mouse");
  const swallowClick = useRef(false);
  const pushed = useRef(false);
  const closing = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const item = items[index];

  const go = useCallback(
    (d: -1 | 1) => {
      if (n < 2) return;
      setZoom(false);
      setDir(d);
      setIndex((i) => (i + d + n) % n);
    },
    [n]
  );

  const jump = (i: number) => {
    if (i === index) return;
    setZoom(false);
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  // Ausblenden, dann schließen (und den Verlaufseintrag wieder entfernen)
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    window.setTimeout(
      () => {
        if (pushed.current) {
          pushed.current = false;
          window.history.back();
        }
        onCloseRef.current();
      },
      reduce ? 0 : 200
    );
  }, [reduce]);

  // Einblenden + Fokus auf „Schließen“
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setShown(true));
    closeBtn.current?.focus({ preventScroll: true });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Seite dahinter festhalten (ohne dass sie seitlich springt)
  useEffect(() => {
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevPadding = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPadding;
    };
  }, []);

  // Zurück-Taste/-Geste am Handy schließt die Großansicht statt die Seite
  useEffect(() => {
    if (!pushed.current) {
      try {
        window.history.pushState({ ...(window.history.state ?? {}), lightbox: true }, "");
        pushed.current = true;
      } catch {
        /* z. B. in eingebetteten Ansichten – dann eben ohne */
      }
    }
    const onPop = () => {
      if (!pushed.current) return;
      pushed.current = false;
      close();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [close]);

  // Tastatur: Esc, ← →, Tab bleibt im Dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        const el = root.current;
        if (!el) return;
        const focusable = Array.from(
          el.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")
        ).filter((b) => b.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !el.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !el.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, go]);

  /* Wischen (Touch/Stift): links/rechts blättern, nach unten schließen */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointerType.current = e.pointerType;
    swallowClick.current = false;
    if (e.pointerType === "mouse" || zoom || !e.isPrimary) return;
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), axis: "" };
    setSettle(false);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axis) {
      if (Math.hypot(dx, dy) < 10) return;
      g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    setDrag(g.axis === "x" ? { x: n > 1 ? dx : dx * 0.25, y: 0 } : { x: 0, y: Math.max(0, dy) });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    gesture.current = null;
    if (!g.axis) return; // nur angetippt
    swallowClick.current = true;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    const quick = performance.now() - g.t < 280;
    if (g.axis === "x" && n > 1 && (Math.abs(dx) > 70 || (quick && Math.abs(dx) > 30))) {
      setDrag(null);
      go(dx < 0 ? 1 : -1);
    } else if (g.axis === "y" && (dy > 120 || (quick && dy > 50))) {
      close();
    } else {
      setSettle(true);
      setDrag(null);
    }
  };

  const onPointerCancel = () => {
    gesture.current = null;
    setSettle(true);
    setDrag(null);
  };

  // Klick neben das Bild schließt
  const onRootClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    const target = e.target as HTMLElement;
    if (target.closest("button, a, [data-lb-keep]")) return;
    close();
  };

  /* Zoom am Desktop: Klick ins Bild, Ausschnitt folgt der Maus */
  const canZoom = finePointer;
  const originFrom = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    return `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`;
  };
  const onImageClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (swallowClick.current || !canZoom || pointerType.current !== "mouse") return;
    setOrigin(originFrom(e));
    setZoom((z) => !z);
  };
  const onImageMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (zoom) setOrigin(originFrom(e));
  };

  const ratio = item.width / item.height;
  const fade = drag && drag.y > 0 ? Math.max(0.3, 1 - drag.y / 450) : 1;
  const anim = dir === 0 ? "lb-pop" : dir > 0 ? "lb-from-right" : "lb-from-left";
  const neighbours = n > 1 ? [items[(index + 1) % n], items[(index - 1 + n) % n]] : [];

  const arrow =
    "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/25 transition-colors duration-300 hover:bg-cream/20 sm:flex lg:h-14 lg:w-14";
  const smallArrow =
    "flex h-10 w-10 items-center justify-center rounded-full text-cream/85 ring-1 ring-cream/25 transition-colors duration-300 active:bg-cream/15 sm:hidden";

  const dialog = (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Bildansicht"
      onClick={onRootClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{ touchAction: "pinch-zoom" }}
      className={`lightbox ${n > 1 ? "lb-multi" : "lb-single"} fixed inset-0 z-[100] flex select-none flex-col text-cream transition-opacity duration-200 ease-soft ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hintergrund */}
      <div aria-hidden="true" className="absolute inset-0 bg-espresso" style={{ opacity: fade }} />

      {/* Kopfzeile: Zähler + Schließen */}
      <div className="relative z-10 flex h-14 shrink-0 items-center justify-between pl-5 pr-2 sm:h-16 sm:pl-8 sm:pr-4">
        <p data-lb-keep className="text-[0.7rem] uppercase tabular-nums tracking-eyebrow text-cream/65">
          {n > 1 ? `${index + 1} / ${n}` : ""}
        </p>
        <button
          ref={closeBtn}
          type="button"
          onClick={close}
          aria-label="Großansicht schließen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-cream/85 transition-colors duration-300 hover:bg-cream/10 hover:text-cream"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Bühne */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <div
          style={{
            transform: drag ? `translate3d(${drag.x}px, ${drag.y}px, 0)` : undefined,
            transition: settle ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          <div key={index} className={anim}>
            <div
              data-lb-keep
              onClick={onImageClick}
              onMouseMove={onImageMove}
              className={`relative overflow-hidden bg-cream/5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${
                canZoom ? (zoom ? "cursor-zoom-out" : "cursor-zoom-in") : ""
              }`}
              style={{
                width: `min(var(--lb-w), calc(var(--lb-h) * ${ratio.toFixed(4)}))`,
                aspectRatio: `${item.width} / ${item.height}`,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={SIZES}
                quality={85}
                loading="eager"
                draggable={false}
                className="h-full w-full object-cover"
                style={{
                  transform: zoom ? `scale(${ZOOM})` : "none",
                  transformOrigin: origin,
                  transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fußzeile: Bildunterschrift, Punkte (Handy) bzw. Miniaturen (Desktop) */}
      <div className="relative z-10 flex shrink-0 flex-col items-center gap-3 px-4 pb-5 pt-4 sm:pb-6">
        {item.caption ? (
          <p data-lb-keep className="max-w-xl text-center text-sm leading-snug text-cream/90">
            {item.caption}
          </p>
        ) : null}

        {n > 1 ? (
          <>
            <div className="flex items-center gap-5 md:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="Vorheriges Bild" className={smallArrow}>
                <ChevronIcon direction="left" className="h-4 w-4" />
              </button>
              <div data-lb-keep aria-hidden="true" className="flex items-center gap-1.5">
                {items.map((it, i) => (
                  <span
                    key={it.src}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-cream" : "w-1.5 bg-cream/35"
                    }`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Nächstes Bild" className={smallArrow}>
                <ChevronIcon direction="right" className="h-4 w-4" />
              </button>
            </div>

            <div className="hidden items-center gap-2.5 md:flex">
              {items.map((it, i) => (
                <button
                  key={it.src}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Bild ${i + 1} von ${n} zeigen${it.caption ? `: ${it.caption}` : ""}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative h-14 w-14 overflow-hidden transition duration-300 ${
                    i === index
                      ? "opacity-100 ring-1 ring-cream ring-offset-2 ring-offset-espresso"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={it.src}
                    alt=""
                    width={it.width}
                    height={it.height}
                    sizes="56px"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Pfeile seitlich (ab Tablet) */}
      {n > 1 ? (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Vorheriges Bild" className={`${arrow} left-4 lg:left-8`}>
            <ChevronIcon direction="left" className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Nächstes Bild" className={`${arrow} right-4 lg:right-8`}>
            <ChevronIcon direction="right" className="h-5 w-5" />
          </button>
        </>
      ) : null}

      {/* Ansage für Screenreader */}
      <p className="sr-only" aria-live="polite">
        {`Bild ${index + 1} von ${n}${item.caption ? `: ${item.caption}` : ""}`}
      </p>

      {/* Nachbarbilder vorladen, damit das Blättern sofort sitzt */}
      <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        {neighbours.map((it) => (
          <Image
            key={it.src}
            src={it.src}
            alt=""
            width={it.width}
            height={it.height}
            sizes={SIZES}
            quality={85}
            loading="eager"
          />
        ))}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}

/* ---------------------------- Icons ---------------------------- */

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function ChevronIcon({ direction, className }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
