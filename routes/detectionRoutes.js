const express = require('express');
const router = express.Router();
const detectionController = require('../controllers/detectionController');
const validate = require('../middlewares/validate');
const detectionValidatorRules = require('../validators/detectionValidator');
const protect = require('../middlewares/protect');

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
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
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
 *         description: Detection not found
 */
router.get('/:hiveId',protect, detectionController.getDetections);


/**
 * @swagger
 * /detections:
 *   post:
 *     summary: Create new detection
 *     tags: [Detections]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detection'
 *     responses:
 *       201:
 *         description: Detection created successfully
 *       500:
 *         description: Params not valid
 */
router.post('/', protect, detectionValidatorRules, validate, detectionController.createDetection);


/**
 * @swagger
 * /detections/{detectionId}:
 *   delete:
 *     summary: Delete detection by id
 *     tags: [Detections]
 *     security:
 *       - BearerAuth: []  # Richiede il token per questa chiamata
 *     parameters:
 *       - in: path
 *         name: detectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of detection
 *     responses:
 *       200:
 *         description: Detection deleted successfully
 *       404:
 *         description: Detection not found
 */
router.delete('/:detectionId',protect, detectionController.deleteDetection);

module.exports = router;