"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobrole_controller_1 = require("../Controllers/jobrole.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: JobRole
 *   description: CRUD of JobRole
 */
router.post('/', jobrole_controller_1.createJobRoleHandler);
/**
 * @swagger
 * /jobrole:
 *   post:
 *     summary: Create a JobRole
 *     tags: [JobRole]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/JobRoleRequest'
 *     responses:
 *       201:
 *         description: JobRole created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobRoleResponse'
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
router.get('/:id', jobrole_controller_1.getJobRoleByIdHandler);
/**
 * @swagger
 * /jobrole/{id}:
 *   get:
 *     summary: Get JobRole by ID
 *     tags: [JobRole]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: JobRole found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobRoleSuccess'
 *       404:
 *         description: JobRole not found
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
router.put('/:id', jobrole_controller_1.updateJobRoleHandler);
/**
 * @swagger
 * /jobrole/{id}:
 *   put:
 *     summary: Update jobrole
 *     tags: [JobRole]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/JobRoleRequest'
 *     responses:
 *       200:
 *         description: JobRole updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobRoleResponse'
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
router.delete('/:id', jobrole_controller_1.deleteJobRoleHandler);
/**
 * @swagger
 * /jobrole/{id}:
 *   delete:
 *     summary: Delete jobrole
 *     tags: [JobRole]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: JobRole deleted successfully
 *       404:
 *         description: JobRole not found
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
router.get('/', jobrole_controller_1.getPaginatedJobRolesHandler);
/**
 * @swagger
 * /jobrole:
 *   get:
 *     summary: List jobroles paginated
 *     tags: [JobRole]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: JobRoles list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobRoleSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.default = router;
//# sourceMappingURL=jobrole.routes.js.map