const express = require('express');
const router = express.Router();
const visitaTecnicaController = require('../controllers/visitaTecnicaController');

/**
 * @swagger
 * tags:
 *   name: VisitasTecnicas
 *   description: Gestión de visitas técnicas
 */

/**
 * @swagger
 * /visitatecnica:
 *   get:
 *     summary: Listar visitas técnicas paginadas
 *     tags: [VisitasTecnicas]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de registros por página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Índice de inicio para paginación
 *     responses:
 *       200:
 *         description: Lista paginada de visitas técnicas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', visitaTecnicaController.listarVisitas);

/**
 * @swagger
 * /visitatecnica/{id}:
 *   get:
 *     summary: Obtener visita técnica por ID
 *     tags: [VisitasTecnicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita técnica
 *     responses:
 *       200:
 *         description: Visita técnica encontrada
 *       404:
 *         description: Visita técnica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', visitaTecnicaController.obtenerVisitaPorId);

/**
 * @swagger
 * /visitatecnica:
 *   post:
 *     summary: Crear una nueva visita técnica
 *     tags: [VisitasTecnicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               fechaVisita:
 *                 type: string
 *                 format: date
 *               idTecnico:
 *                 type: integer
 *               estadoProyecto:
 *                 type: string
 *               observaciones:
 *                 type: string
 *               idProyecto:
 *                 type: integer
 *               acta:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visita técnica creada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Proyecto no encontrado
 *       409:
 *         description: Ya existe una visita para el proyecto
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', visitaTecnicaController.crearVisita);

/**
 * @swagger
 * /visitatecnica/{id}:
 *   put:
 *     summary: Actualizar visita técnica por ID
 *     tags: [VisitasTecnicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita técnica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Visita técnica actualizada
 *       404:
 *         description: Visita técnica o proyecto no encontrado
 *       409:
 *         description: Conflicto con otra visita del proyecto
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', visitaTecnicaController.actualizarVisita);

/**
 * @swagger
 * /visitatecnica/{id}:
 *   delete:
 *     summary: Eliminar visita técnica por ID
 *     tags: [VisitasTecnicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la visita técnica
 *     responses:
 *       200:
 *         description: Visita técnica eliminada
 *       404:
 *         description: Visita técnica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', visitaTecnicaController.eliminarVisita);

module.exports = router;