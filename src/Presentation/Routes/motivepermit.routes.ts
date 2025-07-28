import { Router } from 'express'
import {
  createMotivePermitHandler,
  getMotivePermitByIdHandler,
  updateMotivePermitHandler,
  deleteMotivePermitHandler,
  getPaginatedMotivePermitsHandler
} from '../Controllers/motivepermit.controller'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: MotivePermit
 *   description: CRUD of MotivePermit
 */

router.post('/', createMotivePermitHandler)
/**
 * @swagger
 * /motivepermit:
 *   post:
 *     summary: Create a MotivePermit
 *     tags: [MotivePermit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/MotivePermitRequest'
 *     responses:
 *       201:
 *         description: MotivePermit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivePermitResponse'
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

router.get('/:id', getMotivePermitByIdHandler)
/**
 * @swagger
 * /motivepermit/{id}:
 *   get:
 *     summary: Get MotivePermit by ID
 *     tags: [MotivePermit]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: MotivePermit found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivePermitSuccess'
 *       404:
 *         description: MotivePermit not found
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

router.put('/:id', updateMotivePermitHandler)
/**
 * @swagger
 * /motivepermit/{id}:
 *   put:
 *     summary: Update motivepermit
 *     tags: [MotivePermit]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/MotivePermitRequest'
 *     responses:
 *       200:
 *         description: MotivePermit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivePermitResponse'
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

router.delete('/:id', deleteMotivePermitHandler)
/**
 * @swagger
 * /motivepermit/{id}:
 *   delete:
 *     summary: Delete motivepermit
 *     tags: [MotivePermit]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: MotivePermit deleted successfully
 *       404:
 *         description: MotivePermit not found
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

router.get('/', getPaginatedMotivePermitsHandler)
/**
 * @swagger
 * /motivepermit:
 *   get:
 *     summary: List motivepermits paginated
 *     tags: [MotivePermit]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: MotivePermits list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MotivePermitSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
