// models/ReporteRcdGenerador.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ReporteRcdGenerador', {
    idreportesRCDGen: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fechaReporte: { type: DataTypes.DATEONLY, allowNull: true },
    reportesRCD: { type: DataTypes.STRING(45), allowNull: true },
    volumenEstmRCD: { type: DataTypes.STRING(45), allowNull: true },
    fechaRegistro: { type: DataTypes.DATEONLY, allowNull: true },
    documento: { type: DataTypes.STRING(45), allowNull: true },
    idProyecto: { type: DataTypes.INTEGER, allowNull: false },
    transportador_idtransportador: { type: DataTypes.INTEGER, allowNull: false },
    idreceptor: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'reportesrcdgenerador',
    timestamps: false
  });
};
