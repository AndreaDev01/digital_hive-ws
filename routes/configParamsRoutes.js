const express = require('express');
const router = express.Router();
const ConfigParamsController = require('../controllers/configParamsController');
const configParamsValidationRules = require('../validators/configParamsValidator');
const validate = require('../middlewares/validate');


/**
 * @swagger
 * /configparams/{id}:
 *   get:
 *     summary: get ConfigParams from user id
 *     tags: [ConfigParams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID della configurazione
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Config not found
 */
router.get('/:userId', ConfigParamsController.getConfigParams);
router.post('/', configParamsValidationRules, validate, ConfigParamsController.createConfigParams);
router.put('/:configParamId', configParamsValidationRules, validate, ConfigParamsController.updateConfigParams);


module.exports = router;