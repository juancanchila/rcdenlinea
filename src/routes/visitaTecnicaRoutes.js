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

module.exports = router;
