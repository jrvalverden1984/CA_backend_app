import express from 'express'
import {
  createHolidayHandler,
  getHolidayByIdHandler,
  updateHolidayHandler,
  deleteHolidayHandler,
  getPaginatedHolidaysHandler
} from '../Controllers/holiday.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Holiday
 *   description: CRUD of Holiday
 */

router.post('/', createHolidayHandler)
/**
 * @swagger
 * /holiday:
 *   post:
 *     summary: Create a Holiday
 *     tags: [Holiday]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/HolidayRequest'
 *     responses:
 *       201:
 *         description: Holiday created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidayResponse'
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

router.get('/:id', getHolidayByIdHandler)
/**
 * @swagger
 * /holiday/{id}:
 *   get:
 *     summary: Get Holiday by ID
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Holiday found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidaySuccess'
 *       404:
 *         description: Holiday not found
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

router.put('/:id', updateHolidayHandler)
/**
 * @swagger
 * /holiday/{id}:
 *   put:
 *     summary: Update holiday
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/HolidayRequest'
 *     responses:
 *       200:
 *         description: Holiday updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidayResponse'
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

router.delete('/:id', deleteHolidayHandler)
/**
 * @swagger
 * /holiday/{id}:
 *   delete:
 *     summary: Delete holiday
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Holiday deleted successfully
 *       404:
 *         description: Holiday not found
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

router.get('/', getPaginatedHolidaysHandler)
/**
 * @swagger
 * /holiday:
 *   get:
 *     summary: List holidays paginated
 *     tags: [Holiday]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Holidays list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HolidaySuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
