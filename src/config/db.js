const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'epacartagena_escombros_1',   // Base de datos
    'epacartagena_bd_5',          // Usuario
    '97lXl&j58',                  // Clave
    {
        host: '172.31.11.185',    // Host limpio
        port: 3306,               // Puerto de MariaDB
        dialect: 'mariadb',
        logging: false,
        dialectOptions: {
            timezone: 'Etc/GMT+5',   // Opcional pero recomendado
        },
        define: {
            timestamps: false,
            freezeTableName: true,
        },
    }
);

module.exports = sequelize;
