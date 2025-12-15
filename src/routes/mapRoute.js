// routes/pinRoutes.js
const express = require('express');
const {  listarProyectosMapa } = require('../controllers/mapController');

const router = express.Router();

// Ejemplo: GET /api/pin?tipo=generador&valor=9006672036
router.get('/',  listarProyectosMapa);

module.exports = router;
