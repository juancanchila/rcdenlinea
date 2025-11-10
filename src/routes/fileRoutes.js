const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Ruta protegida: descarga/ver archivo
router.get('/:filename', verifyToken, (req, res) => {
  const filePath = path.join(__dirname, '..', 'private_uploads', req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Archivo no encontrado.' });
  }

  res.sendFile(filePath);
});

module.exports = router;
