"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holiday_controller_1 = require("../Controllers/holiday.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Holidays
 *   description: CRUD de feriados
 */
router.post('/', holiday_controller_1.createHolidayHandler);
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
router.get('/:id', holiday_controller_1.getHolidayByIdHandler);
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
router.put('/:id', holiday_controller_1.updateHolidayHandler);
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
router.delete('/:id', holiday_controller_1.deleteHolidayHandler);
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
router.get('/', holiday_controller_1.getPaginatedHolidaysHandler);
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
exports.default = router;
