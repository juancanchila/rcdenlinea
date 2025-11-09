const { ResolucionAprovechamiento } = require('../models');

const listarResoluciones = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await ResolucionAprovechamiento.findAndCountAll({
      limit,
      offset,
      order: [['idresolucion', 'DESC']]
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
      console.error('ERROR listando resoluciones:', error);

    res.status(500).json({ error: 'Error al listar resoluciones' });

  }
};

const obtenerResolucionPorId = async (req, res) => {
  try {
    const resolucion = await ResolucionAprovechamiento.findByPk(req.params.id);
    if (!resolucion) return res.status(404).json({ error: 'Resolución no encontrada' });
    res.json(resolucion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener resolución' });
  }
};

module.exports = {
  listarResoluciones,
  obtenerResolucionPorId
};