const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');
const annotationValidatorRules = require('../validators/annotationValidator');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * components:
 *   schemas:
 *     Annotation:
 *       type: object
 *       required:
 *         - note
 *         - date
 *         - hive
 *       properties:
 *         note:
 *           type: string
 *           description: note of annotation
 *         date:
 *           type: string
 *           description: Date of annotation
 *         hive:
 *           type: string
 *           description: ID of hive for the annotation
 */

/**
 * @swagger
 * /annotations/{hiveId}:
 *   get:
 *     summary: get annotations from hive id
 *     tags: [Annotations]
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
 *                   $ref: '#/components/schemas/Annotation'
 *       404:
 *         description: Annotation not found
 */
router.get('/:hiveId', annotationController.getAnnotations);

/**
 * @swagger
 * /annotations:
 *   post:
 *     summary: Create new annotation
 *     tags: [Annotations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annotation'
 *     responses:
 *       201:
 *         description: Annotation created successfully
 *       500:
 *         description: Params not valid
 */
router.post('/', annotationValidatorRules, validate, annotationController.createAnnotation);





/**
 * @swagger
 * /annotations/{annotationId}:
 *   put:
 *     summary: Update annotation
 *     tags: [Annotations]
 *     parameters:
 *       - in: path
 *         name: annotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of annotation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annotation'
 *     responses:
 *       201:
 *         description: Annotation updated successfully
 *       400:
 *         description: Params not valid
 */
router.put('/:annotationId', annotationValidatorRules, validate, annotationController.updateAnnotation);





/**
 * @swagger
 * /annotations/{annotationId}:
 *   delete:
 *     summary: Delete detection by id
 *     tags: [Annotations]
 *     parameters:
 *       - in: path
 *         name: annotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of annotation
 *     responses:
 *       200:
 *         description: Annotation deleted successfully
 *       404:
 *         description: Annotation not found
 */
router.delete('/:annotationId', annotationController.deleteAnnotation);

module.exports = router;