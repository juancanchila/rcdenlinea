const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar JWT desde una cookie llamada "token".
 */
exports.verifyToken = (req, res, next) => {
  // 🧩 Leer token desde la cookie o desde el header (por compatibilidad)
  const token =
    req.cookies?.token ||
    (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // 🧩 Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
