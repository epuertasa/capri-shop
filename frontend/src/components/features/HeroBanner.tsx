"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Tipos ─────────────────────────────────────────────────────── */
interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  bg: string;           // clase tailwind de fondo
  accent: string;       // clase de color del eyebrow
}

interface HeroBannerProps {
  slides: Slide[];
  autoplay?: boolean;
  interval?: number;    // ms
  "aria-label"?: string;
}

/* ─── Iconos ────────────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Componente ─────────────────────────────────────────────────── */
export function HeroBanner({
  slides,
  autoplay = true,
  interval = 5000,
  "aria-label": ariaLabel = "Anuncios de productos",
}: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % total), [total]);

  /* Autoplay */
  useEffect(() => {
    if (!autoplay || paused || total <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoplay, paused, interval, next, total]);

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carrusel"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ──────────────────────────────────────────────── */}
      <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}: ${slide.title}`}
            aria-hidden={i !== current}
            className={cn(
              "absolute inset-0 flex items-center justify-center px-16 md:px-24",
              "transition-opacity duration-500",
              slide.bg,
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="text-center max-w-2xl">
              <p className={cn("font-body text-xs tracking-widest uppercase mb-3", slide.accent)}>
                {slide.eyebrow}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
                {slide.title}
              </h2>
              <p className="font-body text-base sm:text-lg text-ink-muted mb-6">
                {slide.subtitle}
              </p>
              <a
                href="#"
                className="
                  inline-flex items-center gap-2
                  font-body text-sm font-medium
                  bg-ink text-white
                  px-6 py-3 rounded-md
                  hover:bg-ink/85 transition-colors
                "
              >
                {slide.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── Flecha izquierda ────────────────────────────────────── */}
      <button
        type="button"
        onClick={prev}
        aria-label="Anuncio anterior"
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full
          bg-white/80 hover:bg-white
          text-ink shadow-sm
          flex items-center justify-center
          transition-colors duration-150
          min-w-[44px] min-h-[44px]
        "
      >
        <ChevronLeft />
      </button>

      {/* ── Flecha derecha ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente anuncio"
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full
          bg-white/80 hover:bg-white
          text-ink shadow-sm
          flex items-center justify-center
          transition-colors duration-150
          min-w-[44px] min-h-[44px]
        "
      >
        <ChevronRight />
      </button>

      {/* ── Indicadores (dots) ───────────────────────────────────── */}
      {total > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          role="tablist"
          aria-label="Seleccionar diapositiva"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Diapositiva ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current
                  ? "bg-ink w-5 h-2"
                  : "bg-ink/25 hover:bg-ink/50 w-2 h-2"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
