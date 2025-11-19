const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'epacartagena_escombros_1',      // BD
  'epacartagena_bd_5',             // Usuario
  '97lXl&j58',                     // Clave
  {
    host: '172.31.11.185',         // HOST LIMPIO
    port: 3306,                    // AGREGA EL PUERTO (normal de MariaDB)
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      timezone: 'Etc/GMT+5',       // opcional pero recomendado
    },
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;
