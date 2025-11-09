module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Proyecto', {
    idProyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING(300),
    ubicacion: DataTypes.STRING(300),
    tipoUsoPredio: DataTypes.STRING(45),
    localidad: DataTypes.STRING(45),
    barrio: DataTypes.STRING(45),
    matriculaInmobiliaria: DataTypes.STRING(500),
    referenciaCatastral: DataTypes.STRING(200),
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    estadoProyecto: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'No reportado'
    },
    numLicenciaUrbanismo: DataTypes.STRING(45),
    fechaExpLicUrb: DataTypes.DATE,
    titularLicUrb: DataTypes.STRING(45),
    tipoIdentLicUrb: DataTypes.STRING(45),
    identificacionLicUrb: DataTypes.STRING(45),
    curaduria: DataTypes.STRING(45),
    areaVerdes: DataTypes.STRING(45),
    areaConstruccionAprobada: DataTypes.STRING(45),
    valor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    volumenEstimGenrEscombros: DataTypes.STRING(45),
    volumenEstimEscavaciones: DataTypes.STRING(45),
    idgenerador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fechaExpedicionPIN: DataTypes.DATE,
    codigoRadicadoSIGOD: DataTypes.STRING(25),
    CoordenadaX: DataTypes.STRING(30),
    CoordenadaY: DataTypes.STRING(30)
  }, {
    tableName: 'proyecto',
    timestamps: false
  });
};