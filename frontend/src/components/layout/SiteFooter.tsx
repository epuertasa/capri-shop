// Server Component
const footerLinks = [
  { label: "Aviso legal",     href: "/aviso-legal"     },
  { label: "Privacidad",      href: "/privacidad"      },
  { label: "Cookies",         href: "/cookies"         },
  { label: "Contacto",        href: "/contacto"        },
  { label: "Ayuda",           href: "/ayuda"           },
];

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <p className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <span aria-hidden="true" className="text-blush-dark">◆</span>
            Capri Shop
          </p>

          {/* Links */}
          <nav aria-label="Navegación de pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center" role="list">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-body text-sm text-ink-muted">
            © {new Date().getFullYear()} Capri Shop
          </p>

        </div>
      </div>
    </footer>
  );
}
