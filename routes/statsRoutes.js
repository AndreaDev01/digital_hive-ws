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


/**
 * @swagger
 * /stats/weekly:
 *   get:
 *     summary: Get daily average values for temperature, humidity, and weight for the current week or a specified week
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: A date within the week to calculate averages for (format YYYY-MM-DD). Defaults to the current week if not provided.
 *       - in: query
 *         name: hiveId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: An array of daily averages for the selected week
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         format: date
 *                   avgTemperature:
 *                     type: number
 *                     description: Average temperature for the day
 *                   avgHumidity:
 *                     type: number
 *                     description: Average humidity for the day
 *                   avgWeight:
 *                     type: number
 *                     description: Average weight for the day
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error
 */
router.get('/weekly', statsController.getWeeklyAverages);

module.exports = router;
