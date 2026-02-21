const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  user:     process.env.DB_USER     || 'capri',
  password: process.env.DB_PASSWORD || 'capri_secret',
  database: process.env.DB_NAME     || 'capri_shop',
});

pool.on('connect', () => {
  console.log('🗄️  Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en la conexión a PostgreSQL:', err.message);
});

module.exports = { pool };
