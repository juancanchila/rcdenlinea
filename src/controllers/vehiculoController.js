const { Vehiculo, Transportador } = require('../models');

// Listar vehículos
const listarVehiculos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Vehiculo.findAndCountAll({
      limit,
      offset,
      order: [['idvehiculo', 'DESC']],
      include: [{ model: Transportador, as: 'transportador' }]
    });

    res.json({ total: count, limit, offset, data: rows });
  } catch (error) {
    console.error('❌ Error listarVehiculos:', error);
    res.status(500).json({ error: 'Error al listar vehículos' });
  }
};

// Obtener vehículo por ID
const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id, {
      include: [{ model: Transportador, as: 'transportador' }]
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

// Crear vehículo
const crearVehiculo = async (req, res) => {
  try {
    const { idtransportador, fotoFrente, fotoLadoDerecho, fotoLadoIzquierdo, fotoTrasera, licenciaTransito } = req.body;

    if (!idtransportador || !fotoFrente || !fotoLadoDerecho || !fotoLadoIzquierdo || !fotoTrasera || !licenciaTransito) {
      return res.status(400).json({ error: 'Faltan datos obligatorios: idtransportador, fotos o licenciaTransito' });
    }

    const transportadorExistente = await Transportador.findByPk(idtransportador);
    if (!transportadorExistente) {
      return res.status(400).json({ error: 'El transportador indicado no existe' });
    }

    const vehiculo = await Vehiculo.create(req.body);
    res.status(201).json(vehiculo);
  } catch (error) {
    console.error('❌ Error crearVehiculo:', error);
    res.status(500).json({ error});
  }
};
const actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    const datos = req.body;

    // Validar transportador si viene
    if (datos.idtransportador !== undefined) {
      const transportadorExistente = await Transportador.findByPk(datos.idtransportador);
      if (!transportadorExistente) {
        return res.status(400).json({ error: 'El transportador indicado no existe' });
      }
      vehiculo.idtransportador = datos.idtransportador;
    }

    // Actualizar el resto de campos (excepto idtransportador que ya se trató)
    for (const campo of Object.keys(datos)) {
      if (campo !== 'idtransportador' && datos[campo] !== undefined) {
        vehiculo[campo] = datos[campo];
      }
    }

    await vehiculo.save();

    return res.status(200).json({
      mensaje: 'Vehículo actualizado correctamente',
      vehiculo
    });
  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Eliminar vehículo
const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });

    await vehiculo.destroy();
    res.json({ message: 'Vehículo eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminarVehiculo:', error);
    res.status(500).json({ error: 'Error al eliminar vehículo' });
  }
};

module.exports = {
  listarVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
};
