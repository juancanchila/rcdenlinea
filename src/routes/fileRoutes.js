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
    .replace(/\+/g, ' ');  // Reemplaza '+' por espacio
}

// Ruta protegida: descarga/ver archivo
router.get('/:filename', verifyToken, (req, res) => {
  const rawFilename = req.params.filename;
  const filename = normalizeFilename(rawFilename);

  // Depuración rutas
  console.log('-----------------------------');
  console.log('Nombre recibido por URL:', rawFilename);
  console.log('Nombre decodificado:', decodeURIComponent(rawFilename));
  console.log('Nombre normalizado:', filename);
  console.log('Directorio actual (__dirname):', __dirname);

  // Ruta absoluta de Plesk para este dominio
  // Nota: ajusta según la ruta real de tu dominio
  const uploadsDir = path.join(__dirname, '../../private_uploads'); // ejemplo típico en Plesk
  const filePath = path.join(uploadsDir, filename);

  console.log('Ruta del directorio uploads:', uploadsDir);
  console.log('Ruta absoluta del archivo:', filePath);

  // Listar archivos en el directorio para depuración
  try {
    const filesInDir = fs.readdirSync(uploadsDir);
    console.log('Archivos en el directorio uploads:', filesInDir);
  } catch (err) {
    console.error('Error leyendo directorio uploads:', err.message);
  }

  // Comprobar existencia
  if (!fs.existsSync(filePath)) {
    console.log('Archivo no encontrado en disco.');
    return res.status(404).json({
      message: 'Archivo no encontrado',
      receivedFilename: rawFilename,
      normalizedFilename: filename,
      attemptedPath: filePath
    });
  }

  // Información del archivo
  const stats = fs.statSync(filePath);
  const mimeType = mime.lookup(filePath) || 'unknown';
  console.log('Archivo encontrado:');
  console.log('Tamaño:', stats.size, 'bytes');
  console.log('Tipo MIME:', mimeType);

  // Enviar archivo
  res.sendFile(filePath, err => {
    if (err) {
      console.error('Error al enviar el archivo:', err.message);
      res.status(500).send('Error al enviar el archivo');
    } else {
      console.log('Archivo enviado correctamente:', filename);
    }
  });
});

module.exports = router;
