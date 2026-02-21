# CLAUDE.md — Frontend · Capri Shop

Reglas específicas del frontend. Las reglas generales de seguridad y entorno están en el
[CLAUDE.md raíz](../CLAUDE.md). Este archivo complementa, no reemplaza.

---

## Stack

| Herramienta         | Versión  | Notas                                   |
|---------------------|----------|-----------------------------------------|
| Next.js (App Router)| 15       | Server Components por defecto           |
| Tailwind CSS        | v4       | CSS-first, sin `tailwind.config.ts`     |
| TypeScript          | 5+       | Strict mode ON                          |
| Fuentes             | Google Fonts | Playfair Display + Cormorant Garamond |

---

## 1. Estructura de carpetas

```
src/
├── app/                  # Rutas (Next.js App Router)
│   ├── layout.tsx        # Layout raíz — fuentes, skip link, metadata global
│   ├── page.tsx          # Home
│   ├── globals.css       # @theme + @layer base
│   └── (rutas)/
│       ├── page.tsx
│       ├── loading.tsx   # Suspense UI
│       ├── error.tsx     # Error boundary
│       └── layout.tsx    # Layout anidado (si aplica)
├── components/
│   ├── ui/               # Átomos del design system (Button, Badge, Input…)
│   ├── layout/           # Header, Footer, Sidebar, Nav
│   └── features/         # Componentes de dominio (ProductCard, CartItem…)
├── lib/
│   ├── utils.ts          # cn() y utilidades puras
│   └── (otros helpers)
└── types/                # TypeScript types/interfaces compartidos
```

---

## 2. Next.js App Router — reglas clave

### Server vs Client Components

```
// ✅ Server Component — por defecto, sin directiva
export default async function ProductList() { ... }

// ✅ Client Component — solo cuando hay interactividad real
"use client";
export function AddToCartButton() { ... }
```

**Usar `"use client"` SOLO si el componente necesita:**
- `useState` / `useReducer` / `useEffect`
- Eventos del browser (`onClick`, `onChange`, etc.)
- APIs del browser (`localStorage`, `window`, etc.)

**Nunca:**
- Hacer `fetch` en `useEffect` — usar Server Components o Route Handlers
- Poner `"use client"` en layouts o páginas raíz innecesariamente
- Acceder a DB directamente desde Client Components

### Imágenes

```tsx
// ✅ Siempre next/image — optimización automática, LCP, lazy load
import Image from "next/image";
<Image src="/producto.jpg" alt="Blusa de lino vista frontal" width={400} height={500} />

// ❌ Nunca <img> nativo para contenido
<img src="/producto.jpg" />
```

### Navegación

```tsx
// ✅ Siempre next/link — prefetching automático
import Link from "next/link";
<Link href="/productos">Ver productos</Link>

// ❌ No <a href> para rutas internas
<a href="/productos">Ver productos</a>
```

### Metadata — obligatorio en cada `page.tsx`

```tsx
export const metadata: Metadata = {
  title: "Productos",          // genera "Productos | Capri Shop" via template
  description: "...",          // max 160 caracteres
};
```

---

## 3. TypeScript — convenciones

### `any` está PROHIBIDO — sin excepciones

> **`any` destruye la seguridad de tipos de todo el proyecto. Nunca. Punto.**

```tsx
// ❌ PROHIBIDO — en cualquiera de sus formas
const data: any = fetchData();
function process(input: any) { ... }
const result = value as any;
const list: any[] = [];
// @ts-ignore          ← también prohibido

// ✅ Usar unknown y narrowing
const data: unknown = await fetchData();
if (typeof data === "object" && data !== null && "name" in data) {
  console.log((data as { name: string }).name);
}

// ✅ Tipos genéricos si el tipo es variable
function identity<T>(value: T): T { return value; }

// ✅ Para respuestas de API — definir el tipo esperado
interface ApiProduct { id: number; name: string; price: number; }
const product: ApiProduct = await fetchProduct(id);
```

Si TypeScript te pide `any` es porque **falta un tipo** — defínelo, no lo esquives.

### Cómo tipar cada caso

```tsx
// ✅ Props de componente — interface
interface ProductCardProps {
  name: string;
  price: number;
  badge?: string;      // opcional con ?
}

// ✅ Unions y aliases — type
type Variant = "primary" | "secondary" | "ghost";
type ProductWithCategory = Product & { categoryName: string };

// ✅ Extender elementos HTML nativos
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

// ✅ Tipo de retorno explícito en utilidades
function formatPrice(amount: number, currency = "EUR"): string {
  return `${amount.toFixed(2)} ${currency}`;
}

// ✅ Eventos tipados — nunca (e: any)
function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
  setValue(e.target.value);
}

// ✅ Refs tipadas
const inputRef = useRef<HTMLInputElement>(null);
const listRef  = useRef<HTMLUListElement>(null);
```

