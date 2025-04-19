const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');


/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - user
 *         - read
 *         - date
 *       properties:
 *         title:
 *           type: string
 *           description: title of notification
 *         content:
 *           type: string
 *           description: content of notification
 *         user:
 *           type: string
 *           description: user of notification
 *         read:
 *           type: boolean
 *           description: status of notification
 *         date:
 *           type: string
 *           description: date of notification
 */


/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get notifications from user id
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of user
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
 *                    $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 */
router.get('/:userId', notificationController.getNotifications);


/**
 * @swagger
 * /notifications/:{notificationId}/read:
 *   put:
 *     summary: mark notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of notification
 *     responses:
 *       201:
 *         description: Notification marked as read successfully
 *       500:
 *         description: Notification not valid
 */
router.put('/:notificationId/read', notificationController.markAsRead);



/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     summary: Delete notification by id
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of notification
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */
router.delete('/:notificationId', notificationController.deleteNotification);
module.exports = router;
