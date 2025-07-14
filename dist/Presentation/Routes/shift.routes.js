"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shift_controller_1 = require("../Controllers/shift.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Shifts
 *   description: CRUD de turnos
 */
router.post('/', shift_controller_1.createShiftHandler);
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
router.get('/:id', shift_controller_1.getShiftByIdHandler);
/**
 * @swagger
 * /shifts/{id}:
 *   get:
 *     summary: Obtener turno por ID
 *     tags: [Shifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 200: { description: Turno }, 404: { description: No encontrado } }
 */
router.put('/:id', shift_controller_1.updateShiftHandler);
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
router.delete('/:id', shift_controller_1.deleteShiftHandler);
/**
 * @swagger
 * /shifts/{id}:
 *   delete:
 *     summary: Eliminar turno
 *     tags: [Shifts]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */
router.get('/', shift_controller_1.getPaginatedShiftsHandler);
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
exports.default = router;
