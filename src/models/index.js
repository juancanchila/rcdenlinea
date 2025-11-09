const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importar definiciones
const defineUsuario = require('./Usuario');
const defineRol = require('./Rol');
const defineGenerador = require('./Generador');
const defineTransportador = require('./Transportador');
const defineVehiculo = require('./Vehiculo');
const defineReceptor = require('./Receptor');
const defineProyecto = require('./Proyecto');
const defineResolucionAprovechamiento = require('./ResolucionAprovechamiento');
const defineVisitaTecnica = require('./VisitaTecnica');
const defineReporteImpPmaRcd = require('./ReporteImpPmaRcd');
const defineReporteRcdGenerador = require('./ReporteRcdGenerador');

// Definir modelos (siempre pasar DataTypes)
const Usuario = defineUsuario(sequelize, Sequelize.DataTypes);
const Rol = defineRol(sequelize, Sequelize.DataTypes);
const Generador = defineGenerador(sequelize, Sequelize.DataTypes);
const Transportador = defineTransportador(sequelize, Sequelize.DataTypes);
const Vehiculo = defineVehiculo(sequelize, Sequelize.DataTypes);
const Receptor = defineReceptor(sequelize, Sequelize.DataTypes);
const Proyecto = defineProyecto(sequelize, Sequelize.DataTypes);
const ResolucionAprovechamiento = defineResolucionAprovechamiento(sequelize, Sequelize.DataTypes);
const VisitaTecnica = defineVisitaTecnica(sequelize, Sequelize.DataTypes);
const ReporteImpPmaRcd = defineReporteImpPmaRcd(sequelize, Sequelize.DataTypes);
const ReporteRcdGenerador = defineReporteRcdGenerador(sequelize, Sequelize.DataTypes);

// Relaciones Usuario - Rol
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

// Relaciones Proyecto - VisitaTecnica
Proyecto.hasMany(VisitaTecnica, { as: 'visitas', foreignKey: 'idProyecto' });
VisitaTecnica.belongsTo(Proyecto, { as: 'proyecto', foreignKey: 'idProyecto' });

// Relaciones Generador - Proyecto
Generador.hasMany(Proyecto, { as: 'proyectos', foreignKey: 'idgenerador' });
Proyecto.belongsTo(Generador, { as: 'generador', foreignKey: 'idgenerador' });

// Relaciones Transportador - Vehiculo
Transportador.hasMany(Vehiculo, { as: 'vehiculos', foreignKey: 'idtransportador' });
Vehiculo.belongsTo(Transportador, { as: 'transportador', foreignKey: 'idtransportador' });

// Relación Proyecto - ReporteImpPmaRcd
Proyecto.hasMany(ReporteImpPmaRcd, {
  as: 'reportesImp',
  foreignKey: 'idproyecto'
});

ReporteImpPmaRcd.belongsTo(Proyecto, {
  as: 'proyecto',
  foreignKey: 'idproyecto'
});
// Relaciones Receptor - ResolucionAprovechamiento
Receptor.hasMany(ResolucionAprovechamiento, { 
  as: 'resoluciones', 
  foreignKey: 'idReceptor' 
});

ResolucionAprovechamiento.belongsTo(Receptor, { 
  as: 'receptor', 
  foreignKey: 'idReceptor' 
});


// Exportar
module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Rol,
  Generador,
  Transportador,
  Vehiculo,
  Receptor,
  Proyecto,
  ResolucionAprovechamiento,
  VisitaTecnica,
  ReporteImpPmaRcd,
  ReporteRcdGenerador
};
