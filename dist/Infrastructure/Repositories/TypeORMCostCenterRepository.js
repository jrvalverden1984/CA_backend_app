"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMCostCenterRepository = void 0;
const data_source_1 = require("../Database/data-source");
const CostCenterEntity_1 = require("../Entities/CostCenterEntity");
const CostCenter_1 = require("../../Domain/CostCenter/CostCenter");
class TypeORMCostCenterRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(CostCenterEntity_1.CostCenterEntity);
    }
    toDomain(entity) {
        return new CostCenter_1.CostCenter(entity.CostCenterID, entity.Description);
    }
    toEntity(domain) {
        const entity = new CostCenterEntity_1.CostCenterEntity();
        entity.CostCenterID = domain.CostCenterID;
        entity.Description = domain.Description;
        return entity;
    }
    async create(description) {
        const entity = this.repo.create({ Description: description });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async getById(id) {
        const entity = await this.repo.findOneBy({ CostCenterID: id });
        return entity ? this.toDomain(entity) : null;
    }
    async update(id, description) {
        const entity = await this.repo.findOneBy({ CostCenterID: id });
        if (!entity)
            return null;
        entity.Description = description;
        const updated = await this.repo.save(entity);
        return this.toDomain(updated);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async getPaginated(page, limit) {
        const entities = await this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
        });
        return entities.map(this.toDomain);
    }
}
exports.TypeORMCostCenterRepository = TypeORMCostCenterRepository;
