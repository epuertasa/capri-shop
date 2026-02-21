// Server Component
const mainCategories = [
  { label: "Perfumes",      href: "/categorias/perfumes"      },
  { label: "Cosmética",     href: "/categorias/cosmetica"     },
  { label: "Cabello",       href: "/categorias/cabello"       },
  { label: "Higiene",       href: "/categorias/higiene"       },
  { label: "Hogar",         href: "/categorias/hogar"         },
  { label: "Packs",         href: "/categorias/packs"         },
  { label: "Regalos",       href: "/categorias/regalos"       },
  { label: "Complementos",  href: "/categorias/complementos"  },
];

const deals = [
  { label: "Ofertas días",       icon: "⚡", href: "/ofertas"    },
  { label: "Promociones",        icon: "%",  href: "/promociones" },
  { label: "Regalos por compra", icon: "🎁", href: "/regalos"    },
];

export function MainNav() {
  return (
    <nav aria-label="Navegación de categorías" className="bg-white border-b border-border">

      {/* ── Categorías principales ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {mainCategories.map((cat) => (
            <li key={cat.label} className="shrink-0">
              <a
                href={cat.href}
                className="
                  block py-3 px-4
                  font-body text-sm text-ink-muted
                  whitespace-nowrap
                  border-b-2 border-transparent
                  hover:text-ink hover:border-ink
                  transition-colors duration-150
                "
              >
                {cat.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Sub-nav de ofertas ─────────────────────────────────── */}
      <div className="bg-surface border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul
            role="list"
            className="flex items-center gap-6 py-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {deals.map((deal) => (
              <li key={deal.label} className="shrink-0">
                <a
                  href={deal.href}
                  className="
                    flex items-center gap-1.5
                    font-body text-xs text-ink-muted
                    whitespace-nowrap
                    hover:text-ink
                    transition-colors duration-150
                    py-1
                  "
                >
                  <span aria-hidden="true" className="text-sm">{deal.icon}</span>
                  {deal.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </nav>
  );
}
