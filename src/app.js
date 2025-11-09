require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
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
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => res.send('Login EPA activo'));

// Swagger embebido como el ejemplo
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EPA Login API",
      version: "1.0.0",
      description: "Documentación del login de EPA",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // igual al ejemplo de Kapi
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use('/api/pin', pinRoutes); // Rutas para buscar por PIN

module.exports = app;