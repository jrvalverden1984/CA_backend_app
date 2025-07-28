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
 *   name: ScheduleShift
 *   description: CRUD of ScheduleShift
 */
router.post('/', scheduleshift_controller_1.createScheduleShiftHandler);
/**
 * @swagger
 * /scheduleshift:
 *   post:
 *     summary: Create a ScheduleShift
 *     tags: [ScheduleShift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ScheduleShiftRequest'
 *     responses:
 *       201:
 *         description: ScheduleShift created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleShiftResponse'
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
router.get('/:id', scheduleshift_controller_1.getScheduleShiftByIdHandler);
/**
 * @swagger
 * /scheduleshift/{id}:
 *   get:
 *     summary: Get ScheduleShift by ID
 *     tags: [ScheduleShift]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: ScheduleShift found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleShiftSuccess'
 *       404:
 *         description: ScheduleShift not found
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
router.put('/:id', scheduleshift_controller_1.updateScheduleShiftHandler);
/**
 * @swagger
 * /scheduleshift/{id}:
 *   put:
 *     summary: Update scheduleshift
 *     tags: [ScheduleShift]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ScheduleShiftRequest'
 *     responses:
 *       200:
 *         description: ScheduleShift updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleShiftResponse'
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
router.delete('/:id', scheduleshift_controller_1.deleteScheduleShiftHandler);
/**
 * @swagger
 * /scheduleshift/{id}:
 *   delete:
 *     summary: Delete scheduleshift
 *     tags: [ScheduleShift]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: ScheduleShift deleted successfully
 *       404:
 *         description: ScheduleShift not found
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
router.get('/', scheduleshift_controller_1.getPaginatedScheduleShiftsHandler);
/**
 * @swagger
 * /scheduleshift:
 *   get:
 *     summary: List scheduleshifts paginated
 *     tags: [ScheduleShift]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: ScheduleShifts list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleShiftSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/assign', scheduleshift_controller_1.assignShiftsToScheduleHandler);
/**
 * @swagger
 * /scheduleshift/assign:
 *   post:
 *     summary: Assign shifts to schedule
 *     tags: [ScheduleShift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AssignShiftsRequest'
 *     responses:
 *       200:
 *         description: Shifts assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssignShiftsResponse'
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
router.get('/../schedules/:scheduleID/shifts', scheduleshift_controller_1.getShiftsByScheduleHandler);
/**
 * @swagger
 * /scheduleshift/schedules/{scheduleID}/shifts:
 *   get:
 *     summary: Get shifts by schedule
 *     tags: [ScheduleShift]
 *     parameters: [{ in: path, name: scheduleID, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Shifts found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShiftSuccess'
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
exports.default = router;
//# sourceMappingURL=scheduleshift.routes.js.map