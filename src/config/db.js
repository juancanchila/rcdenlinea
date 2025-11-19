const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('epacartagena_escombros_1', 'epacartagena_bd_5', '97lXl&j58', {
  host: '34.234.151.198:8443',
  dialect: 'mariadb',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;
