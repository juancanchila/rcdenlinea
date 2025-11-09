// Importar Express
const express = require('express');
const app = express();

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde rcdenlinea con Express!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
