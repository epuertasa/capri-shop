import type { Metadata } from "next";
import { HeroBanner }       from "@/components/features/HeroBanner";
import { ProductCarousel }  from "@/components/features/ProductCarousel";
import type { Product }     from "@/components/features/ProductCard";

/* ─── Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Inicio — Perfumes, Cosmética y más",
  description:
    "Descubre nuestra selección de perfumes, cosmética, cabello e higiene. Envío gratis desde 35 €.",
  alternates: { canonical: "https://capri.shop/" },
};

/* ─── Datos — slides del banner principal ───────────────────────── */
const heroSlides = [
  {
    id: 1,
    eyebrow: "Nueva colección",
    title: "Perfumes que enamoran",
    subtitle: "Fragancias exclusivas para cada momento del día.",
    cta: "Ver perfumes",
    bg: "bg-blush",
    accent: "text-ink-muted",
  },
  {
    id: 2,
    eyebrow: "Cosmética premium",
    title: "Tu piel, tu mejor versión",
    subtitle: "Cremas, serums y rutinas para una piel radiante.",
    cta: "Ver cosmética",
    bg: "bg-surface",
    accent: "text-ink-muted",
  },
  {
    id: 3,
    eyebrow: "Ofertas especiales",
    title: "Hasta 40% de descuento",
    subtitle: "Selección de productos rebajados por tiempo limitado.",
    cta: "Ver ofertas",
    bg: "bg-ink",
    accent: "text-white/60",
  },
];

/* ─── Datos — slides del banner secundario ──────────────────────── */
const secondarySlides = [
  {
    id: 1,
    eyebrow: "Packs regalo",
    title: "El regalo perfecto, siempre",
    subtitle: "Packs curados para regalar en cualquier ocasión.",
    cta: "Ver packs",
    bg: "bg-blush",
    accent: "text-ink-muted",
  },
  {
    id: 2,
    eyebrow: "Cuidado capilar",
    title: "Tu cabello lo merece todo",
    subtitle: "Champús, mascarillas y tratamientos de alta gama.",
    cta: "Ver cabello",
    bg: "bg-surface",
    accent: "text-ink-muted",
  },
];

/* ─── Datos — Productos Destacados ──────────────────────────────── */
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Eau de Parfum Capri Bloom",
    brand: "Capri",
    category: "Perfumes",
    price: 45.99,
    badge: "Nuevo",
    imageAlt: "Frasco de Eau de Parfum Capri Bloom",
  },
  {
    id: 2,
    name: "Crema Hidratante SPF 50",
    brand: "Dermalia",
    category: "Cosmética",
    price: 29.99,
    originalPrice: 39.99,
    imageAlt: "Tarro de crema hidratante con SPF 50",
  },
  {
    id: 3,
    name: "Champú Reparador Intensivo",
    brand: "HairLab",
    category: "Cabello",
    price: 14.99,
    imageAlt: "Bote de champú reparador intensivo",
  },
  {
    id: 4,
    name: "Gel de Ducha Aceite de Argán",
    brand: "Naturalis",
    category: "Higiene",
    price: 8.99,
    badge: "Popular",
    imageAlt: "Bote de gel de ducha con aceite de argán",
  },
  {
    id: 5,
    name: "Vela Aromática Hogar Gardenia",
    brand: "Scenthaus",
    category: "Hogar",
    price: 19.99,
    imageAlt: "Vela aromática de gardenia en recipiente de vidrio",
  },
  {
    id: 6,
    name: "Pack Bella — Hidratación Total",
    brand: "Capri",
    category: "Packs",
    price: 54.99,
    originalPrice: 72.00,
    badge: "Oferta",
    imageAlt: "Pack de hidratación total con crema, sérum y contorno de ojos",
  },
  {
    id: 7,
    name: "Set Regalo Navidad Luxury",
    brand: "Capri",
    category: "Regalos",
    price: 39.99,
    imageAlt: "Set de regalo de lujo en caja dorada",
  },
  {
    id: 8,
    name: "Bolso Organizador Cosmética",
    brand: "StyleCase",
    category: "Complementos",
    price: 24.99,
    badge: "Nuevo",
    imageAlt: "Bolso organizador de maquillaje en color nude",
  },
];

/* ─── Datos — Segunda tanda de productos ────────────────────────── */
const moreProducts: Product[] = [
  {
    id: 9,
    name: "Perfume de Autor Nuit de Paris",
    brand: "Maison Noir",
    category: "Perfumes",
    price: 89.99,
    imageAlt: "Frasco de perfume de autor Nuit de Paris",
  },
  {
    id: 10,
    name: "Sérum Vitamina C Iluminador",
    brand: "Dermalia",
    category: "Cosmética",
    price: 34.99,
    originalPrice: 44.99,
    badge: "Oferta",
    imageAlt: "Sérum de vitamina C en frasco cuentagotas",
  },
  {
    id: 11,
    name: "Mascarilla Capilar Keratina",
    brand: "HairLab",
    category: "Cabello",
    price: 18.99,
    imageAlt: "Tarro de mascarilla capilar con keratina",
  },
  {
    id: 12,
    name: "Desodorante Stick 48h Zero",
    brand: "Naturalis",
    category: "Higiene",
    price: 6.99,
    badge: "Popular",
    imageAlt: "Desodorante stick de larga duración",
  },
  {
    id: 13,
    name: "Difusor Hogar Bergamota",
    brand: "Scenthaus",
    category: "Hogar",
    price: 22.50,
    imageAlt: "Difusor de bergamota con varillas en vidrio",
  },
  {
    id: 14,
    name: "Pack Duo Cabello & Piel",
    brand: "Capri",
    category: "Packs",
    price: 47.00,
    originalPrice: 60.00,
    badge: "Oferta",
    imageAlt: "Pack duo con champú reparador y crema corporal",
  },
  {
    id: 15,
    name: "Neceser Viaje Premium",
    brand: "StyleCase",
    category: "Complementos",
    price: 32.99,
    imageAlt: "Neceser de viaje compacto en tela resistente",
  },
  {
    id: 16,
    name: "Colonia Sport Fresh",
    brand: "Capri",
    category: "Perfumes",
    price: 27.99,
    badge: "Nuevo",
    imageAlt: "Frasco de colonia sport de aroma fresco",
  },
];

/* ─── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── Banner principal ──────────────────────────────────── */}
      <HeroBanner
        slides={heroSlides}
        aria-label="Anuncios y novedades principales"
      />

      {/* ── Productos Destacados ──────────────────────────────── */}
      <ProductCarousel
        id="featured"
        title="PRODUCTOS DESTACADOS"
        products={featuredProducts}
      />

      {/* ── Banner secundario ─────────────────────────────────── */}
      <HeroBanner
        slides={secondarySlides}
        aria-label="Anuncios de packs y cuidado capilar"
        interval={6000}
      />

      {/* ── Más productos ─────────────────────────────────────── */}
      <ProductCarousel
        id="more"
        products={moreProducts}
      />
    </>
  );
}
