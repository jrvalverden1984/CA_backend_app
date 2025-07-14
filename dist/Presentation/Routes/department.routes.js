"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../Controllers/department.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Operaciones sobre departamentos
 */
/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Crear un nuevo Department
 *     tags: [Departments]
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
 *         description: Department creado exitosamente
 */
router.post('/', department_controller_1.createDepartmentHandler);
/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Obtener Department por ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna un Department
 *       404:
 *         description: No encontrado
 */
router.get('/:id', department_controller_1.getDepartmentByIdHandler);
/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Actualizar un Department
 *     tags: [Departments]
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
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department actualizado
 */
router.put('/:id', department_controller_1.updateDepartmentHandler);
/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Eliminar un Department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Eliminado exitosamente
 */
router.delete('/:id', department_controller_1.deleteDepartmentHandler);
/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Listar Departments paginados
 *     tags: [Departments]
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
 *         description: Lista de Departments
 */
router.get('/', department_controller_1.getPaginatedDepartmentsHandler);
exports.default = router;
