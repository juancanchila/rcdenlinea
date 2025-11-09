const express = require('express');
const router = express.Router();
const generadorController = require('../controllers/generadorController');

/**
 * @swagger
 * tags:
 *   name: Generadores
 *   description: Gestión de generadores EPA
 */

/**
 * @swagger
 * /generador:
 *   get:
 *     summary: Listar generadores paginados
 *     tags: [Generadores]
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
 *         description: Lista paginada de generadores
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', generadorController.listarGeneradores);

/**
 * @swagger
 * /generador/{id}:
 *   get:
 *     summary: Obtener generador por ID
 *     tags: [Generadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del generador
 *     responses:
 *       200:
 *         description: Generador encontrado
 *       404:
 *         description: Generador no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', generadorController.obtenerGeneradorPorId);

module.exports = router;