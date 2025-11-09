const { Usuario, Rol } = require('../models');

const crearUsuario = async (req, res) => {
  const { usuario, clave, nombre, id_rol } = req.body;
  if (!usuario || !clave || !nombre || !id_rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevo = await Usuario.create({ usuario, clave, nombre, id_rol, estado: 'Activo' });
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const listarUsuarios = async (_, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: { model: Rol, attributes: ['rol'] },
      attributes: { exclude: ['clave'] }
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Error al listar usuarios' });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      include: { model: Rol, attributes: ['rol'] },
      attributes: { exclude: ['clave'] }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
   const { usuario, clave, nombre, email, estado, id_rol } = req.body;

  try {
    const user = await Usuario.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.update({
      usuario: usuario ?? user.usuario,
      clave: clave ?? user.clave,
      nombre: nombre ?? user.nombre,
      email: email ?? user.email,
      estado: estado ?? user.estado,
      id_rol: id_rol ?? user.id_rol,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error al editar usuario' });
  }
};

const desactivarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.update({ estado: 'Inactivo' });
    return res.status(200).json({ mensaje: 'Usuario desactivado' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al desactivar usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Usuario.destroy({ where: { idusuario: id } });
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.status(200).json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  editarUsuario,
  desactivarUsuario,
  eliminarUsuario
};