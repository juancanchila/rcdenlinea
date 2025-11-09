module.exports = (sequelize, DataTypes) => {
  const Transportador = sequelize.define('Transportador', {
    idtransportador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipoDocumento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    numeroDocumento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    primerNombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    segundoNombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    primerApellidos: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    segundoApellido: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    razonSocial: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    documentoIdentificacion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    documentoRUT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    correoElectronico: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    clave: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ciiu: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tipoDocumentoRL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numeroDocumentoRL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nombreRL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    emailRL: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'transportador',
    timestamps: false
  });

  Transportador.associate = models => {
    Transportador.hasMany(models.Vehiculo, {
      foreignKey: 'idtransportador',
      sourceKey: 'idtransportador'
    });
  };

  return Transportador;
};