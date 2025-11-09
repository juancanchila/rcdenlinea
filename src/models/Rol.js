const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Rol', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'rol',
    timestamps: false
  });
};
