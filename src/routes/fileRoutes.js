const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

// Función para normalizar nombres de archivo
function normalizeFilename(filename) {
  // Decodifica URI, reemplaza %20 y normaliza acentos
  return decodeURIComponent(filename)
    .normalize('NFC')      // Normaliza caracteres Unicode (acentos)
    .replace(/\+/g, ' '); // Reemplaza '+' por espacio si viene de URL
}

// Ruta protegida: descarga/ver archivo
router.get('/:filename', verifyToken, (req, res) => {
  const filename = normalizeFilename(req.params.filename);
  const filePath = path.join(__dirname, '..', 'private_uploads', filename);

  console.log('Buscando archivo en:', filePath); // Depuración

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Archivo no encontrado.' });
  }

  res.sendFile(filePath);
});

module.exports = router;
