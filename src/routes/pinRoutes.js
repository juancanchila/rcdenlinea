// routes/pinRoutes.js
const express = require('express');
const { buscarPorPin } = require('../controllers/pinController');

const router = express.Router();

// Ejemplo: GET /api/pin?tipo=generador&valor=9006672036
router.get('/', buscarPorPin);

module.exports = router;
