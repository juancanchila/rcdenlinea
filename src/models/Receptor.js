// models/Receptor.js

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Receptor', {
    idreceptor: {
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
      type: DataTypes.STRING(100),
      allowNull: true
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
    },
    pin: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'receptor',
    timestamps: false
  });
};