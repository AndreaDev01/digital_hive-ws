const express = require('express');
const router = express.Router();
const HiveController = require('../controllers/hiveController');


router.get('/', HiveController.getHives);

module.exports = router;