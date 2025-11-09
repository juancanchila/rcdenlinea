// controllers/reporteRcdGeneradorController.js
const { ReporteRcdGenerador } = require('../models');

const listarReportesRcd = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await ReporteRcdGenerador.findAndCountAll({
      limit,
      offset
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al listar reportes',
      detalle: error.message
    });
  }
};

const obtenerReporteRcdPorId = async (req, res) => {
  try {
    const reporte = await ReporteRcdGenerador.findByPk(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener reporte',
      detalle: error.message
    });
  }
};

module.exports = {
  listarReportesRcd,
  obtenerReporteRcdPorId
};
