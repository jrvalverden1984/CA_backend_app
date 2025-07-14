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
 *   name: Shifts
 *   description: CRUD de turnos
 */

router.post('/', createShiftHandler)
/**
 * @swagger
 * /shifts:
 *   post:
 *     summary: Crear turno
 *     tags: [Shifts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShiftInput'
 *     responses: { 201: { description: Turno creado } }
 */

router.get('/:id', getShiftByIdHandler)
/**
 * @swagger
 * /shifts/{id}:
 *   get:
 *     summary: Obtener turno por ID
 *     tags: [Shifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 200: { description: Turno }, 404: { description: No encontrado } }
 */

router.put('/:id', updateShiftHandler)
/**
 * @swagger
 * /shifts/{id}:
 *   put:
 *     summary: Actualizar turno
 *     tags: [Shifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ShiftInput' }
 *     responses: { 200: { description: Turno actualizado } }
 */

router.delete('/:id', deleteShiftHandler)
/**
 * @swagger
 * /shifts/{id}:
 *   delete:
 *     summary: Eliminar turno
 *     tags: [Shifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */

router.get('/', getPaginatedShiftsHandler)
/**
 * @swagger
 * /shifts:
 *   get:
 *     summary: Listar turnos paginados
 *     tags: [Shifts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses: { 200: { description: Lista de turnos } }
 */

export default router
