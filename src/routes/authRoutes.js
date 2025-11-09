const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario EPA
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               clave:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', loginController.login);

module.exports = router;