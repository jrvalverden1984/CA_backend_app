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
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMDepartmentRepository_1.TypeORMDepartmentRepository();
data_source_1.AppDataSource.initialize().then(() => {
    Logger_1.Logger.info('📦 TypeORM connected to PostgreSQL - DepartmentController');
}).catch((error) => Logger_1.Logger.error('Error connecting to TypeORM:', error));
const createDepartmentHandler = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción es obligatoria');
        }
        const result = await new CreateDepartment_1.CreateDepartment(repo).execute(req.body.description);
        Logger_1.Logger.info('Department created successfully:', { DepartmentID: result.DepartmentID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ DepartmentID: result.DepartmentID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createDepartmentHandler:', error);
        next(error);
    }
};
exports.createDepartmentHandler = createDepartmentHandler;
const getDepartmentByIdHandler = async (req, res, next) => {
    try {
        const departmentId = +req.params.id;
        if (isNaN(departmentId) || departmentId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del departamento debe ser un número válido mayor a 0');
        }
        const data = await new GetDepartmentById_1.GetDepartmentById(repo).execute(departmentId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Departamento no encontrado');
        }
        Logger_1.Logger.info('Department found successfully:', { DepartmentID: data.DepartmentID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getDepartmentByIdHandler:', error);
        next(error);
    }
};
exports.getDepartmentByIdHandler = getDepartmentByIdHandler;
const updateDepartmentHandler = async (req, res, next) => {
    try {
        const departmentId = +req.params.id;
        if (isNaN(departmentId) || departmentId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del departamento debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.description !== undefined && req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción no puede estar vacía');
        }
        const result = await new UpdateDepartment_1.UpdateDepartment(repo).execute(departmentId, req.body.description);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Departamento no encontrado');
        }
        Logger_1.Logger.info('Department updated successfully:', { DepartmentID: result.DepartmentID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateDepartmentHandler:', error);
        next(error);
    }
};
exports.updateDepartmentHandler = updateDepartmentHandler;
const deleteDepartmentHandler = async (req, res, next) => {
    try {
        const departmentId = +req.params.id;
        if (isNaN(departmentId) || departmentId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del departamento debe ser un número válido mayor a 0');
        }
        // Verificar que el departamento existe antes de eliminarlo
        const existingDepartment = await new GetDepartmentById_1.GetDepartmentById(repo).execute(departmentId);
        if (!existingDepartment) {
            throw new NotFoundError_1.NotFoundError('Departamento no encontrado');
        }
        await new DeleteDepartment_1.DeleteDepartment(repo).execute(departmentId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Departamento eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteDepartmentHandler:', error);
        next(error);
    }
};
exports.deleteDepartmentHandler = deleteDepartmentHandler;
const getPaginatedDepartmentsHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedDepartments_1.GetPaginatedDepartments(repo).execute(page, limit);
        Logger_1.Logger.info('Departments found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedDepartmentsHandler:', error);
        next(error);
    }
};
exports.getPaginatedDepartmentsHandler = getPaginatedDepartmentsHandler;
//# sourceMappingURL=department.controller.js.map