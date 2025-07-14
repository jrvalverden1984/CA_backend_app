import express from 'express'
import {
  createJobRoleHandler,
  getJobRoleByIdHandler,
  updateJobRoleHandler,
  deleteJobRoleHandler,
  getPaginatedJobRolesHandler
} from '../Controllers/jobrole.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: JobRoles
 *   description: CRUD de roles de trabajo
 */

router.post('/', createJobRoleHandler)
/**
 * @swagger
 * /jobroles:
 *   post:
 *     summary: Crear JobRole
 *     tags: [JobRoles]
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
 *         description: JobRole creado
 */

router.get('/:id', getJobRoleByIdHandler)
/**
 * @swagger
 * /jobroles/{id}:
 *   get:
 *     summary: Obtener JobRole por ID
 *     tags: [JobRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: JobRole encontrado
 *       404:
 *         description: No encontrado
 */

router.put('/:id', updateJobRoleHandler)
/**
 * @swagger
 * /jobroles/{id}:
 *   put:
 *     summary: Actualizar JobRole
 *     tags: [JobRoles]
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

router.delete('/:id', deleteJobRoleHandler)
/**
 * @swagger
 * /jobroles/{id}:
 *   delete:
 *     summary: Eliminar JobRole
 *     tags: [JobRoles]
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

router.get('/', getPaginatedJobRolesHandler)
/**
 * @swagger
 * /jobroles:
 *   get:
 *     summary: Listar JobRoles paginados
 *     tags: [JobRoles]
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
 *         description: Lista de JobRoles
 */

export default router
