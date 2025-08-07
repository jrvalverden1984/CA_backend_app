"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedEmployeesHandler = exports.deleteEmployeeHandler = exports.updateEmployeeHandler = exports.getEmployeeByIdHandler = exports.createEmployeeHandler = void 0;
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
const TypeORMEmployeeRepository_1 = require("../../Infrastructure/Repositories/TypeORMEmployeeRepository");
const CreateEmployee_1 = require("../../Application/Employee/CreateEmployee");
const GetEmployeeById_1 = require("../../Application/Employee/GetEmployeeById");
const UpdateEmployee_1 = require("../../Application/Employee/UpdateEmployee");
const DeleteEmployee_1 = require("../../Application/Employee/DeleteEmployee");
const GetPaginatedEmployees_1 = require("../../Application/Employee/GetPaginatedEmployees");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMEmployeeRepository_1.TypeORMEmployeeRepository();
// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - EmployeeController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const createEmployeeHandler = async (req, res, next) => {
    try {
        // Validar campos obligatorios
        if (!req.body.FirstName || req.body.FirstName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El nombre es obligatorio');
        }
        if (!req.body.LastName || req.body.LastName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El apellido es obligatorio');
        }
        if (!req.body.Email || req.body.Email.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El email es obligatorio');
        }
        if (!req.body.Phone || req.body.Phone.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El teléfono es obligatorio');
        }
        if (!req.body.DepartmentID || req.body.DepartmentID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del departamento es obligatorio y debe ser mayor a 0');
        }
        if (!req.body.JobRoleID || req.body.JobRoleID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del puesto de trabajo es obligatorio y debe ser mayor a 0');
        }
        if (!req.body.CostCenterID || req.body.CostCenterID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del centro de costo es obligatorio y debe ser mayor a 0');
        }
        const result = await new CreateEmployee_1.CreateEmployee(repo).execute(req.body);
        Logger_1.Logger.info('Employee created successfully:', { EmployeeID: result.EmployeeID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ EmployeeID: result.EmployeeID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createEmployeeHandler:', error);
        next(error);
    }
};
exports.createEmployeeHandler = createEmployeeHandler;
const getEmployeeByIdHandler = async (req, res, next) => {
    try {
        const employeeId = +req.params.id;
        if (isNaN(employeeId) || employeeId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del empleado debe ser un número válido mayor a 0');
        }
        const data = await new GetEmployeeById_1.GetEmployeeById(repo).execute(employeeId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Empleado no encontrado');
        }
        Logger_1.Logger.info('Employee found successfully:', { EmployeeID: data.EmployeeID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getEmployeeByIdHandler:', error);
        next(error);
    }
};
exports.getEmployeeByIdHandler = getEmployeeByIdHandler;
const updateEmployeeHandler = async (req, res, next) => {
    try {
        const employeeId = +req.params.id;
        if (isNaN(employeeId) || employeeId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del empleado debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.FirstName !== undefined && req.body.FirstName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El nombre no puede estar vacío');
        }
        if (req.body.LastName !== undefined && req.body.LastName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El apellido no puede estar vacío');
        }
        if (req.body.Email !== undefined && req.body.Email.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El email no puede estar vacío');
        }
        if (req.body.Phone !== undefined && req.body.Phone.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El teléfono no puede estar vacío');
        }
        if (req.body.DepartmentID !== undefined && req.body.DepartmentID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del departamento debe ser mayor a 0');
        }
        if (req.body.JobRoleID !== undefined && req.body.JobRoleID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del puesto de trabajo debe ser mayor a 0');
        }
        if (req.body.CostCenterID !== undefined && req.body.CostCenterID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del centro de costo debe ser mayor a 0');
        }
        const result = await new UpdateEmployee_1.UpdateEmployee(repo).execute(employeeId, req.body);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Empleado no encontrado');
        }
        Logger_1.Logger.info('Employee updated successfully:', { EmployeeID: result.EmployeeID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateEmployeeHandler:', error);
        next(error);
    }
};
exports.updateEmployeeHandler = updateEmployeeHandler;
const deleteEmployeeHandler = async (req, res, next) => {
    try {
        const employeeId = +req.params.id;
        if (isNaN(employeeId) || employeeId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del empleado debe ser un número válido mayor a 0');
        }
        // Verificar que el empleado existe antes de eliminarlo
        const existingEmployee = await new GetEmployeeById_1.GetEmployeeById(repo).execute(employeeId);
        if (!existingEmployee) {
            throw new NotFoundError_1.NotFoundError('Empleado no encontrado');
        }
        await new DeleteEmployee_1.DeleteEmployee(repo).execute(employeeId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Empleado eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteEmployeeHandler:', error);
        next(error);
    }
};
exports.deleteEmployeeHandler = deleteEmployeeHandler;
const getPaginatedEmployeesHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedEmployees_1.GetPaginatedEmployees(repo).execute(page, limit);
        Logger_1.Logger.info('Employees found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedEmployeesHandler:', error);
        next(error);
    }
};
exports.getPaginatedEmployeesHandler = getPaginatedEmployeesHandler;
//# sourceMappingURL=employee.controller.js.map