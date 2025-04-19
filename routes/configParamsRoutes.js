const express = require('express');
const router = express.Router();
const ConfigParamsController = require('../controllers/configParamsController');
const configParamsValidationRules = require('../validators/configParamsValidator');
const validate = require('../middlewares/validate');

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
 * /configparams/{userId}:
 *   get:
 *     summary: get ConfigParams from user id
 *     tags: [ConfigParams]
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
 *       404:
 *         description: Config not found
 */
router.get('/:userId', ConfigParamsController.getConfigParams);

/**
 * @swagger
 * /config:
 *   post:
 *     summary: Crea una configurazione utente
 *     tags: [Config]
 *     parameters:
 *       - in: path
 *         name: configID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID della configurazione   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigParams'
 *     responses:
 *       201:
 *         description: Configurazione creata con successo
 *       400:
 *         description: Parametri non validi
 */
router.post('/', configParamsValidationRules, validate, ConfigParamsController.createConfigParams);

/**
 * @swagger
 * /config:
 *   put:
 *     summary: Modifica una configurazione utente
 *     tags: [Config]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigParams'
 *     responses:
 *       201:
 *         description: Configurazione modificata con successo
 *       400:
 *         description: Parametri non validi
 */
router.put('/:configParamId', configParamsValidationRules, validate, ConfigParamsController.updateConfigParams);


module.exports = router;