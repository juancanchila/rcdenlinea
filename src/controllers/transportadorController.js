const { Transportador, Vehiculo } = require('../models');

// Listar transportadores paginados
const listarTransportadores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Transportador.findAndCountAll({
      limit,
      offset,
      order: [['idtransportador', 'DESC']]
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error listarTransportadores:', error);
    res.status(500).json({ error: 'Error al listar transportadores' });
  }
};

// Obtener transportador por ID
const obtenerTransportadorPorId = async (req, res) => {
  try {
    const transportador = await Transportador.findByPk(req.params.id, {
      include: [{
        model: Vehiculo,
        as: 'vehiculos',
        attributes: { exclude: ['idtransportador'] }
      }]
    });

    if (!transportador) {
      return res.status(404).json({ error: 'Transportador no encontrado' });
    }

    res.json(transportador);
  } catch (error) {
    console.error('❌ Error obtenerTransportadorPorId:', error);
    res.status(500).json({ error: 'Error al obtener transportador' });
  }
};

// Crear transportador
const crearTransportador = async (req, res) => {
  try {
    const transportador = await Transportador.create(req.body);
    res.status(201).json(transportador);
  } catch (error) {
    console.error('❌ Error crearTransportador:', error);
    res.status(500).json({ error: 'Error al crear transportador' });
  }
};

// Actualizar transportador
const actualizarTransportador = async (req, res) => {
  try {
    const transportador = await Transportador.findByPk(req.params.id);
    if (!transportador) {
      return res.status(404).json({ error: 'Transportador no encontrado' });
    }

    await transportador.update(req.body);
    res.json(transportador);
  } catch (error) {
    console.error('❌ Error actualizarTransportador:', error);
    res.status(500).json({ error: 'Error al actualizar transportador' });
  }
};

// Eliminar transportador
const eliminarTransportador = async (req, res) => {
  try {
    const transportador = await Transportador.findByPk(req.params.id);
    if (!transportador) {
      return res.status(404).json({ error: 'Transportador no encontrado' });
    }

    await transportador.destroy();
    res.json({ message: 'Transportador eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminarTransportador:', error);
    res.status(500).json({ error: 'Error al eliminar transportador' });
  }
};

module.exports = {
  listarTransportadores,
  obtenerTransportadorPorId,
  crearTransportador,
  actualizarTransportador,
  eliminarTransportador
};
