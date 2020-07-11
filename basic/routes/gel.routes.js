// Set express and route
const express = require('express');
const router = express.Router();

// Import controllers
const controller = require('../controllers/gel.controllers');
const { validateRule, validate } = require('../helpers/gel.helpers');

router.get('/', controller.gel);
router.post('/', validateRule(), validate, controller.createGel);

module.exports = router;