"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMShiftRepository = void 0;
const data_source_1 = require("../Database/data-source");
const ShiftEntity_1 = require("../Entities/ShiftEntity");
const Shift_1 = require("../../Domain/Shift/Shift");
class TypeORMShiftRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(ShiftEntity_1.ShiftEntity);
    }
    toDomain(e) {
        return new Shift_1.Shift(e.ShiftID, e.Description, e.Start, e.RangeStartIn, e.RangeStartOut, e.End, e.RangeEndIn, e.RangeEndOut);
    }
    async create(data) {
        const entity = this.repo.create(data);
        return this.toDomain(await this.repo.save(entity));
    }
    async getById(id) {
        const e = await this.repo.findOneBy({ ShiftID: id });
        return e ? this.toDomain(e) : null;
    }
    async update(id, data) {
        const e = await this.repo.findOneBy({ ShiftID: id });
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
exports.TypeORMShiftRepository = TypeORMShiftRepository;
