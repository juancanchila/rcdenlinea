// models/ReporteRcdTransportador.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ReporteRcdTransportador', {
    idreportesRCDTrans: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaReporte: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reportesRCD: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    volumenEstmRCD: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fechaRegistro: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    documento: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idtransportador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idgenerador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idreceptor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'reportesrcdtransportador',
    timestamps: false
  });
};