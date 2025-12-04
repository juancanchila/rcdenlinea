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

    if (!tipo || !valor) {
      return res.status(400).json({ error: 'Debe enviar tipo y valor' });
    }

    let resultado;

    switch (tipo.toLowerCase()) {
      case 'generador':
        resultado = await Generador.findAll({
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
        resultado = await Transportador.findAll({
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
        resultado = await Receptor.findAll({
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
        resultado = await Vehiculo.findAll({
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
        resultado = await Usuario.findAll({
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
        resultado = await VisitaTecnica.findAll({
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
        resultado = await ResolucionAprovechamiento.findAll({
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
        const atributosProyecto = Object.keys(Proyecto.rawAttributes);

        resultado = await Proyecto.findAll({
          where: {
            [Op.or]: atributosProyecto.map(campo => ({
              [campo]: { [Op.like]: `%${valor}%` }
            }))
          }
        });
        break;

      default:
        return res.status(400).json({
          error: 'Tipo no válido. Use generador, transportador, receptor, vehiculo, usuarios, visitatecnica, resolucion o proyecto.'
        });
    }

    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ error: `${tipo} no encontrado` });
    }

    res.json(resultado);

  } catch (error) {
    console.error('❌ Error en buscarPorPin:', error);
    res.status(500).json({ error });
  }
};

module.exports = { buscarPorPin };
