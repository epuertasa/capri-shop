const { Router } = require('express');
const healthController = require('../controllers/health');

const router = Router();

// Health check
router.get('/health', healthController.check);

// TODO: montar rutas de productos, usuarios, órdenes, etc.
// router.use('/products', require('./products'));
// router.use('/users',   require('./users'));
// router.use('/orders',  require('./orders'));

module.exports = router;
