module.exports = (sequelize, DataTypes) => {
  const Vehiculo = sequelize.define('Vehiculo', {
    idvehiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    placaVehiculo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lugarExpedicion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    modelo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    capacidad: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fechaUltimaRevTecMec: {
      type: DataTypes.DATE,
      allowNull: true
    },
    permisoMovilizacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nombreConductor: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numeroIdentificacion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fotoFrente: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fotoLadoDerecho: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fotoLadoIzquierdo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fotoTrasera: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    idtransportador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    licenciaTransito: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    certificadoRevTecMec: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaExpedicionPIN: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fechaVencimientoPIN: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigoRadicadoSIGOD: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'vehiculo',
    timestamps: false
  });

  Vehiculo.associate = models => {
    Vehiculo.belongsTo(models.Transportador, {
      foreignKey: 'idtransportador',
      targetKey: 'idtransportador'
    });
  };

  return Vehiculo;
};