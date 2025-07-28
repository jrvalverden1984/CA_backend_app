import { Router } from 'express'
import {
  createWorkPermitHandler,
  getWorkPermitByIdHandler,
  updateWorkPermitHandler,
  deleteWorkPermitHandler,
  getPaginatedWorkPermitsHandler
} from '../Controllers/workpermit.controller'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: WorkPermit
 *   description: CRUD of WorkPermit
 */

router.post('/', createWorkPermitHandler)
/**
 * @swagger
 * /workpermit:
 *   post:
 *     summary: Create a WorkPermit
 *     tags: [WorkPermit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/WorkPermitRequest'
 *     responses:
 *       201:
 *         description: WorkPermit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkPermitResponse'
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

router.get('/:id', getWorkPermitByIdHandler)
/**
 * @swagger
 * /workpermit/{id}:
 *   get:
 *     summary: Get WorkPermit by ID
 *     tags: [WorkPermit]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: WorkPermit found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkPermitSuccess'
 *       404:
 *         description: WorkPermit not found
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

router.put('/:id', updateWorkPermitHandler)
/**
 * @swagger
 * /workpermit/{id}:
 *   put:
 *     summary: Update workpermit
 *     tags: [WorkPermit]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/WorkPermitRequest'
 *     responses:
 *       200:
 *         description: WorkPermit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkPermitResponse'
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

router.delete('/:id', deleteWorkPermitHandler)
/**
 * @swagger
 * /workpermit/{id}:
 *   delete:
 *     summary: Delete workpermit
 *     tags: [WorkPermit]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: WorkPermit deleted successfully
 *       404:
 *         description: WorkPermit not found
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

router.get('/', getPaginatedWorkPermitsHandler)
/**
 * @swagger
 * /workpermit:
 *   get:
 *     summary: List workpermits paginated
 *     tags: [WorkPermit]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: WorkPermits list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkPermitSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
