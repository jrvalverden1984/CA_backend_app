import express from 'express';
import {
  createCutHandler,
  getCutByIdHandler,
  updateCutHandler,
  deleteCutHandler,
  getCutsPaginatedHandler
} from '../Controllers/cut.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cut
 *   description: CRUD of Cut
 */

router.post('/', createCutHandler);
/**
 * @swagger
 * /cut:
 *   post:
 *     summary: Create a Cut
 *     tags: [Cut]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/CutRequest'
 *     responses:
 *       201:
 *         description: Cut created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CutResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/:id', getCutByIdHandler);
/**
 * @swagger
 * /cut/{id}:
 *   get:
 *     summary: Get Cut by ID
 *     tags: [Cut]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Cut found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CutSuccess'
 *       404:
 *         description: Cut not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put('/:id', updateCutHandler);
/**
 * @swagger
 * /cut/{id}:
 *   put:
 *     summary: Update cut
 *     tags: [Cut]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/CutRequest'
 *     responses:
 *       200:
 *         description: Cut updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CutResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.delete('/:id', deleteCutHandler);
/**
 * @swagger
 * /cut/{id}:
 *   delete:
 *     summary: Delete cut
 *     tags: [Cut]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Cut deleted successfully
 *       404:
 *         description: Cut not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/', getCutsPaginatedHandler);
/**
 * @swagger
 * /cut:
 *   get:
 *     summary: List cuts paginated
 *     tags: [Cut]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Cuts list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CutSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router;
