require('dotenv').config(); // ✅ Carga variables de entorno desde .env
const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar token JWT.
 * Acepta token desde:
 * 1) Cookies (token_epa o lo que definas en COOKIE_NAME)
 * 2) Header Authorization: Bearer <token>
 * 3) Query param ?token=
 */
const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Desde cookies
    const cookieName = process.env.COOKIE_NAME || 'token';
    if (req.cookies && req.cookies[cookieName]) {
      token = req.cookies[cookieName];
    }

    // 2️⃣ Desde header Authorization
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 3️⃣ Desde query param
    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar JWT con fallback si JWT_SECRET no está definido
    const secret = process.env.JWT_SECRET || 'secreto';
    const decoded = jwt.verify(token, secret);

    // Guardar usuario decodificado en req
    req.user = decoded;

    next();
  } catch (err) {
    console.error('❌ verifyToken error:', err.message || err);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;