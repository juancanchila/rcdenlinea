// src/routes/fileRoutes.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Carpeta base donde están los archivos (ajustar según tu despliegue)
const FILES_ROOT = path.resolve(__dirname, '../../public/uploads'); // <- cambia si corresponde

// Middleware reutilizable para obtener token desde cookie, header o query
function extractToken(req) {
  // 1) cookie token_epa o nombre configurable
  const cookieName = process.env.COOKIE_NAME || 'token_epa';
  if (req.cookies && req.cookies[cookieName]) return req.cookies[cookieName];

  // 2) Authorization: Bearer <token>
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) return auth.split(' ')[1];

  // 3) query param ?token=...
  if (req.query && (req.query.token || req.query.token_epa)) {
    return req.query.token || req.query.token_epa;
  }

  return null;
}

// Verificar y devolver payload o lanzar error
function verifyJwtToken(token) {
  const secret = process.env.JWT_SECRET || 'secreto';
  return jwt.verify(token, secret);
}

// Ruta para servir archivos protegidos: /api/files/:fileName
router.get('/:fileName', async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar token (lanzará si inválido/expirado)
    let decoded;
    try {
      decoded = verifyJwtToken(token);
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    // Seguridad: prevenir path traversal
    const rawName = req.params.fileName;
    if (!rawName || rawName.includes('..')) {
      return res.status(400).json({ message: 'Nombre de archivo inválido.' });
    }

    // Construir ruta segura al archivo
    const safeFileName = path.basename(rawName);
    const filePath = path.join(FILES_ROOT, safeFileName);

    // Verificar existencia
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    // Forzar descarga / inline según tipo. Si querés que el navegador lo muestre, usar inline.
    const ext = path.extname(safeFileName).toLowerCase();
    const inlineTypes = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
    const disposition = inlineTypes.includes(ext) ? 'inline' : 'attachment';

    res.setHeader('Content-Disposition', `${disposition}; filename="${safeFileName}"`);
    res.setHeader('Cache-Control', 'private, max-age=300');
    // Dejar que express determine Content-Type con res.sendFile

    return res.sendFile(filePath, err => {
      if (err) {
        console.error('Error enviando archivo:', err);
        // Si headers ya enviados, termina la respuesta
        if (!res.headersSent) {
          return res.status(500).json({ message: 'Error al enviar el archivo.' });
        }
      }
    });
  } catch (err) {
    console.error('fileRoutes error:', err);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;