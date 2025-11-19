// controllers/receptorController.js
const { Receptor, ResolucionAprovechamiento } = require('../models');

const listarReceptores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Receptor.findAndCountAll({
      limit,
      offset
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });
  } catch (error) {
    console.error('Error al listar receptores:', error);
    res.status(500).json({ error: 'Error al listar receptores' });
  }
};

const obtenerReceptorPorId = async (req, res) => {
  try {
    const receptor = await Receptor.findByPk(req.params.id, {
      include: [
        {
          model: ResolucionAprovechamiento,
          as: 'resoluciones'
        }
      ]
    });

    if (!receptor) {
      return res.status(404).json({ error: 'Receptor no encontrado' });
    }

    res.json(receptor);
  } catch (error) {
    console.error('Error al obtener receptor:', error);
    res.status(500).json({ error: 'Error al obtener receptor' });
  }
};

const crearReceptor = async (req, res) => {
  try {
    const {
      tipoDocumento,
      numeroDocumento,
      primerNombre,
      segundoNombre,
      primerApellidos,
      segundoApellido,
      razonSocial,
      direccion,
      correoElectronico,
      telefono,
      fax,
      celular,
      clave,
      ciiu,
      tipoDocumentoRL,
      numeroDocumentoRL,
      nombreRL,
      emailRL,
      pin
    } = req.body;

    // Validaciones básicas para campos NOT NULL en la tabla
    if (!tipoDocumento || !numeroDocumento || !direccion || !correoElectronico || !clave) {
      return res.status(400).json({
        error: 'Faltan campos requeridos. Se requieren: tipoDocumento, numeroDocumento, direccion, correoElectronico, clave'
      });
    }

    const nuevo = await Receptor.create({
      tipoDocumento,
      numeroDocumento,
      primerNombre,
      segundoNombre,
      primerApellidos,
      segundoApellido,
      razonSocial,
      direccion,
      correoElectronico,
      telefono,
      fax,
      celular,
      clave,
      ciiu,
      tipoDocumentoRL,
      numeroDocumentoRL,
      nombreRL,
      emailRL,
      pin
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear receptor:', error);
    res.status(500).json({ error: 'Error al crear receptor' });
  }
};

const actualizarReceptor = async (req, res) => {
  try {
    const id = req.params.id;
    const receptor = await Receptor.findByPk(id);

    if (!receptor) {
      return res.status(404).json({ error: 'Receptor no encontrado' });
    }

    // Evitar modificación del PK si viene en body
    if (req.body.idreceptor && req.body.idreceptor !== receptor.idreceptor) {
      return res.status(400).json({ error: 'No se puede modificar idreceptor' });
    }

    // Actualizar con los campos que envíen
    await receptor.update(req.body);

    // Devolver el registro actualizado (puedes incluir relaciones si quieres)
    const actualizado = await Receptor.findByPk(id);
    res.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar receptor:', error);
    res.status(500).json({ error: 'Error al actualizar receptor' });
  }
};

const eliminarReceptor = async (req, res) => {
  try {
    const id = req.params.id;
    const receptor = await Receptor.findByPk(id);

    if (!receptor) {
      return res.status(404).json({ error: 'Receptor no encontrado' });
    }

    await receptor.destroy();

    // 204 No Content indica éxito sin cuerpo
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar receptor:', error);
    res.status(500).json({ error: 'Error al eliminar receptor' });
  }
};

module.exports = {
  listarReceptores,
  obtenerReceptorPorId,
  crearReceptor,
  actualizarReceptor,
  eliminarReceptor
};
