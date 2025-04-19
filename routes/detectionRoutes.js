const express = require('express');
const router = express.Router();
const detectionController = require('../controllers/detectionController');
const validate = require('../middlewares/validate');
const detectionValidatorRules = require('../validators/detectionValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Detection:
 *       type: object
 *       required:
 *         - hive
 *         - date
 *         - humidity
 *         - temperature
 *         - weight
 *       properties:
 *         hive:
 *           type: string
 *           description: ID of the hive
 *         date:
 *           type: Date
 *           description: date of detections
 *         humidity:
 *           type: number
 *           description: humidity detected
 *         temperature:
 *           type: number
 *           description: temperature detected
 *         weight:
 *           type: number
 *           description: weight detected
 */


/**
 * @swagger
 * /detections/{hiveId}:
 *   get:
 *     summary: Get detections from hive id
 *     tags: [Detections]
 *     parameters:
 *       - in: path
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of hive
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Detection'
 *       404:
 *         description: Hive not found
 */
router.get('/:hiveId', detectionController.getDetections);


/**
 * @swagger
 * /detections:
 *   post:
 *     summary: Create new detection
 *     tags: [Detections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detection'
 *     responses:
 *       201:
 *         description: Rilevazione creata con successo
 *       500:
 *         description: Parametri non validi
 */
router.post('/', detectionValidatorRules, validate, detectionController.createDetection);

module.exports = router;