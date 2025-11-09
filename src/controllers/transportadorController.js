const { Transportador, Vehiculo } = require('../models');

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
    res.status(500).json({ error: 'Error al listar transportadores' });
  }
};

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

module.exports = {
  listarTransportadores,
  obtenerTransportadorPorId
};