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

/**
 * @swagger
 * /stats/monthly/week:
 *   get:
 *     summary: Get weekly averages for a given month
 *     description: Returns the weekly average values of temperature, humidity, and weight for the specified month.
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         description: ID of the hive to filter data
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         required: false
 *         description: Month in the format YYYY-MM. Defaults to current month if not provided.
 *         schema:
 *           type: string
 *           example: "2025-04"
 *     responses:
 *       200:
 *         description: Weekly averages of temperature, humidity, and weight for the specified month
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
 *                       year:
 *                         type: integer
 *                       week:
 *                         type: integer
 *                   avgTemperature:
 *                     type: number
 *                   avgHumidity:
 *                     type: number
 *                   avgWeight:
 *                     type: number
 *       400:
 *         description: Bad request, hiveId is missing or incorrect
 *       500:
 *         description: Server error
 */

router.get('/monthly/week', statsController.getMonthlyWeeklyAverages);


/**
 * @swagger
 * /stats/monthly/day:
 *   get:
 *     summary: Get daily averages for temperature, humidity, and weight for a specific month
 *     description: Returns the daily average values of temperature, humidity, and weight for each day of the specified month. Defaults to current month if not provided.
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         description: ID of the hive to filter data
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         required: false
 *         description: Month in the format YYYY-MM. Defaults to current month if not provided.
 *         schema:
 *           type: string
 *           example: "2025-04"
 *     responses:
 *       200:
 *         description: Daily averages of temperature, humidity, and weight for the specified month
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
 *                       year:
 *                         type: integer
 *                       month:
 *                         type: integer
 *                       day:
 *                         type: integer
 *                   avgTemperature:
 *                     type: number
 *                   avgHumidity:
 *                     type: number
 *                   avgWeight:
 *                     type: number
 *       400:
 *         description: Bad request, hiveId is missing or incorrect
 *       500:
 *         description: Server error
 */
router.get('/monthly/day', statsController.getDailyAverages);

/**
 * @swagger
 * /stats/yearly/month:
 *   get:
 *     summary: Get monthly averages for temperature, humidity, and weight for a specific year
 *     description: Returns the monthly average values of temperature, humidity, and weight for each month of the specified year. Defaults to current year if not provided.
 *     tags:
 *       - Stats
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         description: ID of the hive to filter data
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         required: false
 *         description: Year in the format YYYY. Defaults to current year if not provided.
 *         schema:
 *           type: string
 *           example: "2025"
 *     responses:
 *       200:
 *         description: Monthly averages of temperature, humidity, and weight for the specified year
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
 *                       year:
 *                         type: integer
 *                       month:
 *                         type: integer
 *                   avgTemperature:
 *                     type: number
 *                   avgHumidity:
 *                     type: number
 *                   avgWeight:
 *                     type: number
 *       400:
 *         description: Bad request, hiveId is missing or incorrect
 *       500:
 *         description: Server error
 */
router.get('/yearly/month', statsController.getMonthlyAverages);

module.exports = router;
