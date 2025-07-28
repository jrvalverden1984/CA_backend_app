"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMScheduleShiftRepository = void 0;
const data_source_1 = require("../Database/data-source");
const ScheduleShiftEntity_1 = require("../Entities/ScheduleShiftEntity");
const ScheduleShift_1 = require("../../Domain/ScheduleShift/ScheduleShift");
class TypeORMScheduleShiftRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(ScheduleShiftEntity_1.ScheduleShiftEntity);
    }
    toDomain(e) {
        return new ScheduleShift_1.ScheduleShift(e.ScheduleShiftID, e.ScheduleID, e.ShiftID);
    }
    async create(scheduleID, shiftID) {
        const entity = this.repo.create({ ScheduleID: scheduleID, ShiftID: shiftID });
        return this.toDomain(await this.repo.save(entity));
    }
    async getById(id) {
        const e = await this.repo.findOneBy({ ScheduleShiftID: id });
        return e ? this.toDomain(e) : null;
    }
    async update(id, scheduleID, shiftID) {
        const e = await this.repo.findOneBy({ ScheduleShiftID: id });
        if (!e)
            return null;
        e.ScheduleID = scheduleID;
        e.ShiftID = shiftID;
        return this.toDomain(await this.repo.save(e));
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async getPaginated(page, limit) {
        const list = await this.repo.find({ skip: (page - 1) * limit, take: limit });
        return list.map(this.toDomain);
    }
    async upsertManyForSchedule(scheduleID, shiftIDs) {
        // 1) Traer existentes con ese ScheduleID
        const existing = await this.repo.find({ where: { ScheduleID: scheduleID } });
        // Calcular cuáles ya existen y cuáles son nuevos
        const existingShiftIDs = new Set(existing.map(e => e.ShiftID));
        const toAdd = shiftIDs.filter(id => !existingShiftIDs.has(id));
        const toKeep = existing.filter(e => shiftIDs.includes(e.ShiftID));
        // 2) Borrar los que sobran
        const toDelete = existing.filter(e => !shiftIDs.includes(e.ShiftID));
        if (toDelete.length) {
            await this.repo.remove(toDelete);
        }
        // 3) Insertar los nuevos
        const newEntities = toAdd.map(id => this.repo.create({ ScheduleID: scheduleID, ShiftID: id }));
        const saved = await this.repo.save(newEntities);
        return [...toKeep, ...saved].map(this.toDomain.bind(this));
    }
    async findBySchedule(scheduleID) {
        const list = await this.repo.find({ where: { ScheduleID: scheduleID } });
        return list.map(this.toDomain);
    }
}
exports.TypeORMScheduleShiftRepository = TypeORMScheduleShiftRepository;
//# sourceMappingURL=TypeORMScheduleShiftRepository.js.map