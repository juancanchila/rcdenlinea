// controllers/exportAllController.js
const { Proyecto, Generador, Vehiculo, Transportador, ResolucionAprovechamiento, Receptor } = require('../models');
const { Parser } = require('json2csv'); // npm i json2csv

const exportAllPinsCsv = async (req, res) => {
  try {
    const registros = [];

    // ---------------- VEHÍCULOS ----------------
    const vehiculos = await Vehiculo.findAll({
      include: [{ model: Transportador, as: 'transportador' }]
    });

    vehiculos.forEach(v => {
      const t = v.transportador || {};
      const nombreTransportador = t.tipoDocumento === 'NIT'
        ? t.razonSocial || 'N/A'
        : [t.primerNombre, t.segundoNombre, t.primerApellidos, t.segundoApellido].filter(Boolean).join(' ') || 'N/A';

      registros.push({
        tipoPin: 'TRANSPORTADOR',
        numeroPin: v.pin || 'N/A',
        placa: v.placaVehiculo || 'N/A',
        modelo: v.modelo || 'N/A',
        capacidad: v.capacidad || 'N/A',
        fechaExpedicionPIN: v.fechaExpedicionPIN || 'N/A',
        fechaVencimiento: v.fechaVencimientoPIN || 'N/A',
        tipoIdentificacion: t.tipoDocumento === 'Cedula' ? 'Cédula' : t.tipoDocumento || 'N/A',
        numeroIdentificacion: t.numeroDocumento || 'N/A',
        razonSocial: nombreTransportador,
        lugarExpedicion: v.lugarExpedicion || 'CARTAGENA',
        // Campos de proyecto/resolución vacíos
        fechaInicio: '',
        fechaFinalizacion: '',
        nombreProyecto: '',
        Direccion: '',
        matriculaInmobiliaria: '',
        numeroResolucion: '',
        tipoAprovechamiento: '',
        direccion: ''
      });
    });

    // ---------------- PROYECTOS ----------------
    const proyectos = await Proyecto.findAll({
      include: [{ model: Generador, as: 'generador' }]
    });

    proyectos.forEach(p => {
      const g = p.generador || {};
      const razonSocial = g.razonSocial || [g.primerNombre, g.segundoNombre, g.primerApellidos, g.segundoApellido].filter(Boolean).join(' ') || 'N/A';

      registros.push({
        tipoPin: 'GENERADOR',
        numeroPin: p.pin || 'N/A',
        tipoIdentificacion: g.tipoDocumento === 'cedula' ? 'Cédula' : g.tipoDocumento || 'N/A',
        numeroIdentificacion: g.numeroDocumento || 'N/A',
        razonSocial: razonSocial,
        fechaInicio: p.fechaInicio || 'N/A',
        fechaFinalizacion: p.fechaFin || 'N/A',
        nombreProyecto: p.nombre || 'N/A',
        Direccion: p.ubicacion || 'N/A',
        matriculaInmobiliaria: p.matriculaInmobiliaria || 'N/A',
        fechaExpedicionPIN: p.fechaExpedicionPIN || 'N/A',
        fechaVencimiento: p.fechaVencimiento || 'N/A',
        fechaInicio: p.fechaInicio || 'N/A',
        // Campos de vehículo/resolución vacíos
        placa: '',
        modelo: '',
        capacidad: '',
        lugarExpedicion: '',
        numeroResolucion: '',
        tipoAprovechamiento: '',
        direccion: ''
      });
    });

    // ---------------- RESOLUCIONES ----------------
    const resoluciones = await ResolucionAprovechamiento.findAll({
      include: [{ model: Receptor, as: 'receptor' }]
    });

    resoluciones.forEach(r => {
      const rec = r.receptor || {};
      const razonSocial = rec.razonSocial || [rec.primerNombre, rec.segundoNombre].filter(Boolean).join(' ') || 'N/A';

      registros.push({
        tipoPin: 'GESTOR',
        numeroPin: r.pin || 'N/A',
        numeroResolucion: r.numeroResolucion || 'N/A',
        tipoAprovechamiento: r.tipoAprovechamiento || 'N/A',
        fechaExpedicion: r.fechaInicio || 'N/A',
        fechaVencimiento: r.fechaFin || 'N/A',
        tipoIdentificacion: rec.tipoDocumento === 'Cedula' ? 'Cédula' : rec.tipoDocumento || 'N/A',
        numeroIdentificacion: rec.numeroDocumento || 'N/A',
        razonSocial: razonSocial,
        direccion: rec.direccion || 'N/A',
        // Campos de vehículo/proyecto vacíos
        placa: '',
        modelo: '',
        capacidad: '',
        lugarExpedicion: '',
        fechaInicio: '',
        fechaFinalizacion: '',
        nombreProyecto: '',
        Direccion: '',
        matriculaInmobiliaria: ''
      });
    });

    if (!registros.length) return res.status(404).json({ error: 'No hay registros para exportar' });

    const fields = Object.keys(registros[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(registros);

    res.header('Content-Type', 'text/csv');
    res.attachment(`todos_pins_export.csv`);
    return res.send(csv);

  } catch (error) {
    console.error('Error exportando todos los PINs:', error);
    return res.status(500).json({ error: 'Error al exportar los PINs' });
  }
};

module.exports = { exportAllPinsCsv };
