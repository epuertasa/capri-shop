require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Capri Shop API corriendo en http://localhost:${PORT}/api`);
});

module.exports = app;
