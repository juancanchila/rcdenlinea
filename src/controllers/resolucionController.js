const { ResolucionAprovechamiento, Receptor } = require('../models');

// =====================================
// LISTAR RESOLUCIONES
// =====================================
const listarResoluciones = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await ResolucionAprovechamiento.findAndCountAll({
      limit,
      offset,
      order: [['idresolucion', 'DESC']]
    });

    res.json({ total: count, limit, offset, data: rows });
  } catch (error) {
    console.error('❌ Error listarResoluciones:', error);
    res.status(500).json({ error: 'Error al listar resoluciones' });
  }
};

// =====================================
// OBTENER RESOLUCIÓN POR ID
// =====================================
const obtenerResolucionPorId = async (req, res) => {
  try {
    const resolucion = await ResolucionAprovechamiento.findByPk(req.params.id);
    if (!resolucion) return res.status(404).json({ error: 'Resolución no encontrada' });
    res.json(resolucion);
  } catch (error) {
    console.error('❌ Error obtenerResolucionPorId:', error);
    res.status(500).json({ error: 'Error al obtener resolución' });
  }
};

// =====================================
// CREAR RESOLUCIÓN (con PIN automático)
// =====================================
const crearResolucion = async (req, res) => {
  try {
    const { idReceptor, numeroResolucion, ubicacion, naturalezaActividad, tipoAprovechamiento, fechaInicio, fechaFin } = req.body;

    if (!idReceptor || !numeroResolucion || !ubicacion || !naturalezaActividad || !tipoAprovechamiento || !fechaInicio) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar que el receptor exista
    const receptor = await Receptor.findByPk(idReceptor);
    if (!receptor) {
      return res.status(400).json({ error: 'El receptor indicado no existe' });
    }

    // Contar cuántas resoluciones tiene este receptor
    const cantidadResoluciones = await ResolucionAprovechamiento.count({ where: { idReceptor } });

    // Generar PIN: 2-[idReceptor]-[consecutivo]
    const consecutivo = String(cantidadResoluciones + 1).padStart(3, '0');
    const pinGenerado = `2-${idReceptor}-${consecutivo}`;

    // Crear resolución
    const resolucion = await ResolucionAprovechamiento.create({
      ...req.body,
      pin: pinGenerado
    });

    res.status(201).json(resolucion);
  } catch (error) {
    console.error('❌ Error crearResolucion:', error);
    res.status(500).json({ error });
  }
};

// =====================================
// ACTUALIZAR RESOLUCIÓN
// =====================================
const actualizarResolucion = async (req, res) => {
  try {
    const resolucion = await ResolucionAprovechamiento.findByPk(req.params.id);
    if (!resolucion) return res.status(404).json({ error: 'Resolución no encontrada' });

    const camposActualizables = [
      'numeroResolucion',
      'ubicacion',
      'localidad',
      'naturalezaActividad',
      'tipoAprovechamiento',
      'fechaInicio',
      'fechaFin',
      'cantidadRCD',
      'CoordenadaX',
      'CoordenadaY',
      'fechaExpedicionPIN',
      'codigoRadicadoSIGOD',
      'tipo',
      'cantidad_autorizada'
    ];

    camposActualizables.forEach(campo => {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        resolucion[campo] = req.body[campo];
      }
    });

    await resolucion.save();
    res.json({ message: 'Resolución actualizada correctamente', data: resolucion });
  } catch (error) {
    console.error('❌ Error actualizarResolucion:', error);
    res.status(500).json({ error: 'Error al actualizar resolución' });
  }
};

// =====================================
// ELIMINAR RESOLUCIÓN
// =====================================
const eliminarResolucion = async (req, res) => {
  try {
    const resolucion = await ResolucionAprovechamiento.findByPk(req.params.id);
    if (!resolucion) return res.status(404).json({ error: 'Resolución no encontrada' });

    await resolucion.destroy();
    res.json({ message: 'Resolución eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminarResolucion:', error);
    res.status(500).json({ error: 'Error al eliminar resolución' });
  }
};

module.exports = {
  listarResoluciones,
  obtenerResolucionPorId,
  crearResolucion,
  actualizarResolucion,
  eliminarResolucion
};
