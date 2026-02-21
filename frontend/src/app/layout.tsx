import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader }      from "@/components/layout/SiteHeader";
import { MainNav }         from "@/components/layout/MainNav";
import { SiteFooter }      from "@/components/layout/SiteFooter";

/* ─── Fuentes ───────────────────────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* ─── Metadata global ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Capri Shop",
    template: "%s | Capri Shop",
  },
  description:
    "Tu tienda online de perfumes, cosmética, cabello e higiene. Envío gratis desde 35 €.",
  keywords: ["perfumes", "cosmética", "cabello", "higiene", "regalos", "tienda online"],
  openGraph: {
    title: "Capri Shop",
    description: "Tu tienda online de perfumes, cosmética y mucho más.",
    locale: "es_ES",
    type: "website",
  },
};

/* ─── Layout raíz ───────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">

        {/* Skip to content — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-toast
            focus:bg-ink focus:text-white
            focus:px-4 focus:py-2 focus:rounded-md
            focus:text-sm focus:font-body focus:font-medium
          "
        >
          Saltar al contenido principal
        </a>

        {/* ── Chrome del sitio ─────────────────────────────────── */}
        <AnnouncementBar />
        <SiteHeader />
        <MainNav />

        {/* ── Contenido de la página ───────────────────────────── */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 outline-none"
        >
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
