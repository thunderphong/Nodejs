// Set express and route
const express = require('express');
const router = express.Router();

// Import controllers
const controller = require('../controllers/gel.controllers');

router.get('/', controller.gel);
router.post('/', controller.createGel);

module.exports = router;