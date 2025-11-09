const { Proyecto , VisitaTecnica} = require('../models');

const listarProyectos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Proyecto.findAndCountAll({
      limit,
      offset,
      order: [['idProyecto', 'DESC']]
    });

    res.json({ total: count, limit, offset, data: rows });
  } catch (error) {
    res.status(500).json({ error: 'Error al listar proyectos' });
  }
};

const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id, {
      include: [
        {
          model: VisitaTecnica,
          as: 'visitas' // 👈 alias correcto según tu relación
        }
      ]
    });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
};

module.exports = {
  listarProyectos,
  obtenerProyectoPorId
};