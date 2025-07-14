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
const repo = new TypeORMShiftRepository_1.TypeORMShiftRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createShiftHandler = async (req, res) => {
    const result = await new CreateShift_1.CreateShift(repo).execute(req.body);
    res.status(201).json(result);
};
exports.createShiftHandler = createShiftHandler;
const getShiftByIdHandler = async (req, res) => {
    const data = await new GetShiftById_1.GetShiftById(repo).execute(+req.params.id);
    data ? res.json(data) : res.status(404).send();
};
exports.getShiftByIdHandler = getShiftByIdHandler;
const updateShiftHandler = async (req, res) => {
    const result = await new UpdateShift_1.UpdateShift(repo).execute(+req.params.id, req.body);
    res.json(result);
};
exports.updateShiftHandler = updateShiftHandler;
const deleteShiftHandler = async (_, res) => {
    await new DeleteShift_1.DeleteShift(repo).execute(+_.params.id);
    res.status(204).send();
};
exports.deleteShiftHandler = deleteShiftHandler;
const getPaginatedShiftsHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    res.json(await new GetPaginatedShifts_1.GetPaginatedShifts(repo).execute(page, limit));
};
exports.getPaginatedShiftsHandler = getPaginatedShiftsHandler;
