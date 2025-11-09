const express = require('express');
const bodyParser = require('body-parser');
const rcdgeneradorController = require('../controllers/rcdgeneradorController');

const app = express();
app.use(bodyParser.json());

// 🔹 Rutas para Reportes
app.get('/', rcdgeneradorController.listarReportesRcd);
app.get('/:id', rcdgeneradorController.obtenerReporteRcdPorId);

module.exports = app;

 
 