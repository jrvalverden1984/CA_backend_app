"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../Controllers/employee.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: CRUD de empleados
 */
router.post('/', employee_controller_1.createEmployeeHandler);
/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Crear empleado
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/EmployeeInput' }
 *     responses: { 201: { description: Creado } }
 */
router.get('/:id', employee_controller_1.getEmployeeByIdHandler);
/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Obtener empleado por ID
 *     tags: [Employees]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Empleado }, 404: { description: No encontrado } }
 */
router.put('/:id', employee_controller_1.updateEmployeeHandler);
/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Actualizar empleado
 *     tags: [Employees]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/EmployeeInput' }
 *     responses: { 200: { description: Actualizado } }
 */
router.delete('/:id', employee_controller_1.deleteEmployeeHandler);
/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Eliminar empleado
 *     tags: [Employees]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */
router.get('/', employee_controller_1.getPaginatedEmployeesHandler);
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Listar empleados paginados
 *     tags: [Employees]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses: { 200: { description: Lista de empleados } }
 */
exports.default = router;
