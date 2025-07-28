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
 *   name: JobRole
 *   description: CRUD of JobRole
 */

router.post('/', createJobRoleHandler)
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

router.get('/:id', getJobRoleByIdHandler)
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

router.put('/:id', updateJobRoleHandler)
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

router.delete('/:id', deleteJobRoleHandler)
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

router.get('/', getPaginatedJobRolesHandler)
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

export default router
