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
    CoordenadaY: DataTypes.STRING(30),

    // Campos nuevos
    carta_solicitud: DataTypes.STRING(600),
    descripcion_tecnica_proyecto: DataTypes.STRING(600),
    certificado_tradicion_libertad: DataTypes.STRING(600),
    autorizacion_bic: DataTypes.STRING(600),
    registro_defuncion: DataTypes.STRING(600),
    cuadro_cantidades_rcd: DataTypes.STRING(600),
    soporte_pago_pin: DataTypes.STRING(600),
    cronograma_actividades: DataTypes.STRING(600),
    planos_aprobados_curaduria: DataTypes.STRING(600),
    contrato_obra_otros: DataTypes.STRING(600),
    resolucion_curaduria_o_licencia: DataTypes.STRING(600),
    programa_manejo_rcd_pdf: DataTypes.STRING(600),
    autorizacion_bicBigOrSmall: DataTypes.STRING(600),
    certificado_no_requiere_licencia: DataTypes.STRING(600),
    permiso_ocupacion_cauce: DataTypes.STRING(6000),
    tipo: {
      type: DataTypes.STRING(600),
      allowNull: false
    }
  }, {
    tableName: 'proyecto',
    timestamps: false
  });
};
