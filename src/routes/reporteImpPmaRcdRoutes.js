const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteImpPmaRcdController');

// CRUD
router.get('/', controller.listarReportes);
router.get('/:id', controller.obtenerReportePorId);


module.exports = router;