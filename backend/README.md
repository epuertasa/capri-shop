# Capri Shop — Backend

API REST del e-commerce construida con **Node.js v24** y **Express.js**, conectada a **PostgreSQL**.

## Stack

- [Node.js v24](https://nodejs.org/) — Runtime
- [Express.js 4](https://expressjs.com/) — Framework HTTP
- [pg](https://node-postgres.com/) — Cliente PostgreSQL
- [dotenv](https://github.com/motdotla/dotenv) — Variables de entorno
- [cors](https://github.com/expressjs/cors) — Cross-Origin Resource Sharing

## Estructura

```
backend/
├── src/
│   ├── index.js           # Entry point: Express app + middlewares
│   ├── routes/
│   │   └── index.js       # Router principal /api
│   ├── controllers/
│   │   └── health.js      # GET /api/health
│   └── config/
│       └── db.js          # Pool de conexiones PostgreSQL
├── Dockerfile
├── .env.example
└── package.json
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable        | Descripción                      | Default           |
|-----------------|----------------------------------|-------------------|
| `PORT`          | Puerto del servidor              | `4000`            |
| `FRONTEND_URL`  | URL del frontend (CORS)          | `http://localhost:3000` |
| `DB_HOST`       | Host de PostgreSQL               | `localhost`       |
| `DB_PORT`       | Puerto de PostgreSQL             | `5432`            |
| `DB_USER`       | Usuario de PostgreSQL            | `capri`           |
| `DB_PASSWORD`   | Contraseña de PostgreSQL         | `capri_secret`    |
| `DB_NAME`       | Nombre de la base de datos       | `capri_shop`      |

## Desarrollo local

```bash
npm install
npm run dev   # nodemon con hot-reload
```

## Docker

Desde la raíz del proyecto:

```bash
docker compose up backend --build
```

## Endpoints disponibles

| Método | Ruta          | Descripción           |
|--------|---------------|-----------------------|
| GET    | `/api/health` | Health check del API y DB |

### Respuesta de `/api/health`

```json
{
  "status": "ok",
  "service": "capri-shop-api",
  "database": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Próximos endpoints (por implementar)

- `GET /api/products` — Listar productos
- `POST /api/products` — Crear producto
- `GET /api/products/:id` — Detalle de producto
- `POST /api/users/register` — Registro de usuario
- `POST /api/users/login` — Autenticación
- `GET /api/orders` — Listar órdenes
- `POST /api/orders` — Crear orden
