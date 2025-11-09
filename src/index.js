require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Función para probar la conexión
async function testDBConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Conexión a la base de datos exitosa');
    await connection.end();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
}

// Probar conexión al iniciar
testDBConnection();

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
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 Rutas
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;