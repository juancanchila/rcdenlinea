const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    idusuario: {   // igual al nombre real en tu tabla
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    clave: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
};
