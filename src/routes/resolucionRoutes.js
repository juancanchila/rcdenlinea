const express = require('express');
const router = express.Router();
const resolucionController = require('../controllers/resolucionController');

/**
 * @swagger
 * tags:
 *   name: Resoluciones
 *   description: Gestión de resoluciones de aprovechamiento
 */

/**
 * @swagger
 * /resolucion:
 *   get:
 *     summary: Listar resoluciones paginadas
 *     tags: [Resoluciones]
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
 *         description: Lista paginada de resoluciones
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', resolucionController.listarResoluciones);

/**
 * @swagger
 * /resolucion/{id}:
 *   get:
 *     summary: Obtener resolución por ID
 *     tags: [Resoluciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la resolución
 *     responses:
 *       200:
 *         description: Resolución encontrada
 *       404:
 *         description: Resolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', resolucionController.obtenerResolucionPorId);

/**
 * @swagger
 * /resolucion:
 *   post:
 *     summary: Crear una nueva resolución
 *     tags: [Resoluciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resolucion'
 *     responses:
 *       201:
 *         description: Resolución creada exitosamente
 *       400:
 *         description: Error de validación de datos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', resolucionController.crearResolucion);

/**
 * @swagger
 * /resolucion/{id}:
 *   put:
 *     summary: Actualizar resolución por ID
 *     tags: [Resoluciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la resolución a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resolucion'
 *     responses:
 *       200:
 *         description: Resolución actualizada correctamente
 *       404:
 *         description: Resolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', resolucionController.actualizarResolucion);

/**
 * @swagger
 * /resolucion/{id}:
 *   delete:
 *     summary: Eliminar resolución por ID
 *     tags: [Resoluciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la resolución a eliminar
 *     responses:
 *       200:
 *         description: Resolución eliminada exitosamente
 *       404:
 *         description: Resolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', resolucionController.eliminarResolucion);

module.exports = router;
