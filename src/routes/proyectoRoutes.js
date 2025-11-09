const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

/**
 * @swagger
 * tags:
 *   name: Proyectos
 *   description: Gestión de proyectos EPA
 */

/**
 * @swagger
 * /proyecto:
 *   get:
 *     summary: Listar proyectos paginados
 *     tags: [Proyectos]
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
 *         description: Lista paginada de proyectos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', proyectoController.listarProyectos);

/**
 * @swagger
 * /proyecto/{id}:
 *   get:
 *     summary: Obtener proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', proyectoController.obtenerProyectoPorId);

module.exports = router;