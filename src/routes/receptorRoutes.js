// routes/receptorRoutes.js

const express = require('express');
const router = express.Router();
const receptorController = require('../controllers/receptorController');

/**
 * @swagger
 * tags:
 *   name: Receptores
 *   description: Gestión de receptores EPA
 *
 * components:
 *   schemas:
 *     Receptor:
 *       type: object
 *       properties:
 *         idreceptor:
 *           type: integer
 *           readOnly: true
 *         tipoDocumento:
 *           type: string
 *         numeroDocumento:
 *           type: string
 *         primerNombre:
 *           type: string
 *         segundoNombre:
 *           type: string
 *         primerApellidos:
 *           type: string
 *         segundoApellido:
 *           type: string
 *         razonSocial:
 *           type: string
 *         direccion:
 *           type: string
 *         correoElectronico:
 *           type: string
 *           format: email
 *         telefono:
 *           type: integer
 *         fax:
 *           type: string
 *         celular:
 *           type: string
 *         clave:
 *           type: string
 *         ciiu:
 *           type: string
 *         tipoDocumentoRL:
 *           type: string
 *         numeroDocumentoRL:
 *           type: string
 *         nombreRL:
 *           type: string
 *         emailRL:
 *           type: string
 *           format: email
 *         pin:
 *           type: string
 *       required:
 *         - tipoDocumento
 *         - numeroDocumento
 *         - direccion
 *         - correoElectronico
 *         - clave
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 offset:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Receptor'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receptor'
 *       404:
 *         description: Receptor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', receptorController.obtenerReceptorPorId);

/**
 * @swagger
 * /receptor:
 *   post:
 *     summary: Crear un nuevo receptor
 *     tags: [Receptores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receptor'
 *     responses:
 *       201:
 *         description: Receptor creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receptor'
 *       400:
 *         description: Datos inválidos o faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', receptorController.crearReceptor);

/**
 * @swagger
 * /receptor/{id}:
 *   put:
 *     summary: Actualizar receptor por ID
 *     tags: [Receptores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del receptor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receptor'
 *     responses:
 *       200:
 *         description: Receptor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receptor'
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Receptor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', receptorController.actualizarReceptor);

/**
 * @swagger
 * /receptor/{id}:
 *   delete:
 *     summary: Eliminar receptor por ID
 *     tags: [Receptores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del receptor a eliminar
 *     responses:
 *       204:
 *         description: Receptor eliminado (sin contenido)
 *       404:
 *         description: Receptor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', receptorController.eliminarReceptor);

module.exports = router;
