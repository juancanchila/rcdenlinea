// models/ReporteRcdReceptor.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ReporteRcdReceptor', {
    idreportesrcdrecep: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipoRCD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    volumenEstmRCD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechaRecibido: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idReceptor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTransportador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idGenerador: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'reportesrcdreceptor',
    timestamps: false
  });
};