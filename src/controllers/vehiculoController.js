const { Vehiculo, Transportador } = require('../models');

const listarVehiculos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Vehiculo.findAndCountAll({
      limit,
      offset,
      order: [['idvehiculo', 'DESC']],
      include: [{
        model: Transportador,
        as: 'transportador' // 👈 trae todo el objeto
      }]
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error listarVehiculos:', error);
    res.status(500).json({ error: 'Error al listar vehículos' });
  }
};

const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id, {
    include: [{
        model: Transportador,
        as: 'transportador' // 👈 trae todo el objeto
      }]
    });

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.json(vehiculo);
  } catch (error) {
    console.error('❌ Error obtenerVehiculoPorId:', error);
    res.status(500).json({ error: 'Error al obtener vehículo' });
  }
};

module.exports = {
  listarVehiculos,
  obtenerVehiculoPorId
};
