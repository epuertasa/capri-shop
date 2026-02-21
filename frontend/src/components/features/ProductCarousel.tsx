"use client";

import { useRef } from "react";
import { ProductCard, type Product } from "./ProductCard";

/* ─── Iconos ────────────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Tipos ─────────────────────────────────────────────────────── */
interface ProductCarouselProps {
  products: Product[];
  title?: string;
  id: string;           // para aria-labelledby único en página
}

/* ─── Componente ─────────────────────────────────────────────────── */
export function ProductCarousel({ products, title, id }: ProductCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!listRef.current) return;
    // desplaza ~2 tarjetas (≈220px c/u)
    const amount = 440;
    listRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={title ? headingId : undefined}
      className="py-10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Título ──────────────────────────────────────────── */}
        {title && (
          <h2
            id={headingId}
            className="font-display text-xl sm:text-2xl font-bold text-ink text-center mb-6 tracking-wide"
          >
            {title}
          </h2>
        )}

        {/* ── Carrusel ─────────────────────────────────────────── */}
        <div className="relative">

          {/* Flecha izquierda */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Ver productos anteriores"
            className="
              absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-white border border-border
              text-ink hover:bg-blush hover:border-blush-dark
              shadow-sm
              flex items-center justify-center
              transition-colors duration-150
              min-w-[44px] min-h-[44px]
            "
          >
            <ArrowLeft />
          </button>

          {/* Lista scrollable */}
          <ul
            ref={listRef}
            role="list"
            aria-label={title ?? "Productos"}
            className="
              flex gap-4
              overflow-x-auto
              scroll-smooth
              pb-2
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {products.map((product) => (
              <li key={product.id} className="shrink-0">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {/* Flecha derecha */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Ver más productos"
            className="
              absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-white border border-border
              text-ink hover:bg-blush hover:border-blush-dark
              shadow-sm
              flex items-center justify-center
              transition-colors duration-150
              min-w-[44px] min-h-[44px]
            "
          >
            <ArrowRight />
          </button>

        </div>
      </div>
    </section>
  );
}
