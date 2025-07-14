"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMHolidayRepository = void 0;
const data_source_1 = require("../Database/data-source");
const HolidayEntity_1 = require("../Entities/HolidayEntity");
const Holiday_1 = require("../../Domain/Holiday/Holiday");
class TypeORMHolidayRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(HolidayEntity_1.HolidayEntity);
    }
    toDomain(e) {
        return new Holiday_1.Holiday(e.HolidayID, e.Description, e.StartDate);
    }
    async create(description, startDate) {
        const entity = this.repo.create({ Description: description, StartDate: startDate });
        return this.toDomain(await this.repo.save(entity));
    }
    async getById(id) {
        const entity = await this.repo.findOneBy({ HolidayID: id });
        return entity ? this.toDomain(entity) : null;
    }
    async update(id, description, startDate) {
        const entity = await this.repo.findOneBy({ HolidayID: id });
        if (!entity)
            return null;
        entity.Description = description;
        entity.StartDate = startDate;
        return this.toDomain(await this.repo.save(entity));
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async getPaginated(page, limit) {
        const list = await this.repo.find({ skip: (page - 1) * limit, take: limit });
        return list.map(this.toDomain);
    }
}
exports.TypeORMHolidayRepository = TypeORMHolidayRepository;
