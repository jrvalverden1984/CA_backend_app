"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scheduleshift_controller_1 = require("../Controllers/scheduleshift.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: ScheduleShifts
 *   description: CRUD de relación Horario‑Turno
 */
router.post('/', scheduleshift_controller_1.createScheduleShiftHandler);
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
router.get('/:id', scheduleshift_controller_1.getScheduleShiftByIdHandler);
/**
 * @swagger
 * /scheduleshifts/{id}:
 *   get:
 *     summary: Obtener ScheduleShift por ID
 *     tags: [ScheduleShifts]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Relación }, 404: { description: No encontrado } }
 */
router.put('/:id', scheduleshift_controller_1.updateScheduleShiftHandler);
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
router.delete('/:id', scheduleshift_controller_1.deleteScheduleShiftHandler);
/**
 * @swagger
 * /scheduleshifts/{id}:
 *   delete:
 *     summary: Eliminar ScheduleShift
 *     tags: [ScheduleShifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */
router.get('/', scheduleshift_controller_1.getPaginatedScheduleShiftsHandler);
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
router.post('/assign', scheduleshift_controller_1.assignShiftsToScheduleHandler);
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
router.get('/../schedules/:scheduleID/shifts', scheduleshift_controller_1.getShiftsByScheduleHandler);
exports.default = router;
