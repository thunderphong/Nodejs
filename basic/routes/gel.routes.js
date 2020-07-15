// Set express and route
const express = require('express');
const router = express.Router();

// Import controllers
const { gel, createGel } = require('../controllers/gel.controllers');
const { validateRule, validate } = require('../helpers/gel.helpers');

router.get('/', gel);
router.post('/', validateRule(), validate, createGel);

module.exports = router;