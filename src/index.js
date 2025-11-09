require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor rcdenlinea corriendo y prueba de conexión ejecutada.');
});

// 🔹 Swagger configuración
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API rcdenlinea',
      version: '1.0.0',
      description: 'Documentación de la API rcdenlinea',
    },
    servers: [ 
      {
        url: `https://rcdenlinea.epacartagena.gov.co`,
      },
    ],
  },
apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 Rutas
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;