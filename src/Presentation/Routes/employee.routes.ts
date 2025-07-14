import express from 'express'
import {
  createEmployeeHandler,
  getEmployeeByIdHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
  getPaginatedEmployeesHandler
} from '../Controllers/employee.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: CRUD de empleados
 */

router.post('/', createEmployeeHandler)
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

router.get('/:id', getEmployeeByIdHandler)
/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Obtener empleado por ID
 *     tags: [Employees]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Empleado }, 404: { description: No encontrado } }
 */

router.put('/:id', updateEmployeeHandler)
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

router.delete('/:id', deleteEmployeeHandler)
/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Eliminar empleado
 *     tags: [Employees]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses: { 204: { description: Eliminado } }
 */

router.get('/', getPaginatedEmployeesHandler)
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

export default router