### Reglas TypeScript adicionales

- Strict mode **ON** — no tocar `tsconfig.json`
- Sin `// @ts-ignore` ni `// @ts-expect-error` — resolver el error real
- Exportar los types junto con el componente que los usa
- No usar `React.FC` — declarar props explícitamente y tipar `children` si se necesita

---

## 4. Clean Code — sin espagueti, sin `any`

> **Código espagueti y `any` están terminantemente prohibidos en este proyecto.**
> Si te encuentras escribiendo alguno de los patrones de abajo, para y refactoriza.

### Responsabilidad única

Un componente hace una sola cosa. Si supera ~150 líneas, dividirlo.

```tsx
// ✅ Separación correcta
<ProductCard />          // muestra el producto
<AddToCartButton />      // maneja la acción del carrito
<ProductBadge />         // muestra la etiqueta

// ❌ God component — hace todo y no se puede testear ni reutilizar
<ProductCardWithCartLogicAndModalAndAnalyticsAndWishlist />
```

### Sin anidamiento excesivo — máx. 3 niveles de callbacks

```tsx
// ❌ Callback hell — espagueti puro
fetchUser(id, (user) => {
  fetchOrders(user.id, (orders) => {
    orders.forEach((order) => {
      processOrder(order, (result) => {
        updateUI(result);
      });
    });
  });
});

// ✅ Async/await limpio y legible
const user   = await fetchUser(id);
const orders = await fetchOrders(user.id);
const results = await Promise.all(orders.map(processOrder));
updateUI(results);
```

### Separación de capas — nunca mezclar UI con lógica de negocio

```tsx
// ❌ Fetch + lógica + render todo junto = espagueti
export function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => setProducts(data.filter(p => p.price > 0).sort(...)));
  }, []);
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// ✅ Server Component — fetch en el servidor, componente limpio
export async function ProductList() {
  const products = await getProducts();   // función en lib/products.ts
  return (
    <ul>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </ul>
  );
}
```

### Lógica de negocio → `src/lib/`, nunca en componentes

```
src/lib/
├── products.ts     // getProducts(), getProductBySlug(), formatPrice()
├── cart.ts         // addToCart(), removeFromCart(), getCartTotal()
├── orders.ts       // createOrder(), getOrderStatus()
└── utils.ts        // cn(), slugify(), truncate()
```

### Nombres descriptivos — sin abreviaciones crípticas

```tsx
// ✅ Se entiende sin comentario
const isOutOfStock       = product.stock === 0;
const hasActiveDiscount  = product.originalPrice > product.price;
function formatPrice(amount: number, currency = "EUR"): string { ... }

// ❌ Hay que adivinar qué significa
const f = product.stock === 0;
const x = product.op > product.p;
function fmt(a: number): string { ... }
```

### Sin números ni strings mágicos — constantes con nombre

```tsx
// ✅
const FREE_SHIPPING_THRESHOLD_EUR = 35;
const MAX_VISIBLE_CART_ITEMS      = 99;
const CAROUSEL_SCROLL_AMOUNT_PX   = 440;

// ❌
if (total > 35) { ... }
scrollBy({ left: 440 });
```

### Props — máximo 5-6 por componente

Si necesitas más, agrupar en un objeto tipado o dividir el componente.

```tsx
// ❌ Demasiadas props — señal de que el componente hace demasiado
<ProductCard name price badge imageUrl category brand onAdd onWishlist isNew isOnSale />

// ✅ Pasar el objeto tipado completo
<ProductCard product={product} onAdd={handleAdd} />
```

### Sin duplicación — DRY con criterio

Tres o más repeticiones del mismo patrón = crear una abstracción.
Una sola repetición = no crear abstracción prematura.

---

## 5. Tailwind v4 — convenciones

### Mobile-first siempre

```tsx
// ✅ Base = móvil, luego breakpoints hacia arriba
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

// ❌ Desktop primero, luego intentar romper en móvil
<div className="grid grid-cols-4 sm:grid-cols-2 grid-cols-1">
```

### Usar tokens del design system — nunca valores hardcodeados

```tsx
// ✅ Tokens definidos en @theme (globals.css)
<p className="text-ink-muted font-body text-sm tracking-wide">

// ❌ Valores arbitrarios cuando existe el token
<p className="text-[#5A5A5A] text-[14px]">
```

### `cn()` para clases condicionales

