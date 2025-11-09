// routes/receptorRoutes.js

const express = require('express');
const router = express.Router();
const receptorController = require('../controllers/receptorController');

/**
 * @swagger
 * tags:
 *   name: Receptores
 *   description: Gestión de receptores EPA
 */

/**
 * @swagger
 * /receptor:
 *   get:
 *     summary: Listar receptores paginados
 *     tags: [Receptores]
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
 *         description: Lista paginada de receptores
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', receptorController.listarReceptores);

/**
 * @swagger
 * /receptor/{id}:
 *   get:
 *     summary: Obtener receptor por ID
 *     tags: [Receptores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del receptor
 *     responses:
 *       200:
 *         description: Receptor encontrado
 *       404:
 *         description: Receptor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', receptorController.obtenerReceptorPorId);

module.exports = router;