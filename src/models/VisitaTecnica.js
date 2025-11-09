module.exports = (sequelize, DataTypes) => {
  return sequelize.define('VisitaTecnica', {
    idvisitatecnica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    fechaVisita: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idTecnico: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estadoProyecto: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'No reportado'
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    acta: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'visitatecnica',
    timestamps: false
  });
};
