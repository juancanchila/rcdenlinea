const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types'); // npm i mime-types
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

// Función para normalizar nombres de archivo
function normalizeFilename(filename) {
  return decodeURIComponent(filename)
    .normalize('NFC')      // Normaliza caracteres Unicode (acentos)
    .replace(/\+/g, ' '); // Reemplaza '+' por espacio
}

// Ruta protegida: descarga/ver archivo
router.get('/:filename', verifyToken, (req, res) => {
  const rawFilename = req.params.filename;
  const filename = normalizeFilename(rawFilename);
const filePath = path.join('/var/www/rcdenlinea/private_uploads', filename);


  console.log('-----------------------------');
  console.log('Archivo recibido:', rawFilename);
  console.log('Archivo normalizado:', filename);
  console.log('Ruta completa:', filePath);

  if (!fs.existsSync(filePath)) {
    console.log('Archivo no encontrado.');
    return res.status(404).json({ 
      message: 'Archivo no encontrado.',
      receivedFilename: rawFilename,
      normalizedFilename: filename,
      attemptedPath: filePath
    });
  }

  // Obtener información adicional del archivo
  const stats = fs.statSync(filePath);
  const mimeType = mime.lookup(filePath) || 'unknown';

  console.log('Archivo encontrado:');
  console.log('Tamaño:', stats.size, 'bytes');
  console.log('Tipo MIME:', mimeType);

  // Respuesta JSON con información antes de enviar el archivo
  res.json({
    message: 'Archivo encontrado',
    receivedFilename: rawFilename,
    normalizedFilename: filename,
    path: filePath,
    size: stats.size,
    mimeType: mimeType
  });

  // Si quieres enviar el archivo en lugar de JSON, comenta la línea anterior y descomenta esta:
  // res.sendFile(filePath);
});

module.exports = router;
