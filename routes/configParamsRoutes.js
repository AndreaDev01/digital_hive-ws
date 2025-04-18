const express = require('express');
const router = express.Router();
const ConfigParamsController = require('../controllers/configParamsController');
const configParamsValidationRules = require('../validators/configParamsValidator');
const validate = require('../middlewares/validate');


router.get('/:userId', ConfigParamsController.getConfigParams);
router.post('/', configParamsValidationRules, validate, ConfigParamsController.createConfigParams);
router.put('/:configParamId', configParamsValidationRules, validate, ConfigParamsController.updateConfigParams);


module.exports = router;