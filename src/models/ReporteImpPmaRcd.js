// models/ReporteImpPmaRcd.js
module.exports = (sequelize, DataTypes) => {
  const ReporteImpPmaRcd = sequelize.define(
    'ReporteImpPmaRcd',
    {
      idreporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idproyecto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fechapresentacionreporte: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      fechainicioreporte: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      fechafinalreporte: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      formato: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      // Campos numéricos (default 0)
      rcd_sus_apro_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_1_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_1_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_1_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_1_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_1_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_2_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_2_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_2_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_2_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_2_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_3_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_3_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_3_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_3_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_3_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_4_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_4_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_4_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_4_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_sus_apro_1_4_total: { type: DataTypes.DOUBLE, defaultValue: 0 },

      // Campos no susceptibles
      rcd_no_sus_apro_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_1_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_1_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_1_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_1_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_1_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_2_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_2_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_2_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_2_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_2_total: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_3_apro_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_3_entr_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_3_entr_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_3_entr_sitio_disp_final: { type: DataTypes.DOUBLE, defaultValue: 0 },
      rcd_no_sus_apro_2_3_total: { type: DataTypes.DOUBLE, defaultValue: 0 },

      // Indicadores
      ind_cant_mat_const_usado_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      ind_cant_rcd_generado_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      ind_cant_rcd_aprovechado_obra: { type: DataTypes.DOUBLE, defaultValue: 0 },
      ind_cant_rcd_recibo_punto_limpio: { type: DataTypes.DOUBLE, defaultValue: 0 },
      ind_cant_rcd_recibo_planta_aprov: { type: DataTypes.DOUBLE, defaultValue: 0 },
      ind_cant_rcd_llevado_sitio_dispos_final: { type: DataTypes.DOUBLE, defaultValue: 0 },

      // Metas
      meta_mater_const_util_obra_fabri_de_rcd_tonelada: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_mater_const_util_obra_fabri_de_rcd_porcentaje: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_rcd_aprovechado_en_obra_tonelada: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_rcd_aprovechado_en_obra_porcentaje: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_rcd_entregado_planta_aprovechamiento_tonelada: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_rcd_entregado_planta_aprovechamiento_porcentaje: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_total_tonelada: { type: DataTypes.DOUBLE, defaultValue: 0 },
      meta_total_porcentaje: { type: DataTypes.DOUBLE, defaultValue: 0 }
    },
    {
      tableName: 'reporte_imp_pma_rcd',
      timestamps: false
    }
  );

  // aquí se añade la relación con Proyecto
  ReporteImpPmaRcd.associate = (models) => {
    ReporteImpPmaRcd.belongsTo(models.Proyecto, {
      as: 'proyecto',
      foreignKey: 'idproyecto'
    });
  };

  return ReporteImpPmaRcd;
};