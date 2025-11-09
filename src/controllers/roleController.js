const {  Rol } = require('../models');

const listarRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: 'Error al listar roles' });
  }
};

// genera el export de las funciones
module.exports = {
  listarRoles,};
  