```tsx
import { cn } from "@/lib/utils";

// ✅
<div className={cn("base-class", isActive && "active-class", className)}>

// ❌ Concatenar strings manualmente
<div className={"base-class" + (isActive ? " active-class" : "")}>
```

### No mezclar Tailwind con estilos en línea

```tsx
// ❌
<div className="flex" style={{ color: "#1A1A1A", gap: "1rem" }}>

// ✅
<div className="flex gap-4 text-ink">
```

---

## 6. HTML Semántico — checklist obligatorio

| Elemento     | Cuándo usarlo                                              |
|--------------|------------------------------------------------------------|
| `<header>`   | Cabecera de página o sección                               |
| `<nav>`      | Grupo de enlaces de navegación (siempre con `aria-label`)  |
| `<main>`     | Contenido principal (uno por página, con `id="main-content"`) |
| `<section>`  | Agrupación temática — siempre con heading visible o `sr-only` |
| `<article>`  | Contenido independiente/reutilizable (producto, post, etc.) |
| `<aside>`    | Contenido relacionado pero secundario (filtros, sidebar)   |
| `<footer>`   | Pie de página o sección                                    |
| `<figure>`   | Imagen con contexto; `<figcaption>` para la leyenda        |
| `<time>`     | Fechas y horas con atributo `datetime="YYYY-MM-DD"`        |

```tsx
// ✅ Semántico
<button onClick={addToCart}>Agregar al carrito</button>
<a href="/productos/1">Ver detalle</a>

// ❌ Div/span con roles manuales (evitar cuando existe el elemento nativo)
<div role="button" onClick={addToCart}>Agregar al carrito</div>
```

**Jerarquía de headings — nunca saltarse niveles:**

```
h1  — Título principal de la página (uno solo)
  h2  — Secciones principales
    h3  — Subsecciones o items dentro de secciones
      h4  — (raramente necesario)
```

---

## 7. Accesibilidad — WCAG 2.2

### AA — obligatorio en todo

| Criterio | Regla práctica |
|----------|----------------|
| **1.1.1** Alt text | Imágenes informativas → `alt` descriptivo. Decorativas → `alt=""` |
| **1.3.1** Semántica | HTML semántico — ver sección 6 |
| **1.4.1** Uso del color | No comunicar info solo con color — usar también icono o texto |
| **1.4.3** Contraste texto | ≥ 4.5:1 texto normal · ≥ 3:1 texto grande (18px+ o 14px+ bold) |
| **1.4.10** Reflow | Layout funcional a 320px de ancho sin scroll horizontal |
| **1.4.11** Contraste UI | Bordes de inputs, iconos interactivos ≥ 3:1 vs fondo |
| **1.4.12** Text spacing | No romper layout al aumentar espaciado de texto |
| **2.1.1** Teclado | Toda funcionalidad accesible con Tab, Enter, Espacio, Flechas |
| **2.4.1** Skip link | Primer elemento de `<body>` — ya en `layout.tsx` |
| **2.4.3** Orden de foco | Foco sigue el orden lógico del contenido |
| **2.4.7** Foco visible | `focus-visible:outline-2` en todos los interactivos |
| **2.4.11** Foco no ocultado | El elemento enfocado nunca queda completamente oculto |
| **3.1.1** Idioma | `<html lang="es">` — ya en `layout.tsx` |
| **3.3.1** Errores | Describir errores con texto, no solo color rojo |
| **3.3.2** Labels | Todo `<input>` tiene `<label>` asociado (`htmlFor` / `id`) |

### AAA — aplicar donde sea posible

| Criterio | Regla práctica |
|----------|----------------|
| **1.4.6** Contraste mejorado | Texto ≥ 7:1 — nuestra paleta ya lo cumple (ink/white/blush) |
| **2.4.9** Propósito del link | El texto del link es descriptivo solo — sin "click aquí" / "leer más" |
| **2.5.5** Área táctil | Elementos interactivos ≥ 44×44px en pantallas táctiles |

### Patrones concretos

```tsx
// ✅ Botón icon-only — SIEMPRE aria-label
<button aria-label="Agregar Blusa de lino al carrito">
  <ShoppingCartIcon aria-hidden="true" />
</button>

// ✅ Nav con label para distinguir entre múltiples navs
<nav aria-label="Navegación principal">...</nav>
<nav aria-label="Navegación de pie de página">...</nav>

// ✅ Sección con heading accesible aunque sea invisible
<section aria-labelledby="products-heading">
  <h2 id="products-heading" className="sr-only">Productos destacados</h2>
</section>

// ✅ Error de formulario
<input id="email" aria-describedby="email-error" aria-invalid={!!error} />
<p id="email-error" role="alert">{error}</p>

// ✅ Área táctil mínima — botones pequeños con padding generoso
<button className="p-3 min-w-[44px] min-h-[44px]">
```

