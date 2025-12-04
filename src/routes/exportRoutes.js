// routes/exportRoutes.js
const express = require('express');
const router = express.Router();
const { exportAllPinsCsv } = require('../controllers/exportController');

router.get('/export/all', exportAllPinsCsv);

module.exports = router;
