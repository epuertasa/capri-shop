import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ─── Tipos ─────────────────────────────────────────────────────── */
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;    // si tiene, muestra tachado + badge "Oferta"
  badge?: string | null;
  imageAlt: string;
}

/* ─── Componente ─────────────────────────────────────────────────── */
export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : null;

  return (
    <article
      aria-labelledby={`product-name-${product.id}`}
      className="
        group w-48 sm:w-52 shrink-0
        bg-white rounded-xl overflow-hidden
        border border-border
        shadow-[var(--shadow-card)]
        hover:shadow-[var(--shadow-card-hover)]
        transition-shadow duration-200
      "
    >
      {/* ── Imagen ──────────────────────────────────────────────── */}
      <div
        className="relative aspect-[3/4] bg-surface overflow-hidden"
        aria-hidden="true"
      >
        {/* Placeholder gradient — reemplazar con next/image cuando haya imágenes reales */}
        <div className="w-full h-full bg-gradient-to-br from-blush/40 to-blush-dark/20 flex items-center justify-center">
          <span className="font-display text-4xl text-ink/10 select-none">◆</span>
        </div>

        {/* Badge de oferta o novedad */}
        {(product.badge || discountPct) && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPct && (
              <Badge variant="ink">−{discountPct}%</Badge>
            )}
            {product.badge && !discountPct && (
              <Badge variant="ink">{product.badge}</Badge>
            )}
          </div>
        )}

        {/* Overlay wishlist — aparece en hover */}
        <button
          type="button"
          aria-label={`Agregar ${product.name} a la lista de deseos`}
          className="
            absolute top-2 right-2
            w-8 h-8 rounded-full
            bg-white/80 hover:bg-white
            text-ink-muted hover:text-ink
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-opacity duration-150
            shadow-xs
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Info ─────────────────────────────────────────────────── */}
      <div className="p-3">
        <p className="font-body text-[10px] text-ink-subtle uppercase tracking-widest mb-0.5 truncate">
          {product.brand}
        </p>

        <h3
          id={`product-name-${product.id}`}
          className="font-display text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2"
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-body text-base font-semibold text-ink leading-none">
              <span className="sr-only">Precio: </span>
              {product.price.toFixed(2)} €
            </p>
            {hasDiscount && (
              <p className="font-body text-xs text-ink-subtle line-through leading-none mt-0.5">
                <span className="sr-only">Antes: </span>
                {product.originalPrice!.toFixed(2)} €
              </p>
            )}
          </div>

          <Button
            size="sm"
            variant="secondary"
            aria-label={`Agregar ${product.name} al carrito`}
            className="text-xs px-3 py-1.5 shrink-0"
          >
            + Añadir
          </Button>
        </div>
      </div>
    </article>
  );
}
