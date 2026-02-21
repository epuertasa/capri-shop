# Capri Shop — Frontend

Aplicación web del e-commerce construida con **Next.js 15** y **Tailwind CSS v4**.

## Stack

- [Next.js 15](https://nextjs.org/) — React framework con App Router
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- TypeScript

## Estructura

```
frontend/
├── src/
│   └── app/
│       ├── layout.tsx     # Layout raíz (metadata, fuentes)
│       ├── page.tsx       # Página principal (landing)
│       └── globals.css    # Estilos globales + Tailwind
├── public/                # Assets estáticos
├── Dockerfile
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta los valores:

```bash
cp .env.example .env.local
```

| Variable               | Descripción                  | Default                   |
|------------------------|------------------------------|---------------------------|
| `NEXT_PUBLIC_API_URL`  | URL base del backend         | `http://localhost:4000`   |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Docker

Desde la raíz del proyecto:

```bash
docker compose up frontend --build
```

## Scripts disponibles

| Comando         | Descripción                        |
|-----------------|------------------------------------|
| `npm run dev`   | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción                |
| `npm run start` | Servidor de producción             |
| `npm run lint`  | Linter ESLint                      |
