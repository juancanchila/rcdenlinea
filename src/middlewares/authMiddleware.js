const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar token JWT.
 * Acepta token desde:
 * 1) Cookies (token_epa)
 * 2) Header Authorization: Bearer <token>
 * 3) Query param ?token=
 */
exports.verifyToken = (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Intentar desde cookies
    if (req.cookies && req.cookies.token_epa) {
      token = req.cookies.token_epa;
    }

    // 2️⃣ Intentar desde Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 3️⃣ Intentar desde query param
    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardar info del usuario en req para rutas posteriores

    next();
  } catch (err) {
    console.error('verifyToken error:', err.message || err);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
