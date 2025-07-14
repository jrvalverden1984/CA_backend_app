"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedSchedulesHandler = exports.deleteScheduleHandler = exports.updateScheduleHandler = exports.getScheduleByIdHandler = exports.createScheduleHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMScheduleRepository_1 = require("../../Infrastructure/Repositories/TypeORMScheduleRepository");
const CreateSchedule_1 = require("../../Application/Schedule/CreateSchedule");
const GetScheduleById_1 = require("../../Application/Schedule/GetScheduleById");
const UpdateSchedule_1 = require("../../Application/Schedule/UpdateSchedule");
const DeleteSchedule_1 = require("../../Application/Schedule/DeleteSchedule");
const GetPaginatedSchedules_1 = require("../../Application/Schedule/GetPaginatedSchedules");
const repo = new TypeORMScheduleRepository_1.TypeORMScheduleRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createScheduleHandler = async (req, res) => {
    const result = await new CreateSchedule_1.CreateSchedule(repo).execute(req.body);
    res.status(201).json(result);
};
exports.createScheduleHandler = createScheduleHandler;
const getScheduleByIdHandler = async (req, res) => {
    const data = await new GetScheduleById_1.GetScheduleById(repo).execute(+req.params.id);
    data ? res.json(data) : res.status(404).send();
};
exports.getScheduleByIdHandler = getScheduleByIdHandler;
const updateScheduleHandler = async (req, res) => {
    const result = await new UpdateSchedule_1.UpdateSchedule(repo).execute(+req.params.id, req.body);
    res.json(result);
};
exports.updateScheduleHandler = updateScheduleHandler;
const deleteScheduleHandler = async (req, res) => {
    await new DeleteSchedule_1.DeleteSchedule(repo).execute(+req.params.id);
    res.status(204).send();
};
exports.deleteScheduleHandler = deleteScheduleHandler;
const getPaginatedSchedulesHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await new GetPaginatedSchedules_1.GetPaginatedSchedules(repo).execute(page, limit);
    res.json(result);
};
exports.getPaginatedSchedulesHandler = getPaginatedSchedulesHandler;
