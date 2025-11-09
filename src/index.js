require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
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

// 🔹 Rutas principales
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

// Exportar app
module.exports = app;

// Si quieres ejecutarlo directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
}
