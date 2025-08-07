"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedSchedulesHandler = exports.deleteScheduleHandler = exports.updateScheduleHandler = exports.getScheduleByIdHandler = exports.createScheduleHandler = void 0;
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
const TypeORMScheduleRepository_1 = require("../../Infrastructure/Repositories/TypeORMScheduleRepository");
const CreateSchedule_1 = require("../../Application/Schedule/CreateSchedule");
const GetScheduleById_1 = require("../../Application/Schedule/GetScheduleById");
const UpdateSchedule_1 = require("../../Application/Schedule/UpdateSchedule");
const DeleteSchedule_1 = require("../../Application/Schedule/DeleteSchedule");
const GetPaginatedSchedules_1 = require("../../Application/Schedule/GetPaginatedSchedules");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMScheduleRepository_1.TypeORMScheduleRepository();
// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - ScheduleController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const createScheduleHandler = async (req, res, next) => {
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
        const result = await new CreateSchedule_1.CreateSchedule(repo).execute(req.body);
        Logger_1.Logger.info('Schedule created successfully:', { ScheduleID: result.ScheduleID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ ScheduleID: result.ScheduleID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createScheduleHandler:', error);
        next(error);
    }
};
exports.createScheduleHandler = createScheduleHandler;
const getScheduleByIdHandler = async (req, res, next) => {
    try {
        const scheduleId = +req.params.id;
        if (isNaN(scheduleId) || scheduleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario debe ser un número válido mayor a 0');
        }
        const data = await new GetScheduleById_1.GetScheduleById(repo).execute(scheduleId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Horario no encontrado');
        }
        Logger_1.Logger.info('Schedule found successfully:', { ScheduleID: data.ScheduleID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getScheduleByIdHandler:', error);
        next(error);
    }
};
exports.getScheduleByIdHandler = getScheduleByIdHandler;
const updateScheduleHandler = async (req, res, next) => {
    try {
        const scheduleId = +req.params.id;
        if (isNaN(scheduleId) || scheduleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario debe ser un número válido mayor a 0');
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
        const result = await new UpdateSchedule_1.UpdateSchedule(repo).execute(scheduleId, req.body);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Horario no encontrado');
        }
        Logger_1.Logger.info('Schedule updated successfully:', { ScheduleID: result.ScheduleID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateScheduleHandler:', error);
        next(error);
    }
};
exports.updateScheduleHandler = updateScheduleHandler;
const deleteScheduleHandler = async (req, res, next) => {
    try {
        const scheduleId = +req.params.id;
        if (isNaN(scheduleId) || scheduleId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del horario debe ser un número válido mayor a 0');
        }
        // Verificar que el horario existe antes de eliminarlo
        const existingSchedule = await new GetScheduleById_1.GetScheduleById(repo).execute(scheduleId);
        if (!existingSchedule) {
            throw new NotFoundError_1.NotFoundError('Horario no encontrado');
        }
        await new DeleteSchedule_1.DeleteSchedule(repo).execute(scheduleId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Horario eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteScheduleHandler:', error);
        next(error);
    }
};
exports.deleteScheduleHandler = deleteScheduleHandler;
const getPaginatedSchedulesHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedSchedules_1.GetPaginatedSchedules(repo).execute(page, limit);
        Logger_1.Logger.info('Schedules found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedSchedulesHandler:', error);
        next(error);
    }
};
exports.getPaginatedSchedulesHandler = getPaginatedSchedulesHandler;
//# sourceMappingURL=schedule.controller.js.map