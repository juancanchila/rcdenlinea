const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('epacartagena_escombros_1', 'epacartagena_bd_5', '97lXl&j58', {
  host: ' 172.31.11.185:3306',
  dialect: 'mariadb',
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;
