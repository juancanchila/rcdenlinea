const { Generador, Proyecto } = require('../models');

const { sequelize } = require('../models');

const listarProyectos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Proyecto.findAndCountAll({
      limit,
      offset,
      order: [['idProyecto', 'DESC']],
      include: [
        {
          model: Generador,
          as: 'generador',
          attributes: [
            'idgenerador',
            'tipoDocumento',
            'razonSocial',
            'primerNombre',
            'segundoNombre',
            'primerApellidos',
            'segundoApellido',

            // 💥 Campo calculado
            [
              sequelize.literal(`
                CASE 
                  WHEN generador.tipoDocumento = 'NIT' 
                    THEN generador.razonSocial
                  ELSE CONCAT(
                    IFNULL(generador.primerNombre, ''), ' ',
                    IFNULL(generador.segundoNombre, ''), ' ',
                    IFNULL(generador.primerApellidos, ''), ' ',
                    IFNULL(generador.segundoApellido, '')
                  )
                END
              `),
              'nombreGenerador'
            ]
          ]
        }
      ]
    });

    res.json({
      total: count,
      limit,
      offset,
      data: rows
    });

  } catch (error) {
    console.error("❌ Error listar proyectos:", error);
    res.status(500).json({ error: "Error al listar proyectos" });
  }
};


const crearGenerador = async (req, res) => {
  try {
    const generador = await Generador.create(req.body);
    res.status(201).json(generador);
  } catch (error) {
    console.error('❌ Error crearGenerador:', error);
    res.status(500).json({ error });
  }
};


const obtenerGeneradorPorId = async (req, res) => {
  try {
    const generador = await Generador.findByPk(req.params.id, {
      include: [
        {
          model: Proyecto,
          as: 'proyectos'
        }
      ]
    });

    if (!generador) {
      return res.status(404).json({ error: 'Generador no encontrado' });
    }

    res.json(generador);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener generador' });
  }
};

const actualizarGenerador = async (req, res) => {
  try {
    const id = req.params.id;
    const generador = await Generador.findByPk(id);

    if (!generador) {
      return res.status(404).json({ error: 'Generador no encontrado' });
    }

    // Permitir actualización de los campos enviados en el body
    // Se actualizan solo las propiedades presentes en req.body
    const camposActualizables = [
      'tipoDocumento',
      'numeroDocumento',
      'primerNombre',
      'segundoNombre',
      'primerApellidos',
      'segundoApellido',
      'razonSocial',
      'documentoIdentificacion',
      'documentoRUT',
      'tipoRegistro',
      'contratistaDe',
      'direccion',
      'correoElectronico',
      'telefono',
      'fax',
      'celular',
      'clave',
      'ciiu',
      'tipoDocumentoRL',
      'numeroDocumentoRL',
      'nombreRL',
      'emailRL'
    ];

    camposActualizables.forEach((campo) => {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        generador[campo] = req.body[campo];
      }
    });

    await generador.save();

    res.json({ message: 'Generador actualizado correctamente', data: generador });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar generador' });
  }
};

const eliminarGenerador = async (req, res) => {
  try {
    const id = req.params.id;
    const generador = await Generador.findByPk(id);

    if (!generador) {
      return res.status(404).json({ error: 'Generador no encontrado' });
    }

    await Generador.destroy({ where: { idgenerador: id } });

    res.json({ message: 'Generador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar generador' });
  }
};

module.exports = {
  listarGeneradores,
  obtenerGeneradorPorId,
  actualizarGenerador,
  eliminarGenerador,
  crearGenerador
};