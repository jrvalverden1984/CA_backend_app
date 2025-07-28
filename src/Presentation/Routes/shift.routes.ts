import express from 'express'
import {
  createShiftHandler,
  getShiftByIdHandler,
  updateShiftHandler,
  deleteShiftHandler,
  getPaginatedShiftsHandler
} from '../Controllers/shift.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Shift
 *   description: CRUD of Shift
 */

router.post('/', createShiftHandler)
/**
 * @swagger
 * /shift:
 *   post:
 *     summary: Create a Shift
 *     tags: [Shift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/ShiftRequest'
 *     responses:
 *       201:
 *         description: Shift created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftResponse'
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

router.get('/:id', getShiftByIdHandler)
/**
 * @swagger
 * /shift/{id}:
 *   get:
 *     summary: Get Shift by ID
 *     tags: [Shift]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Shift found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftSuccess'
 *       404:
 *         description: Shift not found
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

router.put('/:id', updateShiftHandler)
/**
 * @swagger
 * /shift/{id}:
 *   put:
 *     summary: Update shift
 *     tags: [Shift]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/ShiftRequest'
 *     responses:
 *       200:
 *         description: Shift updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftResponse'
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

router.delete('/:id', deleteShiftHandler)
/**
 * @swagger
 * /shift/{id}:
 *   delete:
 *     summary: Delete shift
 *     tags: [Shift]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Shift deleted successfully
 *       404:
 *         description: Shift not found
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

router.get('/', getPaginatedShiftsHandler)
/**
 * @swagger
 * /shift:
 *   get:
 *     summary: List shifts paginated
 *     tags: [Shift]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Shifts list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShiftSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
