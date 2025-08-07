"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedJobRolesHandler = exports.deleteJobRoleHandler = exports.updateJobRoleHandler = exports.getJobRoleByIdHandler = exports.createJobRoleHandler = void 0;
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
const TypeORMJobRoleRepository_1 = require("../../Infrastructure/Repositories/TypeORMJobRoleRepository");
const CreateJobRole_1 = require("../../Application/JobRole/CreateJobRole");
const GetJobRoleById_1 = require("../../Application/JobRole/GetJobRoleById");
const UpdateJobRole_1 = require("../../Application/JobRole/UpdateJobRole");
const DeleteJobRole_1 = require("../../Application/JobRole/DeleteJobRole");
const GetPaginatedJobRoles_1 = require("../../Application/JobRole/GetPaginatedJobRoles");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMJobRoleRepository_1.TypeORMJobRoleRepository();
// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - JobRoleController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const createJobRoleHandler = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción es obligatoria');
        }
        const result = await new CreateJobRole_1.CreateJobRole(repo).execute(req.body.description);
        Logger_1.Logger.info('JobRole created successfully:', { JobRoleID: result.JobRoleID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ JobRoleID: result.JobRoleID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createJobRoleHandler:', error);
        next(error);
    }
};
exports.createJobRoleHandler = createJobRoleHandler;
const getJobRoleByIdHandler = async (req, res, next) => {
    try {
        const jobRoleId = +req.params.id;
        if (isNaN(jobRoleId) || jobRoleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0');
        }
        const data = await new GetJobRoleById_1.GetJobRoleById(repo).execute(jobRoleId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Puesto de trabajo no encontrado');
        }
        Logger_1.Logger.info('JobRole found successfully:', { JobRoleID: data.JobRoleID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getJobRoleByIdHandler:', error);
        next(error);
    }
};
exports.getJobRoleByIdHandler = getJobRoleByIdHandler;
const updateJobRoleHandler = async (req, res, next) => {
    try {
        const jobRoleId = +req.params.id;
        if (isNaN(jobRoleId) || jobRoleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.description !== undefined && req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción no puede estar vacía');
        }
        const result = await new UpdateJobRole_1.UpdateJobRole(repo).execute(jobRoleId, req.body.description);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Puesto de trabajo no encontrado');
        }
        Logger_1.Logger.info('JobRole updated successfully:', { JobRoleID: result.JobRoleID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateJobRoleHandler:', error);
        next(error);
    }
};
exports.updateJobRoleHandler = updateJobRoleHandler;
const deleteJobRoleHandler = async (req, res, next) => {
    try {
        const jobRoleId = +req.params.id;
        if (isNaN(jobRoleId) || jobRoleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0');
        }
        // Verificar que el puesto de trabajo existe antes de eliminarlo
        const existingJobRole = await new GetJobRoleById_1.GetJobRoleById(repo).execute(jobRoleId);
        if (!existingJobRole) {
            throw new NotFoundError_1.NotFoundError('Puesto de trabajo no encontrado');
        }
        await new DeleteJobRole_1.DeleteJobRole(repo).execute(jobRoleId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Puesto de trabajo eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteJobRoleHandler:', error);
        next(error);
    }
};
exports.deleteJobRoleHandler = deleteJobRoleHandler;
const getPaginatedJobRolesHandler = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        // Validar parámetros de paginación
        if (page <= 0) {
            throw new BadRequestError_1.BadRequestError('El número de página debe ser mayor a 0');
        }
        if (limit <= 0 || limit > 100) {
            throw new BadRequestError_1.BadRequestError('El límite debe estar entre 1 y 100');
        }
        const result = await new GetPaginatedJobRoles_1.GetPaginatedJobRoles(repo).execute(page, limit);
        Logger_1.Logger.info('JobRoles found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedJobRolesHandler:', error);
        next(error);
    }
};
exports.getPaginatedJobRolesHandler = getPaginatedJobRolesHandler;
//# sourceMappingURL=jobrole.controller.js.map