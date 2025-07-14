"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShiftsByScheduleHandler = exports.assignShiftsToScheduleHandler = exports.getPaginatedScheduleShiftsHandler = exports.deleteScheduleShiftHandler = exports.updateScheduleShiftHandler = exports.getScheduleShiftByIdHandler = exports.createScheduleShiftHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMScheduleShiftRepository_1 = require("../../Infrastructure/Repositories/TypeORMScheduleShiftRepository");
const CreateScheduleShift_1 = require("../../Application/ScheduleShift/CreateScheduleShift");
const GetScheduleShiftById_1 = require("../../Application/ScheduleShift/GetScheduleShiftById");
const UpdateScheduleShift_1 = require("../../Application/ScheduleShift/UpdateScheduleShift");
const DeleteScheduleShift_1 = require("../../Application/ScheduleShift/DeleteScheduleShift");
const GetPaginatedScheduleShifts_1 = require("../../Application/ScheduleShift/GetPaginatedScheduleShifts");
const AssignShiftsToSchedule_1 = require("../../Application/ScheduleShift/AssignShiftsToSchedule");
const GetShiftsBySchedule_1 = require("../../Application/ScheduleShift/GetShiftsBySchedule");
const repo = new TypeORMScheduleShiftRepository_1.TypeORMScheduleShiftRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createScheduleShiftHandler = async (req, res) => {
    const { scheduleID, shiftID } = req.body;
    const result = await new CreateScheduleShift_1.CreateScheduleShift(repo).execute(scheduleID, shiftID);
    res.status(201).json(result);
};
exports.createScheduleShiftHandler = createScheduleShiftHandler;
const getScheduleShiftByIdHandler = async (req, res) => {
    const data = await new GetScheduleShiftById_1.GetScheduleShiftById(repo).execute(+req.params.id);
    data ? res.json(data) : res.status(404).send();
};
exports.getScheduleShiftByIdHandler = getScheduleShiftByIdHandler;
const updateScheduleShiftHandler = async (req, res) => {
    const { scheduleID, shiftID } = req.body;
    const result = await new UpdateScheduleShift_1.UpdateScheduleShift(repo).execute(+req.params.id, scheduleID, shiftID);
    res.json(result);
};
exports.updateScheduleShiftHandler = updateScheduleShiftHandler;
const deleteScheduleShiftHandler = async (req, res) => {
    await new DeleteScheduleShift_1.DeleteScheduleShift(repo).execute(+req.params.id);
    res.status(204).send();
};
exports.deleteScheduleShiftHandler = deleteScheduleShiftHandler;
const getPaginatedScheduleShiftsHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await new GetPaginatedScheduleShifts_1.GetPaginatedScheduleShifts(repo).execute(page, limit);
    res.json(result);
};
exports.getPaginatedScheduleShiftsHandler = getPaginatedScheduleShiftsHandler;
const assignShiftsToScheduleHandler = async (req, res) => {
    const { scheduleID, shiftIDs } = req.body; // shiftIDs: number[]
    const result = await new AssignShiftsToSchedule_1.AssignShiftsToSchedule(repo).execute(scheduleID, shiftIDs);
    res.status(200).json(result);
};
exports.assignShiftsToScheduleHandler = assignShiftsToScheduleHandler;
const getShiftsByScheduleHandler = async (req, res) => {
    const result = await new GetShiftsBySchedule_1.GetShiftsBySchedule(repo).execute(+req.params.scheduleID);
    res.json(result);
};
exports.getShiftsByScheduleHandler = getShiftsByScheduleHandler;
