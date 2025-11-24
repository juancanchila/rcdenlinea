const { Proyecto, VisitaTecnica, Generador } = require('../models');

// Listar proyectos paginados
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
    console.error('❌ Error listarProyectos:', error);
    res.status(500).json({ error: 'Error al listar proyectos' });
  }
};

// Obtener proyecto por ID
const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id, {
      include: [
        { model: VisitaTecnica, as: 'visitas' }
      ]
    });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error('❌ Error obtenerProyectoPorId:', error);
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
};

// Crear proyecto
const crearProyecto = async (req, res) => {
  try {
   const { idgenerador } = req.body;

     // Validar solo el generador
    if (!idgenerador) {
      return res.status(400).json({ error: 'Falta el id del generador' });
    }

    // Verificar que el generador exista
    const generador = await Generador.findByPk(idgenerador);
    if (!generador) {
      return res.status(400).json({ error: 'El generador indicado no existe' });
    }

    // Contar cuántos proyectos tiene este generador
    const cantidadProyectos = await Proyecto.count({ where: { idgenerador } });

    // Generar PIN: 2-[idgenerador]-[consecutivo]
    const consecutivo = String(cantidadProyectos + 1).padStart(3, '0');
    const pinGenerado = `2-${idgenerador}-${consecutivo}`;

    // Crear proyecto con PIN generado
    const proyecto = await Proyecto.create({
      ...req.body,
      pin: pinGenerado
    });

    res.status(201).json(proyecto);
  } catch (error) {
    console.error('❌ Error crearProyecto:', error);
    res.status(500).json({ error });
  }
};


// Actualizar proyecto
const actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.update(req.body);
    res.json(proyecto);
  } catch (error) {
    console.error('❌ Error actualizarProyecto:', error);
    res.status(500).json({ error: 'Error al actualizar proyecto' });
  }
};

// Eliminar proyecto
const eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.destroy();
    res.json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminarProyecto:', error);
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
};

module.exports = {
  listarProyectos,
  obtenerProyectoPorId,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto
};
