"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedHolidaysHandler = exports.deleteHolidayHandler = exports.updateHolidayHandler = exports.getHolidayByIdHandler = exports.createHolidayHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMHolidayRepository_1 = require("../../Infrastructure/Repositories/TypeORMHolidayRepository");
const CreateHoliday_1 = require("../../Application/Holiday/CreateHoliday");
const GetHolidayById_1 = require("../../Application/Holiday/GetHolidayById");
const UpdateHoliday_1 = require("../../Application/Holiday/UpdateHoliday");
const DeleteHoliday_1 = require("../../Application/Holiday/DeleteHoliday");
const GetPaginatedHolidays_1 = require("../../Application/Holiday/GetPaginatedHolidays");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMHolidayRepository_1.TypeORMHolidayRepository();
data_source_1.AppDataSource.initialize().then(() => {
    Logger_1.Logger.info('📦 TypeORM connected to PostgreSQL - HolidayController');
}).catch((error) => Logger_1.Logger.error('Error connecting to TypeORM:', error));
const createHolidayHandler = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción es obligatoria');
        }
        if (!req.body.startDate) {
            throw new BadRequestError_1.BadRequestError('La fecha de inicio es obligatoria');
        }
        const startDate = new Date(req.body.startDate);
        if (isNaN(startDate.getTime())) {
            throw new BadRequestError_1.BadRequestError('La fecha de inicio debe ser una fecha válida');
        }
        const result = await new CreateHoliday_1.CreateHoliday(repo).execute(req.body.description, startDate);
        Logger_1.Logger.info('Holiday created successfully:', { HolidayID: result.HolidayID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ HolidayID: result.HolidayID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createHolidayHandler:', error);
        next(error);
    }
};
exports.createHolidayHandler = createHolidayHandler;
const getHolidayByIdHandler = async (req, res, next) => {
    try {
        const holidayId = +req.params.id;
        if (isNaN(holidayId) || holidayId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del feriado debe ser un número válido mayor a 0');
        }
        const data = await new GetHolidayById_1.GetHolidayById(repo).execute(holidayId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Feriado no encontrado');
        }
        Logger_1.Logger.info('Holiday found successfully:', { HolidayID: data.HolidayID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getHolidayByIdHandler:', error);
        next(error);
    }
};
exports.getHolidayByIdHandler = getHolidayByIdHandler;
const updateHolidayHandler = async (req, res, next) => {
    try {
        const holidayId = +req.params.id;
        if (isNaN(holidayId) || holidayId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del feriado debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.description !== undefined && req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción no puede estar vacía');
        }
        if (req.body.startDate !== undefined) {
            const startDate = new Date(req.body.startDate);
            if (isNaN(startDate.getTime())) {
                throw new BadRequestError_1.BadRequestError('La fecha de inicio debe ser una fecha válida');
            }
        }
        // Obtener el feriado actual para usar valores por defecto si no se proporcionan
        const currentHoliday = await new GetHolidayById_1.GetHolidayById(repo).execute(holidayId);
        if (!currentHoliday) {
            throw new NotFoundError_1.NotFoundError('Feriado no encontrado');
        }
        const result = await new UpdateHoliday_1.UpdateHoliday(repo).execute(holidayId, req.body.description || currentHoliday.Description, req.body.startDate ? new Date(req.body.startDate) : currentHoliday.StartDate);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Feriado no encontrado');
        }
        Logger_1.Logger.info('Holiday updated successfully:', { HolidayID: result.HolidayID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateHolidayHandler:', error);
        next(error);
    }
};
exports.updateHolidayHandler = updateHolidayHandler;
const deleteHolidayHandler = async (req, res, next) => {
    try {
        const holidayId = +req.params.id;
        if (isNaN(holidayId) || holidayId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del feriado debe ser un número válido mayor a 0');
        }
        // Verificar que el feriado existe antes de eliminarlo
        const existingHoliday = await new GetHolidayById_1.GetHolidayById(repo).execute(holidayId);
        if (!existingHoliday) {
            throw new NotFoundError_1.NotFoundError('Feriado no encontrado');
        }
        await new DeleteHoliday_1.DeleteHoliday(repo).execute(holidayId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Feriado eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteHolidayHandler:', error);
        next(error);
    }
};
exports.deleteHolidayHandler = deleteHolidayHandler;
const getPaginatedHolidaysHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedHolidays_1.GetPaginatedHolidays(repo).execute(page, limit);
        Logger_1.Logger.info('Holidays found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedHolidaysHandler:', error);
        next(error);
    }
};
exports.getPaginatedHolidaysHandler = getPaginatedHolidaysHandler;
//# sourceMappingURL=holiday.controller.js.map