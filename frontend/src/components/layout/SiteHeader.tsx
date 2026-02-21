"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Iconos SVG inline ────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ─── Componente ────────────────────────────────────────────────── */
export function SiteHeader() {
  const [query, setQuery] = useState("");
  const cartCount = 0; // TODO: conectar con estado global del carrito

  return (
    <header className="bg-white border-b border-border sticky top-0 z-sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4">

          {/* ── Logo ────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Capri Shop — Ir al inicio"
            className="shrink-0 flex items-center gap-2"
          >
            {/* Logo mark — diamante geométrico */}
            <span aria-hidden="true" className="font-display text-2xl leading-none text-blush-dark">◆</span>
            <span className="font-display text-xl font-bold text-ink tracking-tight">
              Capri Shop
            </span>
          </Link>

          {/* ── Buscador ─────────────────────────────────────────── */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex-1 max-w-xl mx-auto"
          >
            <label htmlFor="site-search" className="sr-only">
              Buscar productos
            </label>
            <div className="relative">
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar"
                autoComplete="off"
                className={cn(
                  "w-full pl-4 pr-10 py-2.5",
                  "border border-border rounded-md",
                  "font-body text-sm text-ink placeholder:text-ink-subtle",
                  "bg-surface",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                  "focus-visible:bg-white focus-visible:border-ink/30"
                )}
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

          {/* ── Acciones ─────────────────────────────────────────── */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Promociones — visible desde sm */}
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
              className={cn(
                "hidden sm:flex items-center gap-1.5",
                "border border-ink rounded-full",
                "px-4 py-2",
                "font-body text-sm text-ink",
                "hover:bg-blush hover:border-blush-dark",
                "transition-colors duration-150"
              )}
            >
              Promociones
              <ChevronDownIcon />
            </button>

            {/* Cuenta */}
            <button
              type="button"
              aria-label="Mi cuenta"
              className="p-2.5 text-ink-muted hover:text-ink transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <UserIcon />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Lista de deseos"
              className="p-2.5 text-ink-muted hover:text-ink transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <HeartIcon />
            </button>

            {/* Carrito */}
            <button
              type="button"
              aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} artículos` : ", vacío"}`}
              className="relative p-2.5 text-ink-muted hover:text-ink transition-colors rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-1 bg-ink text-white text-[10px] font-body font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none"
                >
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
