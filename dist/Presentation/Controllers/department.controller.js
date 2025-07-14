"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedDepartmentsHandler = exports.deleteDepartmentHandler = exports.updateDepartmentHandler = exports.getDepartmentByIdHandler = exports.createDepartmentHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMDepartmentRepository_1 = require("../../Infrastructure/Repositories/TypeORMDepartmentRepository");
const CreateDepartment_1 = require("../../Application/Department/CreateDepartment");
const GetDepartmentById_1 = require("../../Application/Department/GetDepartmentById");
const UpdateDepartment_1 = require("../../Application/Department/UpdateDepartment");
const DeleteDepartment_1 = require("../../Application/Department/DeleteDepartment");
const GetPaginatedDepartments_1 = require("../../Application/Department/GetPaginatedDepartments");
const repo = new TypeORMDepartmentRepository_1.TypeORMDepartmentRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createDepartmentHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new CreateDepartment_1.CreateDepartment(repo);
    const result = await useCase.execute(description);
    res.status(201).json(result);
};
exports.createDepartmentHandler = createDepartmentHandler;
const getDepartmentByIdHandler = async (req, res) => {
    const useCase = new GetDepartmentById_1.GetDepartmentById(repo);
    const result = await useCase.execute(parseInt(req.params.id));
    if (!result)
        return res.status(404).send();
    res.json(result);
};
exports.getDepartmentByIdHandler = getDepartmentByIdHandler;
const updateDepartmentHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new UpdateDepartment_1.UpdateDepartment(repo);
    const result = await useCase.execute(parseInt(req.params.id), description);
    res.json(result);
};
exports.updateDepartmentHandler = updateDepartmentHandler;
const deleteDepartmentHandler = async (req, res) => {
    const useCase = new DeleteDepartment_1.DeleteDepartment(repo);
    await useCase.execute(parseInt(req.params.id));
    res.status(204).send();
};
exports.deleteDepartmentHandler = deleteDepartmentHandler;
const getPaginatedDepartmentsHandler = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const useCase = new GetPaginatedDepartments_1.GetPaginatedDepartments(repo);
    const result = await useCase.execute(Number(page), Number(limit));
    res.json(result);
};
exports.getPaginatedDepartmentsHandler = getPaginatedDepartmentsHandler;
