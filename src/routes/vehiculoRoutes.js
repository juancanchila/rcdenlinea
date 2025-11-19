const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

/**
 * @swagger
 * tags:
 *   name: Vehículos
 *   description: Gestión de vehículos EPA
 */

/**
 * @swagger
 * /vehiculo:
 *   get:
 *     summary: Listar vehículos paginados
 *     tags: [Vehículos]
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
 *         description: Lista paginada de vehículos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', vehiculoController.listarVehiculos);

/**
 * @swagger
 * /vehiculo/{id}:
 *   get:
 *     summary: Obtener vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', vehiculoController.obtenerVehiculoPorId);

/**
 * @swagger
 * /vehiculo:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente
 *       400:
 *         description: Faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', vehiculoController.crearVehiculo);

/**
 * @swagger
 * /vehiculo/{id}:
 *   put:
 *     summary: Actualizar vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', vehiculoController.actualizarVehiculo);

/**
 * @swagger
 * /vehiculo/{id}:
 *   delete:
 *     summary: Eliminar vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a eliminar
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', vehiculoController.eliminarVehiculo);

module.exports = router;
