const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const multer = require('multer'); 
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta base de almacenamiento
const uploadsDir = path.join(__dirname, '../../private_uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, file.originalname.normalize('NFC'))
});
const upload = multer({ storage });

// Normalización de nombres
function normalizeFilename(filename) {
  return decodeURIComponent(filename).normalize('NFC').replace(/\+/g, ' ');
}

// GET: Descargar archivo
router.get('/:filename', (req, res) => {
  const rawFilename = req.params.filename;
  const filename = normalizeFilename(rawFilename);
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: 'Archivo no encontrado',
      receivedFilename: rawFilename,
      normalizedFilename: filename,
      attemptedPath: filePath
    });
  }

  res.sendFile(filePath, err => {
    if (err) {
      console.error('Error al enviar el archivo:', err.message);
      res.status(500).send('Error al enviar el archivo');
    }
  });
});

// POST: Subir archivo
router.post('/', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibió ningún archivo' });
  }

  const { originalname, size, mimetype, path: savedPath } = req.file;
  res.status(201).json({
    message: 'Archivo subido correctamente',
    filename: originalname,
    size,
    mimetype,
    savedPath
  });
});

module.exports = router;