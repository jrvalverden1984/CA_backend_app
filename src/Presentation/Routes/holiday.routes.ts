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
 *   name: Holidays
 *   description: CRUD de feriados
 */

router.post('/', createHolidayHandler)
/**
 * @swagger
 * /holidays:
 *   post:
 *     summary: Crear feriado
 *     tags: [Holidays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, startDate]
 *             properties:
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Feriado creado
 */

router.get('/:id', getHolidayByIdHandler)
/**
 * @swagger
 * /holidays/{id}:
 *   get:
 *     summary: Obtener feriado por ID
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Feriado encontrado
 *       404:
 *         description: No encontrado
 */

router.put('/:id', updateHolidayHandler)
/**
 * @swagger
 * /holidays/{id}:
 *   put:
 *     summary: Actualizar feriado
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, startDate]
 *             properties:
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Feriado actualizado
 */

router.delete('/:id', deleteHolidayHandler)
/**
 * @swagger
 * /holidays/{id}:
 *   delete:
 *     summary: Eliminar feriado
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Eliminado
 */

router.get('/', getPaginatedHolidaysHandler)
/**
 * @swagger
 * /holidays:
 *   get:
 *     summary: Listar feriados paginados
 *     tags: [Holidays]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de feriados
 */

export default router
