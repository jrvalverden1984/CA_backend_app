"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("../Controllers/schedule.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: CRUD de horarios definidos
 */
router.post('/', schedule_controller_1.createScheduleHandler);
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
router.get('/:id', schedule_controller_1.getScheduleByIdHandler);
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
router.put('/:id', schedule_controller_1.updateScheduleHandler);
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
router.delete('/:id', schedule_controller_1.deleteScheduleHandler);
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
router.get('/', schedule_controller_1.getPaginatedSchedulesHandler);
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
exports.default = router;
