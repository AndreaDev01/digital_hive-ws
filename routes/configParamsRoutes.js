const express = require('express');
const router = express.Router();
const ConfigParamsController = require('../controllers/configParamsController');
const configParamsValidationRules = require('../validators/configParamsValidator');
const validate = require('../middlewares/validate');
const protect = require('../middlewares/protect');
/**
 * @swagger
 * components:
 *   schemas:
 *     ConfigParams:
 *       type: object
 *       required:
 *         - temp_min
 *         - temp_max
 *         - hum_min
 *         - hum_max
 *         - weigth_min
 *         - weigth_max
 *         - userId
 *       properties:
 *         temp_min:
 *           type: number
 *           description: Min temperature
 *         temp_max:
 *           type: number
 *           description: Max temperature
 *         hum_min:
 *           type: number
 *           description: Min humidity
 *         hum_max:
 *           type: number
 *           description: Max humidity
 *         weigth_min:
 *           type: number
 *           description: Min weight
 *         weigth_max:
 *           type: number
 *           description: Max weight
 *         userId:
 *           type: string
 *           description: ID dell’utente
 */




/**
 * @swagger
 * /config_params/{userId}:
 *   get:
 *     summary: get ConfigParams from user id
 *     tags: [ConfigParams]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/ConfigParams'
 *       404:
 *         description: Config not found
 */
router.get('/:userId',protect, ConfigParamsController.getConfigParams);

/**
 * @swagger
 * /config_params:
 *   post:
 *     summary: Create a new config for user
 *     tags: [ConfigParams]  
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigParams'
 *     responses:
 *       201:
 *         description: Config created succesfully
 *       400:
 *         description: Params not valid
 */
router.post('/', protect, configParamsValidationRules, validate, ConfigParamsController.createConfigParams);

/**
 * @swagger
 * /config_params/{configParamId}:
 *   put:
 *     summary: Update config params
 *     tags: [ConfigParams]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     parameters:
 *       - in: path
 *         name: configParamId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of config to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigParams'
 *     responses:
 *       201:
 *         description: Config updated successfully
 *       400:
 *         description: Paframs not valid
 */
router.put('/:configParamId',protect,  configParamsValidationRules, validate, ConfigParamsController.updateConfigParams);


module.exports = router;