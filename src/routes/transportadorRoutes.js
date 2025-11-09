const express = require('express');
const router = express.Router();
const transportadorController = require('../controllers/transportadorController');

/**
 * @swagger
 * tags:
 *   name: Transportadores
 *   description: Gestión de transportadores EPA
 */

/**
 * @swagger
 * /transportador:
 *   get:
 *     summary: Listar transportadores paginados
 *     tags: [Transportadores]
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
 *         description: Lista paginada de transportadores
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', transportadorController.listarTransportadores);

/**
 * @swagger
 * /transportador/{id}:
 *   get:
 *     summary: Obtener transportador por ID
 *     tags: [Transportadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del transportador
 *     responses:
 *       200:
 *         description: Transportador encontrado
 *       404:
 *         description: Transportador no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', transportadorController.obtenerTransportadorPorId);

module.exports = router;