const statsController = require('../controllers/statsController');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /stats/daily:
 *   get:
 *     summary: Retrieve all detections for a specific hive on a given day
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date to filter by (format YYYY-MM-DD). Defaults to today's date if not provided.
 *       - in: query
 *         name: hiveId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: An array of Detection objects for the specified hive and date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Detection'
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error
 */

router.get('/daily', statsController.getDailyDetections);

module.exports = router;
