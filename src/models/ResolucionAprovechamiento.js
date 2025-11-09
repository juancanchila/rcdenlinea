// models/ResolucionAprovechamiento.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ResolucionAprovechamiento',
    {
      idresolucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numeroResolucion: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      ubicacion: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      localidad: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      naturalezaActividad: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      tipoAprovechamiento: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
      },
      cantidadRCD: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      CoordenadaX: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      CoordenadaY: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      fechaExpedicionPIN: {
        type: DataTypes.DATE,
        allowNull: true
      },
      codigoRadicadoSIGOD: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      idReceptor: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pin: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'resolucionaprovechamiento',
      timestamps: false
    }
  );
};