import express from 'express'
import {
  createCostCenterHandler,
  getCostCenterByIdHandler,
  updateCostCenterHandler,
  deleteCostCenterHandler,
  getPaginatedCostCentersHandler
} from '../Controllers/costcenter.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: CostCenters
 *   description: CRUD de centros de costo
 */

router.post('/', createCostCenterHandler)
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

router.get('/:id', getCostCenterByIdHandler)
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

router.put('/:id', updateCostCenterHandler)
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

router.delete('/:id', deleteCostCenterHandler)
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

router.get('/', getPaginatedCostCentersHandler)
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

export default router
