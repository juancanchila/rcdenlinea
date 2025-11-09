require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Función de prueba de conexión
async function testDBConnection() {
  console.log('🧪 Probando conexión con la base de datos...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('\n✅ CONEXIÓN EXITOSA A LA BASE DE DATOS ✅');
    console.log(`   Base de datos: ${process.env.DB_NAME}`);
    console.log(`   Usuario: ${process.env.DB_USER}`);
    console.log(`   Servidor: ${process.env.DB_HOST}\n`);

    await connection.end();
    return true;

  } catch (error) {
    console.error('\n❌ ERROR AL CONECTAR CON LA BASE DE DATOS ❌');
    console.error(`   Detalle: ${error.message}\n`);
    return false;
  }
}

// Ruta principal: ejecuta la prueba de conexión
app.get('/', async (req, res) => {
  const success = await testDBConnection();

  if (success) {
    res.send('✅ Conexión exitosa a la base de datos. Ver consola para detalles.');
  } else {
    res.send('❌ Error al conectar con la base de datos. Revisa la consola.');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