---

## 8. Responsive — reglas

### Breakpoints Tailwind (mobile-first)

| Prefijo | Min-width | Dispositivo típico |
|---------|-----------|--------------------|
| (base)  | 0px       | Móvil pequeño (320px+) |
| `sm:`   | 640px     | Móvil grande / tablet pequeña |
| `md:`   | 768px     | Tablet |
| `lg:`   | 1024px    | Laptop |
| `xl:`   | 1280px    | Desktop |
| `2xl:`  | 1536px    | Desktop grande |

### Reglas de layout

- **Nunca `height` fijo** en contenedores — usar `min-h` o dejar que el contenido expanda
- **Grid para 2D** (filas + columnas), **Flexbox para 1D** (solo filas o columnas)
- **Contenedor estándar:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Imágenes:** siempre `next/image` con `sizes` prop para srcset correcto
- **Tipografía fluida:** ya definida en `globals.css` con `clamp()` — no redefinir

### Touch targets (WCAG 2.5.8 AA)

```tsx
// Todo elemento interactivo: mínimo 24×24px visible, 44×44px recomendado
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center">
```

---

## 9. Performance

- **Server Components por defecto** — reducen JS enviado al cliente
- **`next/image`** — compresión automática, lazy loading, tamaño correcto
- **`next/font`** — sin FOUT, sin layout shift de fuentes
- **No `useEffect` para fetch** — usar async Server Components
- **Importaciones dinámicas** para componentes pesados debajo del fold:

```tsx
import dynamic from "next/dynamic";
const HeavyMap = dynamic(() => import("@/components/features/Map"), {
  loading: () => <p>Cargando mapa…</p>,
  ssr: false,
});
```

---

## 10. Formularios — obligatorios

```tsx
// ✅ Label asociado explícitamente
<label htmlFor="nombre">Nombre completo</label>
<input id="nombre" type="text" autoComplete="name" required />

// ✅ Campo requerido — indicado visualmente Y para screen readers
<label htmlFor="email">
  Correo electrónico
  <span aria-hidden="true"> *</span>
  <span className="sr-only">(requerido)</span>
</label>

// ✅ Error accesible
<input aria-describedby="email-error" aria-invalid="true" />
<p id="email-error" role="alert" className="text-sm text-ink mt-1">
  Ingresa un correo válido.
</p>
```

---

## 11. SEO — Next.js App Router

### Metadata API — obligatorio en cada `page.tsx`

Next.js 15 genera `<title>`, `<meta>`, Open Graph y Twitter Cards a partir del objeto
`metadata` exportado. **Nunca usar `<Head>` de Pages Router ni meta tags manuales.**

#### Metadata estática (páginas sin datos dinámicos)

```tsx
// src/app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda de moda y accesorios",      // resultado: "Tienda de moda… | Capri Shop"
  description: "Descubre nuestra colección de moda artesanal. Envío gratis desde $50.", // ≤ 160 chars
  keywords: ["moda", "accesorios", "ropa mujer", "tienda online"],
  alternates: {
    canonical: "https://capri.shop/",        // URL canónica — evita contenido duplicado
  },
  openGraph: {
    title: "Capri Shop — Moda que te inspira",
    description: "Colección primavera 2025. Piezas únicas con envío gratis.",
    url: "https://capri.shop/",
    siteName: "Capri Shop",
    images: [
      {
        url: "https://capri.shop/og-home.jpg", // 1200×630px mínimo
        width: 1200,
        height: 630,
        alt: "Colección primavera Capri Shop",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capri Shop — Moda que te inspira",
    description: "Colección primavera 2025. Piezas únicas con envío gratis.",
    images: ["https://capri.shop/og-home.jpg"],
  },
};
```

#### Metadata dinámica (páginas con datos: productos, categorías)

```tsx
// src/app/productos/[slug]/page.tsx
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);       // Server Component — fetch directo

  return {
    title: product.name,                           // "Blusa de lino | Capri Shop"
    description: product.description.slice(0, 155) + "…",
    alternates: { canonical: `https://capri.shop/productos/${slug}` },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [{ url: product.imageUrl, width: 800, height: 1000, alt: product.name }],
      type: "website",
    },
  };
}
```

#### Template en el layout raíz — ya configurado

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Capri Shop",           // cuando la página no define title
    template: "%s | Capri Shop",     // "Blusa de lino | Capri Shop"
  },
  ...
};
```

---

### Datos estructurados (JSON-LD) — rich results en Google

