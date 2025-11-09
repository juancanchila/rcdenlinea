const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles EPA
 */

router.get('/', roleController.listarRoles);

module.exports = router;