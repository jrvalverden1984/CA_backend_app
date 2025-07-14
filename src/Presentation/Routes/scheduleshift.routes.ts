import express from 'express'
import {
  createScheduleShiftHandler,
  getScheduleShiftByIdHandler,
  updateScheduleShiftHandler,
  deleteScheduleShiftHandler,
  getPaginatedScheduleShiftsHandler,
  assignShiftsToScheduleHandler,
  getShiftsByScheduleHandler
} from '../Controllers/scheduleshift.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: ScheduleShifts
 *   description: CRUD de relación Horario‑Turno
 */

router.post('/', createScheduleShiftHandler)
/**
 * @swagger
 * /scheduleshifts:
 *   post:
 *     summary: Crear ScheduleShift
 *     tags: [ScheduleShifts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [scheduleID, shiftID]
 *             properties:
 *               scheduleID: { type: integer }
 *               shiftID: { type: integer }
 *     responses: { 201: { description: Relación creada } }
 */

router.get('/:id', getScheduleShiftByIdHandler)
/**
 * @swagger
 * /scheduleshifts/{id}:
 *   get:
 *     summary: Obtener ScheduleShift por ID
 *     tags: [ScheduleShifts]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Relación }, 404: { description: No encontrado } }
 */

router.put('/:id', updateScheduleShiftHandler)
/**
 * @swagger
 * /scheduleshifts/{id}:
 *   put:
 *     summary: Actualizar ScheduleShift
 *     tags: [ScheduleShifts]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleID: { type: integer }
 *               shiftID: { type: integer }
 *     responses: { 200: { description: Relación actualizada } }
 */

router.delete('/:id', deleteScheduleShiftHandler)
/**
 * @swagger
 * /scheduleshifts/{id}:
 *   delete:
 *     summary: Eliminar ScheduleShift
 *     tags: [ScheduleShifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */

router.get('/', getPaginatedScheduleShiftsHandler)
/**
 * @swagger
 * /scheduleshifts:
 *   get:
 *     summary: Listar ScheduleShifts paginados
 *     tags: [ScheduleShifts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses: { 200: { description: Lista de relaciones } }
 */

/**
 * @swagger
 * /scheduleshifts/assign:
 *   post:
 *     summary: Asignar lista de Shifts a un Schedule (alta/actualiza)
 *     tags: [ScheduleShifts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [scheduleID, shiftIDs]
 *             properties:
 *               scheduleID: { type: integer }
 *               shiftIDs: 
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       200: { description: Relaciones actualizadas }
 */
router.post('/assign', assignShiftsToScheduleHandler)

/**
 * @swagger
 * /schedules/{scheduleID}/shifts:
 *   get:
 *     summary: Obtener todos los Shifts asociados a un Schedule
 *     tags: [ScheduleShifts]
 *     parameters:
 *       - in: path
 *         name: scheduleID
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200: { description: Lista de relaciones }
 */
router.get('/../schedules/:scheduleID/shifts', getShiftsByScheduleHandler)

export default router
