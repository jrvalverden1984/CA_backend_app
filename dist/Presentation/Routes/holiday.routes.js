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
 *   name: Holiday
 *   description: CRUD of Holiday
 */
router.post('/', holiday_controller_1.createHolidayHandler);
/**
 * @swagger
 * /holiday:
 *   post:
 *     summary: Create a Holiday
 *     tags: [Holiday]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/HolidayRequest'
 *     responses:
 *       201:
 *         description: Holiday created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidayResponse'
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
router.get('/:id', holiday_controller_1.getHolidayByIdHandler);
/**
 * @swagger
 * /holiday/{id}:
 *   get:
 *     summary: Get Holiday by ID
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Holiday found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidaySuccess'
 *       404:
 *         description: Holiday not found
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
router.put('/:id', holiday_controller_1.updateHolidayHandler);
/**
 * @swagger
 * /holiday/{id}:
 *   put:
 *     summary: Update holiday
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/HolidayRequest'
 *     responses:
 *       200:
 *         description: Holiday updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HolidayResponse'
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
router.delete('/:id', holiday_controller_1.deleteHolidayHandler);
/**
 * @swagger
 * /holiday/{id}:
 *   delete:
 *     summary: Delete holiday
 *     tags: [Holiday]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Holiday deleted successfully
 *       404:
 *         description: Holiday not found
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
router.get('/', holiday_controller_1.getPaginatedHolidaysHandler);
/**
 * @swagger
 * /holiday:
 *   get:
 *     summary: List holidays paginated
 *     tags: [Holiday]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Holidays list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HolidaySuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.default = router;
//# sourceMappingURL=holiday.routes.js.map