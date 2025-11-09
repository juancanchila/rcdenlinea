require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');



const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Ruta raíz
app.get('/', (req, res) => res.send('Login EPA activo'));

// 🔹 Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RCD en Línea (EPA)',
      version: '1.0.0',
      description: 'Documentación completa de los endpoints del sistema EPA',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // escanea tus archivos de rutas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Exportar app
module.exports = app;

// Si quieres ejecutarlo directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
}
