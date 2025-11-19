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
          as: 'proyecto'
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

// Crear visita técnica
// Requiere: idProyecto y los campos de la visita en el body
// Valida: que exista el proyecto; que NO exista ya una visita para ese proyecto (si esa es la regla)
const crearVisita = async (req, res) => {
  try {
    const {
      fechaCreacion,
      estado,
      fechaVisita,
      idTecnico,
      estadoProyecto,
      observaciones,
      idProyecto,
      acta
    } = req.body;

    if (!idProyecto) {
      return res.status(400).json({ error: 'idProyecto es requerido' });
    }

    // validar existencia del proyecto
    const proyecto = await Proyecto.findByPk(idProyecto);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // verificar si ya existe una visita para ese proyecto
    const visitaExistente = await VisitaTecnica.findOne({ where: { idProyecto } });
    if (visitaExistente) {
      return res.status(409).json({ error: 'Ya existe una visita técnica para este proyecto' });
    }

    // Crear la visita
    const nuevaVisita = await VisitaTecnica.create({
      fechaCreacion,
      estado,
      fechaVisita,
      idTecnico,
      estadoProyecto,
      observaciones,
      idProyecto,
      acta
    });

    // devolver con proyecto incluido
    const visitaConProyecto = await VisitaTecnica.findByPk(nuevaVisita.idvisitatecnica, {
      include: [{ model: Proyecto, as: 'proyecto' }]
    });

    res.status(201).json({ message: 'Visita técnica creada correctamente', data: visitaConProyecto });
  } catch (error) {
    console.error('Error en crearVisita:', error);
    res.status(500).json({ error: 'Error al crear visita técnica' });
  }
};

// Actualizar visita técnica por ID
// Actualiza solo campos presentes en req.body
const actualizarVisita = async (req, res) => {
  try {
    const id = req.params.id;
    const visita = await VisitaTecnica.findByPk(id);

    if (!visita) {
      return res.status(404).json({ error: 'Visita técnica no encontrada' });
    }

    // Si se envía idProyecto validar existencia y conflicto con otra visita
    if (Object.prototype.hasOwnProperty.call(req.body, 'idProyecto')) {
      const nuevoIdProyecto = req.body.idProyecto;
      const proyecto = await Proyecto.findByPk(nuevoIdProyecto);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto (nuevo) no encontrado' });
      }

      // Si se cambia idProyecto, verificar que no haya otra visita distinta con ese idProyecto
      if (nuevoIdProyecto !== visita.idProyecto) {
        const otraVisita = await VisitaTecnica.findOne({ where: { idProyecto: nuevoIdProyecto } });
        if (otraVisita) {
          return res.status(409).json({ error: 'Ya existe otra visita técnica para el proyecto indicado' });
        }
      }
    }

    const camposActualizables = [
      'fechaCreacion',
      'estado',
      'fechaVisita',
      'idTecnico',
      'estadoProyecto',
      'observaciones',
      'idProyecto',
      'acta'
    ];

    camposActualizables.forEach((campo) => {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        visita[campo] = req.body[campo];
      }
    });

    await visita.save();

    const visitaActualizada = await VisitaTecnica.findByPk(visita.idvisitatecnica, {
      include: [{ model: Proyecto, as: 'proyecto' }]
    });

    res.json({ message: 'Visita técnica actualizada correctamente', data: visitaActualizada });
  } catch (error) {
    console.error('Error en actualizarVisita:', error);
    res.status(500).json({ error: 'Error al actualizar visita técnica' });
  }
};

// Eliminar visita técnica por ID
const eliminarVisita = async (req, res) => {
  try {
    const id = req.params.id;
    const visita = await VisitaTecnica.findByPk(id);

    if (!visita) {
      return res.status(404).json({ error: 'Visita técnica no encontrada' });
    }

    await VisitaTecnica.destroy({ where: { idvisitatecnica: id } });

    res.json({ message: 'Visita técnica eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminarVisita:', error);
    res.status(500).json({ error: 'Error al eliminar visita técnica' });
  }
};

module.exports = {
  listarVisitas,
  obtenerVisitaPorId,
  crearVisita,
  actualizarVisita,
  eliminarVisita
};