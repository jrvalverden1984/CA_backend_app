"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMDepartmentRepository = void 0;
const data_source_1 = require("../Database/data-source");
const DepartmentEntity_1 = require("../Entities/DepartmentEntity");
const Department_1 = require("../../Domain/Department/Department");
class TypeORMDepartmentRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(DepartmentEntity_1.DepartmentEntity);
    }
    toDomain(entity) {
        return new Department_1.Department(entity.DepartmentID, entity.Description);
    }
    toEntity(domain) {
        const entity = new DepartmentEntity_1.DepartmentEntity();
        entity.DepartmentID = domain.DepartmentID;
        entity.Description = domain.Description;
        return entity;
    }
    async create(description) {
        const entity = this.repo.create({ Description: description });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async getById(id) {
        const entity = await this.repo.findOneBy({ DepartmentID: id });
        return entity ? this.toDomain(entity) : null;
    }
    async update(id, description) {
        const entity = await this.repo.findOneBy({ DepartmentID: id });
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
exports.TypeORMDepartmentRepository = TypeORMDepartmentRepository;
