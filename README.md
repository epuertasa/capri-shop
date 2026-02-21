# Capri Shop

E-commerce monolito con frontend en Next.js 15 y backend en Node.js v24 + Express.

## Stack

| Capa       | Tecnología                    |
|------------|-------------------------------|
| Frontend   | Next.js 15, Tailwind CSS v4, TypeScript |
| Backend    | Node.js v24, Express.js       |
| Base de datos | PostgreSQL 16              |
| Orquestación | Docker Compose              |

## Estructura del proyecto

```
capri-shop/
├── frontend/    # Next.js 15 + Tailwind CSS
├── backend/     # Node.js v24 + Express.js
├── docker-compose.yml
└── README.md
```

## Inicio rápido con Docker

Asegúrate de tener Docker y Docker Compose instalados.

```bash
# 1. Copia los archivos de variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 2. Levanta todos los servicios
docker compose up --build
```

| Servicio  | URL                             |
|-----------|---------------------------------|
| Frontend  | http://localhost:3000           |
| API       | http://localhost:4000/api       |
| Health    | http://localhost:4000/api/health |
| PostgreSQL| localhost:5432                  |

## Desarrollo local

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

## Variables de entorno

Ver [backend/.env.example](./backend/.env.example) y [frontend/.env.example](./frontend/.env.example).

## Licencia

MIT
