const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - expired
 *       properties:
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: email
 *           description: email of user
 *         expired:
 *           type: boolean
 *           description: Say if user was expired or not
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/ConfigParams'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.post('/login', userValidator, validate, userController.login);

module.exports = router;