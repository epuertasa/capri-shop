# CLAUDE.md — Reglas del proyecto Capri Shop

Este archivo define las convenciones y restricciones que Claude Code debe respetar siempre en este proyecto.

---

## Stack

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 15, Tailwind CSS v4, TypeScript |
| Backend    | Node.js v24, Express.js (CommonJS)      |
| Base de datos | PostgreSQL 16                        |
| Orquestación | Docker Compose                        |

---

## Reglas de seguridad — OBLIGATORIAS

### 1. Cero secretos en el código o Docker

- **NUNCA** escribir credenciales, contraseñas, API keys, tokens ni ningún secreto directamente en:
  - `docker-compose.yml`
  - Cualquier `Dockerfile`
  - Archivos de código fuente (`*.js`, `*.ts`, `*.tsx`, etc.)
  - Archivos de configuración commiteados al repo
- **SIEMPRE** leer secretos desde variables de entorno (`.env`)

### 2. Todos los secretos van en archivos `.env`

- Cada subcarpeta con su propio `.env`:
  - `backend/.env` — variables del servidor y DB
  - `frontend/.env.local` — variables del cliente
  - `.env` (raíz) — variables de Docker Compose (postgres, etc.)
- Solo se commitea el archivo ejemplo: `.env.example` o `.env.local.example`
- **NUNCA** commitear un archivo `.env` real

### 3. `.gitignore` debe cubrir todos los `.env`

El `.gitignore` raíz usa el patrón `.env` (sin slash inicial), que aplica a todos los subdirectorios. No modificar esa regla. También cubre `.env.local`, `.env.*.local`.

### 4. `docker-compose.yml` sin valores por defecto de secretos

- NO usar la sintaxis `${VAR:-valor_por_defecto}` para credenciales.
- Correcto: `${DB_PASSWORD}` — falla ruidosamente si no está definido.
- Incorrecto: `${DB_PASSWORD:-mi_password_secreto}` — expone el secreto como default.
- El `docker-compose.yml` carga variables con `env_file` apuntando a los `.env` de cada servicio.

### 5. `dotenv` — carga de variables

- El backend usa `dotenv` (`require('dotenv').config()` al inicio de `src/index.js`).
- El frontend usa el manejo nativo de Next.js (no necesita dotenv).
- Docker Compose usa `env_file` para inyectar variables en los contenedores.

---

## Convenciones de código

### Backend (Node.js)

- Usar **CommonJS** (`require`/`module.exports`), no ESM, en el backend.
- Punto de entrada: `backend/src/index.js`
- Estructura de carpetas: `src/routes/`, `src/controllers/`, `src/config/`, `src/middleware/`
- Validar siempre los inputs de usuario (no confiar en datos externos).
- No exponer stack traces en respuestas de producción.

### Frontend (Next.js)

- Usar **App Router** (`src/app/`), no Pages Router.
- Solo variables con prefijo `NEXT_PUBLIC_` son accesibles en el cliente.
- No poner lógica de negocio ni acceso directo a DB en el frontend.

---

## Design System — Frontend

### Fuentes

| Variable CSS         | Fuente              | Uso                        |
|----------------------|---------------------|----------------------------|
| `--font-playfair`    | Playfair Display    | Headings, logo, display    |
| `--font-cormorant`   | Cormorant Garamond  | Body, captions, cursivas   |

En Tailwind: clases `font-display` y `font-body`.
Cargadas con `next/font/google` en `src/app/layout.tsx` con `display: swap`.

### Paleta de colores

| Token Tailwind   | Hex       | Uso permitido                          |
|------------------|-----------|----------------------------------------|
| `blush`          | #FFE0E9   | Fondos, acentos, botón secondary       |
| `blush-dark`     | #F2B8CC   | Hover de blush, bordes                 |
| `ink`            | #1A1A1A   | Texto principal, botón primary         |
| `ink-muted`      | #5A5A5A   | Texto secundario                       |
| `white`          | #FFFFFF   | Fondo base                             |
| `surface`        | #FAFAFA   | Fondos de sección alternativos         |

**NUNCA** usar `blush` como color de texto (contraste 1.2:1 sobre blanco, falla WCAG).

### Contraste WCAG (referencia rápida)

| Combinación                     | Ratio  | Nivel |
|---------------------------------|--------|-------|
| `ink` sobre `blush`             | ~17:1  | AAA   |
| `ink` sobre `white`             | ~15:1  | AAA   |
| `white` sobre `ink`             | ~15:1  | AAA   |
| `ink-muted` sobre `white`       | ~7.5:1 | AAA   |

### Accesibilidad — obligatorio en cada componente

1. `focus-visible:outline-2 focus-visible:outline-offset-2` en todos los interactivos.
2. Un único `<h1>` por página; jerarquía correcta h1 → h2 → h3.
3. HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
4. `aria-label` en toda `<nav>` y botones icon-only.
5. `alt` descriptivo en imágenes; decorativas con `alt=""`.
6. Respetar `prefers-reduced-motion` — ya cubierto en `globals.css`.

### Componentes UI disponibles

| Componente | Ruta                           | Variantes                                           |
|------------|--------------------------------|-----------------------------------------------------|
| `Button`   | `src/components/ui/Button.tsx` | `primary`, `secondary`, `ghost` / `sm`, `md`, `lg` |
| `Badge`    | `src/components/ui/Badge.tsx`  | `default`, `blush`, `ink`, `outline`                |

### Configuración Tailwind v4

- El tema va **solo en CSS** vía `@theme` en `globals.css`. No usar `tailwind.config.ts` para tokens.
- Helper `cn()` disponible en `src/lib/utils.ts` sin dependencias externas.

### General

- No crear archivos de código innecesarios. Preferir editar existentes.
- No agregar comentarios obvios. Solo comentar lógica no evidente.
- No sobre-ingenierizar: no abstracciones para un único uso.
- Mantener las respuestas de error de la API consistentes: `{ error: "mensaje" }`.

---

## Flujo de entorno

```
.env (raíz)          → docker-compose.yml (postgres credentials)
backend/.env         → src/index.js vía dotenv → pool de pg
frontend/.env.local  → Next.js nativo → NEXT_PUBLIC_* al cliente
```

---

## Comandos clave

```bash
# Levantar todo
docker compose up --build

# Solo backend local
cd backend && npm install && npm run dev

# Solo frontend local
cd frontend && npm install && npm run dev

# Health check del API
curl http://localhost:4000/api/health
```
