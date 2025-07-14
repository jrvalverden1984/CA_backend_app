import express from 'express'
import {
  createDepartmentHandler,
  getDepartmentByIdHandler,
  updateDepartmentHandler,
  deleteDepartmentHandler,
  getPaginatedDepartmentsHandler
} from '../Controllers/department.controller'

const router = express.Router()

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
router.post('/', createDepartmentHandler)

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
router.get('/:id', getDepartmentByIdHandler)

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
router.put('/:id', updateDepartmentHandler)

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
router.delete('/:id', deleteDepartmentHandler)

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
router.get('/', getPaginatedDepartmentsHandler)

export default router
