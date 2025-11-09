const { VisitaTecnica, Proyecto } = require('../models');

// Listar visitas técnicas con paginación e incluir Proyecto
const listarVisitas = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await VisitaTecnica.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Proyecto,
          as: 'proyecto' // 👈 alias debe coincidir con la asociación en el modelo
        }
      ],
      order: [['fechaCreacion', 'DESC']]
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
    console.error('Error en listarVisitas:', error);
    res.status(500).json({ error: 'Error al listar visitas técnicas' });
  }
};

// Obtener visita técnica por ID con Proyecto
const obtenerVisitaPorId = async (req, res) => {
  try {
    const visita = await VisitaTecnica.findByPk(req.params.id, {
      include: [
        {
          model: Proyecto,
          as: 'proyecto'
        }
      ]
    });

    if (!visita) {
      return res.status(404).json({ error: 'Visita técnica no encontrada' });
    }

    res.json(visita);
  } catch (error) {
    console.error('Error en obtenerVisitaPorId:', error);
    res.status(500).json({ error: 'Error al obtener visita técnica' });
  }
};

module.exports = {
  listarVisitas,
  obtenerVisitaPorId
};
