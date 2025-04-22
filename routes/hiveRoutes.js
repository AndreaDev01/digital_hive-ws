const express = require('express');
const router = express.Router();
const HiveController = require('../controllers/hiveController');
const hiveValidationRules = require('../validators/hiveValidator');
const validate = require('../middlewares/validate');
const protect = require('../middlewares/protect');

// In questo file, definiamo le rotte per il modello Hive.
// Importiamo express e creiamo un router.
// Importiamo il controller HiveController e le regole di validazione hiveValidationRules.
// Importiamo anche il middleware di validazione validate.
// Definiamo le rotte per le operazioni CRUD sul modello Hive.
// La rotta GET '/' restituisce tutti gli hives.
// La rotta POST '/' crea un nuovo hive.
// Utilizziamo le regole di validazione e il middleware di validazione per garantire che i dati inviati siano validi.

/**
 * @swagger
 * components:
 *   schemas:
 *     Hive:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - user
 *       properties:
 *         name:
 *           type: string
 *           description: name of hive
 *         description:
 *           type: string
 *           description: Description of hive
 *         user:
 *           type: string
 *           description: ID dell’utente
 */

/**
 * @swagger
 * /hives/{userId}:
 *   get:
 *     summary: get Hives from user id
 *     tags: [Hives]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Hives not found
 */
router.get('/:userId',protect, HiveController.getHives);


/**
 * @swagger
 * /hives:
 *   post:
 *     summary: Create new hive
 *     tags: [Hives]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hive'
 *     responses:
 *       201:
 *         description: Hive created successfully
 *       400:
 *         description: Params not valid
 */
router.post('/', protect, hiveValidationRules, validate, HiveController.createHive);

module.exports = router;