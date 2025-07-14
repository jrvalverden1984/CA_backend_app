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
const repo = new TypeORMHolidayRepository_1.TypeORMHolidayRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createHolidayHandler = async (req, res) => {
    const { description, startDate } = req.body;
    const result = await new CreateHoliday_1.CreateHoliday(repo).execute(description, new Date(startDate));
    res.status(201).json(result);
};
exports.createHolidayHandler = createHolidayHandler;
const getHolidayByIdHandler = async (req, res) => {
    const data = await new GetHolidayById_1.GetHolidayById(repo).execute(Number(req.params.id));
    data ? res.json(data) : res.status(404).send();
};
exports.getHolidayByIdHandler = getHolidayByIdHandler;
const updateHolidayHandler = async (req, res) => {
    const { description, startDate } = req.body;
    const result = await new UpdateHoliday_1.UpdateHoliday(repo).execute(Number(req.params.id), description, new Date(startDate));
    res.json(result);
};
exports.updateHolidayHandler = updateHolidayHandler;
const deleteHolidayHandler = async (req, res) => {
    await new DeleteHoliday_1.DeleteHoliday(repo).execute(Number(req.params.id));
    res.status(204).send();
};
exports.deleteHolidayHandler = deleteHolidayHandler;
const getPaginatedHolidaysHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await new GetPaginatedHolidays_1.GetPaginatedHolidays(repo).execute(page, limit);
    res.json(result);
};
exports.getPaginatedHolidaysHandler = getPaginatedHolidaysHandler;
