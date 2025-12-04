require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');
// 🔹 Importar rutas
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
const fileRoutes = require('./routes/fileRoutes');
const roleRoutes = require('./routes/roleRoutes');
const pinRoutes = require('./routes/pinRoutes');
const exportRoutes = require('./routes/exportRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
// ---------------------------------------------------
// 🧩 Configuración de middlewares
// ---------------------------------------------------
app.use(express.json());

// 🔹 Configuración CORS (manual para funcionar en Plesk / Nginx)
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:4200',
    'https://gestionrcd.epacartagena.gov.co',
    'https://rcdenlinea.epacartagena.gov.co'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ---------------------------------------------------
// 🧩 Ruta principal
// ---------------------------------------------------
app.get('/', (req, res) => {
  res.send('✅ Servidor rcdenlinea corriendo y prueba de conexión ejecutada correctamente.');
});

// ---------------------------------------------------
// 🧩 Swagger configuración
// ---------------------------------------------------
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
  apis: ['./src/routes/*.js'], // Ajusta si el index.js está dentro de src/
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------------------------------
// 🧩 Rutas de la API
// ---------------------------------------------------
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
app.use('/api/pin', pinRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/export', exportRoutes);
// ---------------------------------------------------
// 🧩 Levantar servidor
// ---------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor rcdenlinea corriendo en http://localhost:${PORT}`);
});

// ---------------------------------------------------
// 🧩 Exportar para pruebas o PM2
// ---------------------------------------------------
module.exports = app;
