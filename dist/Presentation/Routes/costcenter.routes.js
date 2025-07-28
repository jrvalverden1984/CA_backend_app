"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const costcenter_controller_1 = require("../Controllers/costcenter.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: CostCenter
 *   description: CRUD of CostCenter
 */
router.post('/', costcenter_controller_1.createCostCenterHandler);
/**
 * @swagger
 * /costcenter:
 *   post:
 *     summary: Create a CostCenter
 *     tags: [CostCenter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CostCenterRequest'
 *     responses:
 *       201:
 *         description: CostCenter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostCenterResponse'
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
router.get('/:id', costcenter_controller_1.getCostCenterByIdHandler);
/**
 * @swagger
 * /costcenter/{id}:
 *   get:
 *     summary: Get CostCenter by ID
 *     tags: [CostCenter]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: CostCenter found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostCenterSuccess'
 *       404:
 *         description: CostCenter not found
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
router.put('/:id', costcenter_controller_1.updateCostCenterHandler);
/**
 * @swagger
 * /costcenter/{id}:
 *   put:
 *     summary: Update costcenter
 *     tags: [CostCenter]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CostCenterRequest'
 *     responses:
 *       200:
 *         description: CostCenter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostCenterResponse'
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
router.delete('/:id', costcenter_controller_1.deleteCostCenterHandler);
/**
 * @swagger
 * /costcenter/{id}:
 *   delete:
 *     summary: Delete costcenter
 *     tags: [CostCenter]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: CostCenter deleted successfully
 *       404:
 *         description: CostCenter not found
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
router.get('/', costcenter_controller_1.getPaginatedCostCentersHandler);
/**
 * @swagger
 * /costcenter:
 *   get:
 *     summary: List costcenters paginated
 *     tags: [CostCenter]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: CostCenters list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CostCenterSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.default = router;
//# sourceMappingURL=costcenter.routes.js.map