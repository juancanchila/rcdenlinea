const { ReporteImpPmaRcd, Proyecto } = require('../models');

const listarReportes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const { count, rows } = await ReporteImpPmaRcd.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Proyecto,
          as: 'proyecto',
          attributes: ['idProyecto', 'nombre']
        }
      ],
      order: [['idreporte', 'DESC']]
    });

    // Aplanar el nombre del proyecto para el front
    const data = rows.map((r) => {
      const json = r.toJSON();
      return {
        ...json,
        proyectoNombre: json.proyecto ? json.proyecto.nombre : null
      };
    });

    res.json({
      total: count,
      limit,
      offset,
      data
    });
  } catch (error) {
    console.error('❌ Error listarReportes:', error);
    res.status(500).json({
      error: 'Error al listar reportes',
      detalle: error.message
    });
  }
};

const obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await ReporteImpPmaRcd.findByPk(req.params.id, {
      include: [
        {
          model: Proyecto,
          as: 'proyecto',
          attributes: ['idProyecto', 'nombre', 'ubicacion']
        }
      ]
    });

    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    const json = reporte.toJSON();
    json.proyectoNombre = json.proyecto ? json.proyecto.nombre : null;

    res.json(json);
  } catch (error) {
    console.error('❌ Error obtenerReportePorId:', error);
    res.status(500).json({
      error: 'Error al obtener reporte',
      detalle: error.message
    });
  }
};

module.exports = {
  listarReportes,
  obtenerReportePorId
};