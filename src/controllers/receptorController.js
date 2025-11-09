const { Receptor, ResolucionAprovechamiento } = require('../models');

const listarReceptores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Receptor.findAndCountAll({
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
    res.status(500).json({ error: 'Error al listar receptores' });
  }
};

const obtenerReceptorPorId = async (req, res) => {
  try {
    const receptor = await Receptor.findByPk(req.params.id, {
      include: [
        {
          model: ResolucionAprovechamiento,
          as: 'resoluciones'
        }
      ]
    });

    if (!receptor) {
      return res.status(404).json({ error: 'Receptor no encontrado' });
    }

    res.json(receptor);
  } catch (error) {
    console.error('Error al obtener receptor:', error);
    res.status(500).json({ error: 'Error al obtener receptor' });
  }
};

module.exports = {
  listarReceptores,
  obtenerReceptorPorId
};