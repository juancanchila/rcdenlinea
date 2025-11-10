const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    // Leer el token desde las cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado. Token no encontrado en cookies.' });
    }

    // Verificar el token con tu clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
