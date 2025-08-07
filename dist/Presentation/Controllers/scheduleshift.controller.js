"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShiftsByScheduleHandler = exports.assignShiftsToScheduleHandler = exports.getPaginatedScheduleShiftsHandler = exports.deleteScheduleShiftHandler = exports.updateScheduleShiftHandler = exports.getScheduleShiftByIdHandler = exports.createScheduleShiftHandler = void 0;
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
const TypeORMScheduleShiftRepository_1 = require("../../Infrastructure/Repositories/TypeORMScheduleShiftRepository");
const CreateScheduleShift_1 = require("../../Application/ScheduleShift/CreateScheduleShift");
const GetScheduleShiftById_1 = require("../../Application/ScheduleShift/GetScheduleShiftById");
const UpdateScheduleShift_1 = require("../../Application/ScheduleShift/UpdateScheduleShift");
const DeleteScheduleShift_1 = require("../../Application/ScheduleShift/DeleteScheduleShift");
const GetPaginatedScheduleShifts_1 = require("../../Application/ScheduleShift/GetPaginatedScheduleShifts");
const AssignShiftsToSchedule_1 = require("../../Application/ScheduleShift/AssignShiftsToSchedule");
const GetShiftsBySchedule_1 = require("../../Application/ScheduleShift/GetShiftsBySchedule");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMScheduleShiftRepository_1.TypeORMScheduleShiftRepository();
// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - ScheduleShiftController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const createScheduleShiftHandler = async (req, res, next) => {
    try {
        if (!req.body.scheduleID || req.body.scheduleID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario es obligatorio y debe ser mayor a 0');
        }
        if (!req.body.shiftID || req.body.shiftID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del turno es obligatorio y debe ser mayor a 0');
        }
        const result = await new CreateScheduleShift_1.CreateScheduleShift(repo).execute(req.body.scheduleID, req.body.shiftID);
        Logger_1.Logger.info('ScheduleShift created successfully:', { ScheduleShiftID: result.ScheduleShiftID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ ScheduleShiftID: result.ScheduleShiftID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createScheduleShiftHandler:', error);
        next(error);
    }
};
exports.createScheduleShiftHandler = createScheduleShiftHandler;
const getScheduleShiftByIdHandler = async (req, res, next) => {
    try {
        const scheduleShiftId = +req.params.id;
        if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0');
        }
        const data = await new GetScheduleShiftById_1.GetScheduleShiftById(repo).execute(scheduleShiftId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Horario-turno no encontrado');
        }
        Logger_1.Logger.info('ScheduleShift found successfully:', { ScheduleShiftID: data.ScheduleShiftID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getScheduleShiftByIdHandler:', error);
        next(error);
    }
};
exports.getScheduleShiftByIdHandler = getScheduleShiftByIdHandler;
const updateScheduleShiftHandler = async (req, res, next) => {
    try {
        const scheduleShiftId = +req.params.id;
        if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.scheduleID !== undefined && req.body.scheduleID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario debe ser mayor a 0');
        }
        if (req.body.shiftID !== undefined && req.body.shiftID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del turno debe ser mayor a 0');
        }
        const result = await new UpdateScheduleShift_1.UpdateScheduleShift(repo).execute(scheduleShiftId, req.body.scheduleID, req.body.shiftID);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Horario-turno no encontrado');
        }
        Logger_1.Logger.info('ScheduleShift updated successfully:', { ScheduleShiftID: result.ScheduleShiftID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateScheduleShiftHandler:', error);
        next(error);
    }
};
exports.updateScheduleShiftHandler = updateScheduleShiftHandler;
const deleteScheduleShiftHandler = async (req, res, next) => {
    try {
        const scheduleShiftId = +req.params.id;
        if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0');
        }
        // Verificar que el horario-turno existe antes de eliminarlo
        const existingScheduleShift = await new GetScheduleShiftById_1.GetScheduleShiftById(repo).execute(scheduleShiftId);
        if (!existingScheduleShift) {
            throw new NotFoundError_1.NotFoundError('Horario-turno no encontrado');
        }
        await new DeleteScheduleShift_1.DeleteScheduleShift(repo).execute(scheduleShiftId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Horario-turno eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteScheduleShiftHandler:', error);
        next(error);
    }
};
exports.deleteScheduleShiftHandler = deleteScheduleShiftHandler;
const getPaginatedScheduleShiftsHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedScheduleShifts_1.GetPaginatedScheduleShifts(repo).execute(page, limit);
        Logger_1.Logger.info('ScheduleShifts found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedScheduleShiftsHandler:', error);
        next(error);
    }
};
exports.getPaginatedScheduleShiftsHandler = getPaginatedScheduleShiftsHandler;
const assignShiftsToScheduleHandler = async (req, res, next) => {
    try {
        if (!req.body.scheduleID || req.body.scheduleID <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario es obligatorio y debe ser mayor a 0');
        }
        if (!req.body.shiftIDs || !Array.isArray(req.body.shiftIDs) || req.body.shiftIDs.length === 0) {
            throw new BadRequestError_1.BadRequestError('Los IDs de los turnos son obligatorios y deben ser un array no vacío');
        }
        // Validar que todos los IDs de turnos sean válidos
        for (const shiftID of req.body.shiftIDs) {
            if (!shiftID || shiftID <= 0) {
                throw new BadRequestError_1.BadRequestError('Todos los IDs de turnos deben ser mayores a 0');
            }
        }
        const result = await new AssignShiftsToSchedule_1.AssignShiftsToSchedule(repo).execute(req.body.scheduleID, req.body.shiftIDs);
        Logger_1.Logger.info('Shifts assigned to schedule successfully:', { ScheduleID: req.body.scheduleID, ShiftsCount: req.body.shiftIDs.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in assignShiftsToScheduleHandler:', error);
        next(error);
    }
};
exports.assignShiftsToScheduleHandler = assignShiftsToScheduleHandler;
const getShiftsByScheduleHandler = async (req, res, next) => {
    try {
        const scheduleId = +req.params.scheduleID;
        if (isNaN(scheduleId) || scheduleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario debe ser un número válido mayor a 0');
        }
        const result = await new GetShiftsBySchedule_1.GetShiftsBySchedule(repo).execute(scheduleId);
        Logger_1.Logger.info('Shifts found for schedule successfully:', { ScheduleID: scheduleId, ShiftsCount: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getShiftsByScheduleHandler:', error);
        next(error);
    }
};
exports.getShiftsByScheduleHandler = getShiftsByScheduleHandler;
//# sourceMappingURL=scheduleshift.controller.js.map