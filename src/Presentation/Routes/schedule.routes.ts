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
 *   name: Schedules
 *   description: CRUD de horarios definidos
 */

router.post('/', createScheduleHandler)
/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Crear horario
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleInput'
 *     responses: { 201: { description: Horario creado } }
 */

router.get('/:id', getScheduleByIdHandler)
/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Obtener horario por ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200: { description: Horario encontrado }
 *       404: { description: No encontrado }
 */

router.put('/:id', updateScheduleHandler)
/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Actualizar horario
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ScheduleInput' }
 *     responses:
 *       200: { description: Horario actualizado }
 */

router.delete('/:id', deleteScheduleHandler)
/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Eliminar horario
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       204: { description: Eliminado }
 */

router.get('/', getPaginatedSchedulesHandler)
/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Listar horarios paginados
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de horarios }
 */

export default router
