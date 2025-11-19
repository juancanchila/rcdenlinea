const { Generador,Proyecto } = require('../models');

const listarGeneradores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const { count, rows } = await Generador.unscoped().findAndCountAll({
      limit,
      offset,
      order: [[sequelize.col('Generador.idgenerador'), 'DESC']],
      // logging: console.log
    });

    const data = rows.map(r => r.get({ plain: true }));

    res.json({
      total: count,
      limit,
      offset,
      data
    });
  } catch (error) {
    console.error('Error listarGeneradores:', error);
    res.status(500).json({ error: 'Error al listar generadores' });
  }
};



const obtenerGeneradorPorId = async (req, res) => {
  try {
    const generador = await Generador.findByPk(req.params.id, {
      include: [
        {
          model: Proyecto,
          as: 'proyectos' // Debe coincidir con el alias definido en models/index.js
        }
      ]
    });

    if (!generador) {
      return res.status(404).json({ error: 'Generador no encontrado' });
    }

    res.json(generador);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener generador' });
  }
};


module.exports = {
  listarGeneradores,
  obtenerGeneradorPorId
};