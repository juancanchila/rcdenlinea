require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RCD en Línea',
      version: '1.0.0',
      description: 'Documentación de la API para el proyecto rcdenlinea',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./index.js'], // aquí puedes poner la ruta a tus archivos con endpoints
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Función para probar la conexión
async function testDBConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log('✅ Conexión a la base de datos exitosa');
    await connection.end();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
}

// Probar conexión al iniciar
testDBConnection();

// Ruta de prueba
/**
 * @swagger
 * /:
 *   get:
 *     summary: Prueba del servidor
 *     description: Retorna un mensaje de confirmación del servidor.
 *     responses:
 *       200:
 *         description: Servidor corriendo correctamente
 */
app.get('/', (req, res) => {
  res.send('Servidor rcdenlinea corriendo y prueba de conexión ejecutada.');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📘 Documentación disponible en http://localhost:${PORT}/api-docs`);
});
