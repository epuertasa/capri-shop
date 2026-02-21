const { pool } = require('../config/db');

const check = async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      service: 'capri-shop-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({
      status: 'degraded',
      service: 'capri-shop-api',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = { check };
