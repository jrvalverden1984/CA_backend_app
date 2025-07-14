"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedCostCentersHandler = exports.deleteCostCenterHandler = exports.updateCostCenterHandler = exports.getCostCenterByIdHandler = exports.createCostCenterHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMCostCenterRepository_1 = require("../../Infrastructure/Repositories/TypeORMCostCenterRepository");
const CreateCostCenter_1 = require("../../Application/CostCenter/CreateCostCenter");
const GetCostCenterById_1 = require("../../Application/CostCenter/GetCostCenterById");
const UpdateCostCenter_1 = require("../../Application/CostCenter/UpdateCostCenter");
const DeleteCostCenter_1 = require("../../Application/CostCenter/DeleteCostCenter");
const GetPaginatedCostCenters_1 = require("../../Application/CostCenter/GetPaginatedCostCenters");
const repo = new TypeORMCostCenterRepository_1.TypeORMCostCenterRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createCostCenterHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new CreateCostCenter_1.CreateCostCenter(repo);
    const result = await useCase.execute(description);
    res.status(201).json(result);
};
exports.createCostCenterHandler = createCostCenterHandler;
const getCostCenterByIdHandler = async (req, res) => {
    const useCase = new GetCostCenterById_1.GetCostCenterById(repo);
    const result = await useCase.execute(Number(req.params.id));
    if (!result)
        return res.status(404).send();
    res.json(result);
};
exports.getCostCenterByIdHandler = getCostCenterByIdHandler;
const updateCostCenterHandler = async (req, res) => {
    const { description } = req.body;
    const useCase = new UpdateCostCenter_1.UpdateCostCenter(repo);
    const result = await useCase.execute(Number(req.params.id), description);
    res.json(result);
};
exports.updateCostCenterHandler = updateCostCenterHandler;
const deleteCostCenterHandler = async (req, res) => {
    const useCase = new DeleteCostCenter_1.DeleteCostCenter(repo);
    await useCase.execute(Number(req.params.id));
    res.status(204).send();
};
exports.deleteCostCenterHandler = deleteCostCenterHandler;
const getPaginatedCostCentersHandler = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const useCase = new GetPaginatedCostCenters_1.GetPaginatedCostCenters(repo);
    const result = await useCase.execute(Number(page), Number(limit));
    res.json(result);
};
exports.getPaginatedCostCentersHandler = getPaginatedCostCentersHandler;
