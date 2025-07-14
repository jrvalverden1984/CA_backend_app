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
 *   name: JobRoles
 *   description: CRUD de roles de trabajo
 */
router.post('/', jobrole_controller_1.createJobRoleHandler);
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
router.get('/:id', jobrole_controller_1.getJobRoleByIdHandler);
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
router.put('/:id', jobrole_controller_1.updateJobRoleHandler);
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
router.delete('/:id', jobrole_controller_1.deleteJobRoleHandler);
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
router.get('/', jobrole_controller_1.getPaginatedJobRolesHandler);
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
exports.default = router;
