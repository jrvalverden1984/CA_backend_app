"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedJobRolesHandler = exports.deleteJobRoleHandler = exports.updateJobRoleHandler = exports.getJobRoleByIdHandler = exports.createJobRoleHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMJobRoleRepository_1 = require("../../Infrastructure/Repositories/TypeORMJobRoleRepository");
const CreateJobRole_1 = require("../../Application/JobRole/CreateJobRole");
const GetJobRoleById_1 = require("../../Application/JobRole/GetJobRoleById");
const UpdateJobRole_1 = require("../../Application/JobRole/UpdateJobRole");
const DeleteJobRole_1 = require("../../Application/JobRole/DeleteJobRole");
const GetPaginatedJobRoles_1 = require("../../Application/JobRole/GetPaginatedJobRoles");
const repo = new TypeORMJobRoleRepository_1.TypeORMJobRoleRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createJobRoleHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new CreateJobRole_1.CreateJobRole(repo);
    const result = await useCase.execute(description);
    res.status(201).json(result);
};
exports.createJobRoleHandler = createJobRoleHandler;
const getJobRoleByIdHandler = async (req, res) => {
    const useCase = new GetJobRoleById_1.GetJobRoleById(repo);
    const result = await useCase.execute(Number(req.params.id));
    if (!result)
        return res.status(404).send();
    res.json(result);
};
exports.getJobRoleByIdHandler = getJobRoleByIdHandler;
const updateJobRoleHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new UpdateJobRole_1.UpdateJobRole(repo);
    const result = await useCase.execute(Number(req.params.id), description);
    res.json(result);
};
exports.updateJobRoleHandler = updateJobRoleHandler;
const deleteJobRoleHandler = async (req, res) => {
    const useCase = new DeleteJobRole_1.DeleteJobRole(repo);
    await useCase.execute(Number(req.params.id));
    res.status(204).send();
};
exports.deleteJobRoleHandler = deleteJobRoleHandler;
const getPaginatedJobRolesHandler = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const useCase = new GetPaginatedJobRoles_1.GetPaginatedJobRoles(repo);
    const result = await useCase.execute(Number(page), Number(limit));
    res.json(result);
};
exports.getPaginatedJobRolesHandler = getPaginatedJobRolesHandler;