Usar JSON-LD vía `<script type="application/ld+json">` en Server Components.
No usar librerías externas para esto — es un objeto JSON simple.

```tsx
// src/app/productos/[slug]/page.tsx
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl,
    description: product.description,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://capri.shop/productos/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* resto de la página */}
    </>
  );
}
```

**Schemas prioritarios para e-commerce:**

| Schema           | Dónde                | Rich result                            |
|------------------|----------------------|----------------------------------------|
| `Product`        | Página de producto   | Precio, disponibilidad, rating en SERP |
| `BreadcrumbList` | Producto / categoría | Migas de pan en SERP                   |
| `Organization`   | Layout raíz          | Panel de conocimiento                  |
| `ItemList`       | Páginas de categoría | Carrusel de productos                  |
| `FAQPage`        | Página de ayuda      | Acordeón directo en Google             |

---

### Sitemap — `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchAllProducts();   // rutas dinámicas

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://capri.shop/",          lastModified: new Date(), priority: 1.0 },
    { url: "https://capri.shop/productos", lastModified: new Date(), priority: 0.9 },
    { url: "https://capri.shop/contacto",  lastModified: new Date(), priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `https://capri.shop/productos/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
```

---

### robots.txt — `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/carrito/", "/checkout/"],
      },
    ],
    sitemap: "https://capri.shop/sitemap.xml",
    host: "https://capri.shop",
  };
}
```

---

### Core Web Vitals — métricas que afectan el ranking

| Métrica                             | Objetivo | Cómo conseguirlo                                                                  |
|-------------------------------------|----------|-----------------------------------------------------------------------------------|
| **LCP** (Largest Contentful Paint)  | ≤ 2.5s   | `next/image` con `priority` en hero; fuentes con `display: swap`                  |
| **INP** (Interaction to Next Paint) | ≤ 200ms  | Minimizar `"use client"`; no bloquear el hilo principal                           |
| **CLS** (Cumulative Layout Shift)   | ≤ 0.1    | Siempre definir `width`/`height` en `next/image`; reservar espacio para fuentes   |

```tsx
// ✅ Imagen hero — priority evita lazy load en LCP
<Image
  src="/hero.jpg"
  alt="Colección primavera Capri Shop"
  width={1440}
  height={600}
  priority               // solo para la imagen above-the-fold
  sizes="100vw"
/>

// ✅ Imágenes de producto — sizes correcto para srcset óptimo
<Image
  src={product.imageUrl}
  alt={product.name}
  width={400}
  height={500}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
/>
```

---

### URLs y estructura de rutas

```text
✅ URLs limpias, descriptivas y en minúscula con guiones
/productos/blusa-de-lino-azul
/categorias/accesorios
/blog/como-cuidar-tu-ropa-de-lino

❌ Evitar
/productos?id=123
/productos/1
/PRODUCTOS/Blusa_Lino
```

- Rutas en español cuando el sitio es en español
- Sin extensiones (`.html`, `.php`)
- Sin parámetros de query para contenido indexable — usar rutas dinámicas `[slug]`
- Canonical siempre definido para evitar contenido duplicado (ej: paginación)

---

### Checklist SEO por página

- [ ] `title` único y descriptivo (50–60 caracteres)
- [ ] `description` única y con CTA implícito (≤ 155 caracteres)
- [ ] `alternates.canonical` definido
- [ ] Open Graph completo (`title`, `description`, `image` 1200×630)
- [ ] Un solo `<h1>` — coincide temáticamente con el `title`
- [ ] Imágenes con `alt` descriptivo
- [ ] JSON-LD apropiado para el tipo de página
- [ ] No hay texto relevante generado solo con JavaScript (usar Server Components)
- [ ] Core Web Vitals: LCP en hero con `priority`, `width`/`height` en todas las imágenes

---

## 12. Qué NO hacer — resumen rápido

| ❌ Evitar | ✅ En cambio |
|-----------|-------------|
| `<div onClick>` para acciones | `<button>` nativo |
| `<a>` sin `href` o con `href="#"` para acciones | `<button>` |
| Colores hardcodeados `text-[#1A1A1A]` | `text-ink` |
| `any` en TypeScript | `unknown` + narrowing |
| `"use client"` en layouts | Solo en hojas del árbol |
| `<img>` nativo | `next/image` |
| `<a href>` para rutas internas | `next/link` |
| Heading skipping (h1 → h3) | Jerarquía correcta |
| Botones sin label accesible | `aria-label` o texto visible |
| `style={{ color: "..." }}` con Tailwind | Token de Tailwind |
| Lógica de negocio en componentes UI | `lib/` o Server Component |
