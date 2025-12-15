const { Proyecto } = require('../models');

// Listar proyectos para mapa
const listarProyectosMapa = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;  // opcional
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Proyecto.findAndCountAll({
      attributes: ['idProyecto', 'CoordenadaX', 'CoordenadaY'], // SOLO lo que necesitamos
      limit,
      offset,
      order: [['idProyecto', 'DESC']]
    });

    // Convertimos a JSON simple
    const data = rows.map(p => p.toJSON());

    res.json({
      total: count,
      limit,
      offset,
      data
    });

  } catch (error) {
    console.error('❌ Error listarProyectosMapa:', error);
    res.status(500).json({ error: 'Error al listar proyectos para mapa' });
  }
};

module.exports = {
  listarProyectosMapa
};
