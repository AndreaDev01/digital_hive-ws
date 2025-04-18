const express = require('express');
const router = express.Router();
const ConfigParamsController = require('../controllers/configParamsController');
const configParamsValidationRules = require('../validators/configParamsValidator');
const validate = require('../middlewares/validate');


router.get('/:userId', ConfigParamsController.getConfigParams);
router.post('/', configParamsValidationRules, validate, ConfigParamsController.createConfigParams);


module.exports = router;