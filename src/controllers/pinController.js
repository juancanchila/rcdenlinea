const { Op } = require('sequelize');
const { 
  Generador, 
  Proyecto, 
  Transportador, 
  Vehiculo, 
  Receptor, 
  ResolucionAprovechamiento,
  Usuario,
  VisitaTecnica
} = require('../models');

const buscarPorPin = async (req, res) => {
  try {
    const { tipo, valor } = req.query; 
    // tipo puede ser: 'generador', 'transportador', 'receptor', 'vehiculo', 'usuarios', 'visitatecnica', 'resolucion', 'proyecto'

    if (!tipo || !valor) {
      return res.status(400).json({ error: 'Debe enviar tipo y valor' });
    }

    let resultado;

    switch (tipo.toLowerCase()) {
      case 'generador':
        resultado = await Generador.findOne({
          where: {
            [Op.or]: [
              { razonSocial: { [Op.like]: `%${valor}%` } },
              { numeroDocumento: { [Op.like]: `%${valor}%` } },
              { numeroDocumentoRL: { [Op.like]: `%${valor}%` } },
              { correoElectronico: { [Op.like]: `%${valor}%` } }
            ]
          },
          include: [{ model: Proyecto, as: 'proyectos' }]
        });
        break;

      case 'transportador':
        resultado = await Transportador.findOne({
          where: {
            [Op.or]: [
              { razonSocial: { [Op.like]: `%${valor}%` } },
              { numeroDocumento: { [Op.like]: `%${valor}%` } },
              { numeroDocumentoRL: { [Op.like]: `%${valor}%` } },
              { correoElectronico: { [Op.like]: `%${valor}%` } }
            ]
          },
          include: [{
            model: Vehiculo,
            as: 'vehiculos',
            attributes: { exclude: ['idtransportador'] }
          }]
        });
        break;

      case 'receptor':
        resultado = await Receptor.findOne({
          where: {
            [Op.or]: [
              { razonSocial: { [Op.like]: `%${valor}%` } },
              { numeroDocumento: { [Op.like]: `%${valor}%` } },
              { numeroDocumentoRL: { [Op.like]: `%${valor}%` } },
              { correoElectronico: { [Op.like]: `%${valor}%` } }
            ]
          },
          include: [{ model: ResolucionAprovechamiento, as: 'resoluciones' }]
        });
        break;

      case 'vehiculo':
        resultado = await Vehiculo.findOne({
          where: {
            [Op.or]: [
              { numeroIdentificacion: { [Op.like]: `%${valor}%` } },
              { nombreConductor: { [Op.like]: `%${valor}%` } },
              { placaVehiculo: { [Op.like]: `%${valor}%` } }
            ]
          }
        });
        break;

      case 'usuarios':
        resultado = await Usuario.findOne({
          where: {
            [Op.or]: [
              { estado: { [Op.like]: `%${valor}%` } },
              { nombre: { [Op.like]: `%${valor}%` } },
              { usuario: { [Op.like]: `%${valor}%` } },
              { email: { [Op.like]: `%${valor}%` } }
            ]
          }
        });
        break;

      case 'visitatecnica':
        resultado = await VisitaTecnica.findOne({
          where: {
            [Op.or]: [
              { fechaCreacion: { [Op.like]: `%${valor}%` } },
              { fechaVisita: { [Op.like]: `%${valor}%` } },
              { estadoProyecto: { [Op.like]: `%${valor}%` } }
            ]
          }
        });
        break;

      case 'resolucion':
        resultado = await ResolucionAprovechamiento.findOne({
          where: {
            [Op.or]: [
              { numeroResolucion: { [Op.like]: `%${valor}%` } },
              { ubicacion: { [Op.like]: `%${valor}%` } },
              { localidad: { [Op.like]: `%${valor}%` } },
              { naturalezaActividad: { [Op.like]: `%${valor}%` } },
              { tipoAprovechamiento: { [Op.like]: `%${valor}%` } },
              { fechaInicio: { [Op.like]: `%${valor}%` } },
              { fechaFin: { [Op.like]: `%${valor}%` } }
            ]
          }
        });
        break;

      case 'proyecto':
        // 🔹 Búsqueda dinámica por cualquiera de sus campos
        const where = {};
        const atributosProyecto = Object.keys(Proyecto.rawAttributes);

        where[Op.or] = atributosProyecto.map(campo => ({
          [campo]: { [Op.like]: `%${valor}%` }
        }));

        resultado = await Proyecto.findOne({ where });
        break;

      default:
        return res.status(400).json({ 
          error: 'Tipo no válido. Use generador, transportador, receptor, vehiculo, usuarios, visitatecnica, resolucion o proyecto.' 
        });
    }

    if (!resultado) {
      return res.status(404).json({ error: `${tipo} no encontrado` });
    }

    res.json(resultado);

  } catch (error) {
    console.error('❌ Error en buscarPorPin:', error);
    res.status(500).json({ error: 'Error en la búsqueda de PIN' });
  }
};

module.exports = { buscarPorPin };
