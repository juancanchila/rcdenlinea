require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,     // EL PUERTO DEL ENV
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      timezone: 'Etc/GMT+5'
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

module.exports = sequelize;
