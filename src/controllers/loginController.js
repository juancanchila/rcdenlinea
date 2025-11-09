const { Usuario, Rol } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { usuario, clave } = req.body;

  // Validar entrada
  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Usuario y clave son obligatorios' });
  }

  try {
    // Buscar usuario + rol asociado
    const user = await Usuario.findOne({
      where: { usuario, estado: 'Activo' },
      include: {
        model: Rol,
        attributes: ['id_rol', 'rol'] // solo traemos lo necesario
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña en texto plano (porque no está encriptada)
    if (clave !== user.clave) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear payload para el token
    const payload = {
      id: user.idusuario,
      usuario: user.usuario,
      rol: user.Rol.rol // 👈 ahora metemos el nombre del rol en el token
    };

    // Generar JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto', {
      expiresIn: '1h'
    });

    // Guardar token en cookie
    res.cookie(process.env.COOKIE_NAME || 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600000 // 1 hora
    });

    // Respuesta
    return res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: user.usuario,
      nombre: user.nombre,
      email: user.email,
      idusuario: user.idusuario,
      id_rol: user.Rol.id_rol, // id del rol
      rol: user.Rol.rol        // nombre del rol
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { login };
