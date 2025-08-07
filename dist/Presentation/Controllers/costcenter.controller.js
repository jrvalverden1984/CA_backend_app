"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedCostCentersHandler = exports.deleteCostCenterHandler = exports.updateCostCenterHandler = exports.getCostCenterByIdHandler = exports.createCostCenterHandler = void 0;
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
const TypeORMCostCenterRepository_1 = require("../../Infrastructure/Repositories/TypeORMCostCenterRepository");
const CreateCostCenter_1 = require("../../Application/CostCenter/CreateCostCenter");
const GetCostCenterById_1 = require("../../Application/CostCenter/GetCostCenterById");
const UpdateCostCenter_1 = require("../../Application/CostCenter/UpdateCostCenter");
const DeleteCostCenter_1 = require("../../Application/CostCenter/DeleteCostCenter");
const GetPaginatedCostCenters_1 = require("../../Application/CostCenter/GetPaginatedCostCenters");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const Logger_1 = require("../../Shared/Utils/Logger");
const repo = new TypeORMCostCenterRepository_1.TypeORMCostCenterRepository();
// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - CostCenterController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const createCostCenterHandler = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción es obligatoria');
        }
        const result = await new CreateCostCenter_1.CreateCostCenter(repo).execute(req.body.description);
        Logger_1.Logger.info('CostCenter created successfully:', { CostCenterID: result.CostCenterID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ CostCenterID: result.CostCenterID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createCostCenterHandler:', error);
        next(error);
    }
};
exports.createCostCenterHandler = createCostCenterHandler;
const getCostCenterByIdHandler = async (req, res, next) => {
    try {
        const costCenterId = +req.params.id;
        if (isNaN(costCenterId) || costCenterId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0');
        }
        const data = await new GetCostCenterById_1.GetCostCenterById(repo).execute(costCenterId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Centro de costo no encontrado');
        }
        Logger_1.Logger.info('CostCenter found successfully:', { CostCenterID: data.CostCenterID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getCostCenterByIdHandler:', error);
        next(error);
    }
};
exports.getCostCenterByIdHandler = getCostCenterByIdHandler;
const updateCostCenterHandler = async (req, res, next) => {
    try {
        const costCenterId = +req.params.id;
        if (isNaN(costCenterId) || costCenterId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.description !== undefined && req.body.description.trim() === '') {
            throw new BadRequestError_1.BadRequestError('La descripción no puede estar vacía');
        }
        const result = await new UpdateCostCenter_1.UpdateCostCenter(repo).execute(costCenterId, req.body.description);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Centro de costo no encontrado');
        }
        Logger_1.Logger.info('CostCenter updated successfully:', { CostCenterID: result.CostCenterID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateCostCenterHandler:', error);
        next(error);
    }
};
exports.updateCostCenterHandler = updateCostCenterHandler;
const deleteCostCenterHandler = async (req, res, next) => {
    try {
        const costCenterId = +req.params.id;
        if (isNaN(costCenterId) || costCenterId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0');
        }
        // Verificar que el centro de costo existe antes de eliminarlo
        const existingCostCenter = await new GetCostCenterById_1.GetCostCenterById(repo).execute(costCenterId);
        if (!existingCostCenter) {
            throw new NotFoundError_1.NotFoundError('Centro de costo no encontrado');
        }
        await new DeleteCostCenter_1.DeleteCostCenter(repo).execute(costCenterId);
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Centro de costo eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteCostCenterHandler:', error);
        next(error);
    }
};
exports.deleteCostCenterHandler = deleteCostCenterHandler;
const getPaginatedCostCentersHandler = async (req, res, next) => {
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
        const result = await new GetPaginatedCostCenters_1.GetPaginatedCostCenters(repo).execute(page, limit);
        Logger_1.Logger.info('CostCenters found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedCostCentersHandler:', error);
        next(error);
    }
};
exports.getPaginatedCostCentersHandler = getPaginatedCostCentersHandler;
//# sourceMappingURL=costcenter.controller.js.map