// models/Generador.js

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Generador', {
    idgenerador: {
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
      type: DataTypes.STRING(150),
      allowNull: true
    },
    documentoIdentificacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    documentoRUT: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipoRegistro: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    contratistaDe: {
      type: DataTypes.STRING(30),
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
      type: DataTypes.STRING(200),
      allowNull: true
    },
    emailRL: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'generador',
    timestamps: false
  });
};