require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const generadorRoutes = require('./routes/generadorRoutes');
const transportadorRoutes = require('./routes/transportadorRoutes');
const receptorRoutes = require('./routes/receptorRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const resolucionRoutes = require('./routes/resolucionRoutes');
const visitatecnicaRoutes = require('./routes/visitaTecnicaRoutes');
const reporteImpPmaRcdRoutes = require('./routes/reporteImpPmaRcdRoutes');
const reporteReporteRcdGenerador = require('./routes/rcdgeneradorRoutes');
const roleRoutes = require('./routes/roleRoutes');
const pinRoutes = require('./routes/pinRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Habilitar CORS globalmente
app.use(cors({
  origin: [
    'http://localhost:4200',                   // Angular local
    'https://rcdenlinea.epacartagena.gov.co'   // Producción
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// 🔹 Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor rcdenlinea corriendo y prueba de conexión ejecutada.');
});

// 🔹 Configuración Swagger
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
        url: 'https://rcdenlinea.epacartagena.gov.co',
      },
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Asegúrate de usar './routes/*.js' si index.js está dentro de src
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 Registrar todas las rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/generador', generadorRoutes);
app.use('/api/transportador', transportadorRoutes);
app.use('/api/receptor', receptorRoutes);
app.use('/api/proyecto', proyectoRoutes);
app.use('/api/vehiculo', vehiculoRoutes);
app.use('/api/resolucion', resolucionRoutes);
app.use('/api/visitatecnica', visitatecnicaRoutes);
app.use('/api/reportespma', reporteImpPmaRcdRoutes);
app.use('/api/reportesrcd', reporteReporteRcdGenerador);
app.use('/api/roles', roleRoutes);
app.use('/api/pin', pinRoutes); // PIN

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// 🔹 Exportar para pruebas o PM2
module.exports = app;
