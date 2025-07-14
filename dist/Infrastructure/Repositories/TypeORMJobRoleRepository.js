"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMJobRoleRepository = void 0;
const data_source_1 = require("../Database/data-source");
const JobRoleEntity_1 = require("../Entities/JobRoleEntity");
const JobRole_1 = require("../../Domain/JobRole/JobRole");
class TypeORMJobRoleRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(JobRoleEntity_1.JobRoleEntity);
    }
    toDomain(entity) {
        return new JobRole_1.JobRole(entity.JobRoleID, entity.Description);
    }
    toEntity(domain) {
        const entity = new JobRoleEntity_1.JobRoleEntity();
        entity.JobRoleID = domain.JobRoleID;
        entity.Description = domain.Description;
        return entity;
    }
    async create(description) {
        const entity = this.repo.create({ Description: description });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async getById(id) {
        const entity = await this.repo.findOneBy({ JobRoleID: id });
        return entity ? this.toDomain(entity) : null;
    }
    async update(id, description) {
        const entity = await this.repo.findOneBy({ JobRoleID: id });
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
exports.TypeORMJobRoleRepository = TypeORMJobRoleRepository;
