const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('epacartagena', 'root', '1q2w3e4r5tPD!!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;