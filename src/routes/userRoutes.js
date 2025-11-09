const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios EPA
 */

router.post('/', userController.crearUsuario);
router.get('/', userController.listarUsuarios);
router.get('/:id', userController.obtenerUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;