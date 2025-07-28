"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMScheduleRepository = void 0;
const data_source_1 = require("../Database/data-source");
const ScheduleEntity_1 = require("../Entities/ScheduleEntity");
const Schedule_1 = require("../../Domain/Schedule/Schedule");
class TypeORMScheduleRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(ScheduleEntity_1.ScheduleEntity);
    }
    toDomain(e) {
        return new Schedule_1.Schedule(e.ScheduleID, e.Description, e.ShortName, e.MinuteBeforeInput, e.MinuteAfterOutput, e.MinuteDelay, e.ShiftType, e.MinuteLunch, e.Start, e.RangeStartIn, e.RangeStartOut, e.End, e.RangeEndIn, e.RangeEndOut);
    }
    async create(data) {
        const entity = this.repo.create(data);
        return this.toDomain(await this.repo.save(entity));
    }
    async getById(id) {
        const e = await this.repo.findOneBy({ ScheduleID: id });
        return e ? this.toDomain(e) : null;
    }
    async update(id, data) {
        const e = await this.repo.findOneBy({ ScheduleID: id });
        if (!e)
            return null;
        Object.assign(e, data);
        return this.toDomain(await this.repo.save(e));
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async getPaginated(page, limit) {
        const list = await this.repo.find({ skip: (page - 1) * limit, take: limit });
        return list.map(this.toDomain);
    }
}
exports.TypeORMScheduleRepository = TypeORMScheduleRepository;
//# sourceMappingURL=TypeORMScheduleRepository.js.map