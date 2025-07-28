"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedShiftsHandler = exports.deleteShiftHandler = exports.updateShiftHandler = exports.getShiftByIdHandler = exports.createShiftHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMShiftRepository_1 = require("../../Infrastructure/Repositories/TypeORMShiftRepository");
const CreateShift_1 = require("../../Application/Shift/CreateShift");
const GetShiftById_1 = require("../../Application/Shift/GetShiftById");
const UpdateShift_1 = require("../../Application/Shift/UpdateShift");
const DeleteShift_1 = require("../../Application/Shift/DeleteShift");
const GetPaginatedShifts_1 = require("../../Application/Shift/GetPaginatedShifts");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMShiftRepository_1.TypeORMShiftRepository();
data_source_1.AppDataSource.initialize().then(() => {
    Logger_1.Logger.info('📦 TypeORM connected to PostgreSQL - ShiftController');
}).catch((error) => Logger_1.Logger.error('Error connecting to TypeORM:', error));
const createShiftHandler = async (req, res, next) => {
    try {
        // Validar campos obligatorios
        if (!req.body.Name || req.body.Name.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El nombre es obligatorio');
        }
        if (!req.body.Description || req.body.Description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción es obligatoria');
        }
        if (!req.body.StartTime) {
            throw new BadRequestError_1.BadRequestError('La hora de inicio es obligatoria');
        }
        if (!req.body.EndTime) {
            throw new BadRequestError_1.BadRequestError('La hora de fin es obligatoria');
        }
        const result = await new CreateShift_1.CreateShift(repo).execute(req.body);
        Logger_1.Logger.info('Shift created successfully:', { ShiftID: result.ShiftID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ ShiftID: result.ShiftID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createShiftHandler:', error);
        next(error);
    }
};
exports.createShiftHandler = createShiftHandler;
const getShiftByIdHandler = async (req, res, next) => {
    try {
        const shiftId = +req.params.id;
        if (isNaN(shiftId) || shiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del turno debe ser un número válido mayor a 0');
        }
        const data = await new GetShiftById_1.GetShiftById(repo).execute(shiftId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Turno no encontrado');
        }
        Logger_1.Logger.info('Shift found successfully:', { ShiftID: data.ShiftID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getShiftByIdHandler:', error);
        next(error);
    }
};
exports.getShiftByIdHandler = getShiftByIdHandler;
const updateShiftHandler = async (req, res, next) => {
    try {
        const shiftId = +req.params.id;
        if (isNaN(shiftId) || shiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del turno debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.Name !== undefined && req.body.Name.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El nombre no puede estar vacío');
        }
        if (req.body.Description !== undefined && req.body.Description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción no puede estar vacía');
        }
        if (req.body.StartTime !== undefined && !req.body.StartTime) {
            throw new BadRequestError_1.BadRequestError('La hora de inicio no puede estar vacía');
        }
        if (req.body.EndTime !== undefined && !req.body.EndTime) {
            throw new BadRequestError_1.BadRequestError('La hora de fin no puede estar vacía');
        }
        const result = await new UpdateShift_1.UpdateShift(repo).execute(shiftId, req.body);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Turno no encontrado');
        }
        Logger_1.Logger.info('Shift updated successfully:', { ShiftID: result.ShiftID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateShiftHandler:', error);
        next(error);
    }
};
exports.updateShiftHandler = updateShiftHandler;
const deleteShiftHandler = async (req, res, next) => {
    try {
        const shiftId = +req.params.id;
        if (isNaN(shiftId) || shiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del turno debe ser un número válido mayor a 0');
        }
        // Verificar que el turno existe antes de eliminarlo
        const existingShift = await new GetShiftById_1.GetShiftById(repo).execute(shiftId);
        if (!existingShift) {
            throw new NotFoundError_1.NotFoundError('Turno no encontrado');
        }
        await new DeleteShift_1.DeleteShift(repo).execute(shiftId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Turno eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteShiftHandler:', error);
        next(error);
    }
};
exports.deleteShiftHandler = deleteShiftHandler;
const getPaginatedShiftsHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedShifts_1.GetPaginatedShifts(repo).execute(page, limit);
        Logger_1.Logger.info('Shifts found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedShiftsHandler:', error);
        next(error);
    }
};
exports.getPaginatedShiftsHandler = getPaginatedShiftsHandler;
//# sourceMappingURL=shift.controller.js.map