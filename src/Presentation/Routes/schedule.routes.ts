import express from 'express'
import {
  createScheduleHandler,
  getScheduleByIdHandler,
  updateScheduleHandler,
  deleteScheduleHandler,
  getPaginatedSchedulesHandler
} from '../Controllers/schedule.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: CRUD of Schedule
 */

router.post('/', createScheduleHandler)
/**
 * @swagger
 * /schedule:
 *   post:
 *     summary: Create a Schedule
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/ScheduleRequest'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
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

router.get('/:id', getScheduleByIdHandler)
/**
 * @swagger
 * /schedule/{id}:
 *   get:
 *     summary: Get Schedule by ID
 *     tags: [Schedule]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Schedule found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleSuccess'
 *       404:
 *         description: Schedule not found
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

router.put('/:id', updateScheduleHandler)
/**
 * @swagger
 * /schedule/{id}:
 *   put:
 *     summary: Update schedule
 *     tags: [Schedule]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/ScheduleRequest'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
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

router.delete('/:id', deleteScheduleHandler)
/**
 * @swagger
 * /schedule/{id}:
 *   delete:
 *     summary: Delete schedule
 *     tags: [Schedule]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
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

router.get('/', getPaginatedSchedulesHandler)
/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: List schedules paginated
 *     tags: [Schedule]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Schedules list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
