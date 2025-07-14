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
 *   name: CostCenters
 *   description: CRUD de centros de costo
 */
router.post('/', costcenter_controller_1.createCostCenterHandler);
/**
 * @swagger
 * /costcenters:
 *   post:
 *     summary: Crear CostCenter
 *     tags: [CostCenters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description]
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: CostCenter creado
 */
router.get('/:id', costcenter_controller_1.getCostCenterByIdHandler);
/**
 * @swagger
 * /costcenters/{id}:
 *   get:
 *     summary: Obtener CostCenter por ID
 *     tags: [CostCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CostCenter encontrado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', costcenter_controller_1.updateCostCenterHandler);
/**
 * @swagger
 * /costcenters/{id}:
 *   put:
 *     summary: Actualizar CostCenter
 *     tags: [CostCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizado correctamente
 */
router.delete('/:id', costcenter_controller_1.deleteCostCenterHandler);
/**
 * @swagger
 * /costcenters/{id}:
 *   delete:
 *     summary: Eliminar CostCenter
 *     tags: [CostCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado
 */
router.get('/', costcenter_controller_1.getPaginatedCostCentersHandler);
/**
 * @swagger
 * /costcenters:
 *   get:
 *     summary: Listar CostCenters paginados
 *     tags: [CostCenters]
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
 *         description: Lista de CostCenters
 */
exports.default = router;
