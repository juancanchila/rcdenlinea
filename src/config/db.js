const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('epacartagena_escombros_1', 'epacartagena_bd_5', '02v1Yj@9j', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;
