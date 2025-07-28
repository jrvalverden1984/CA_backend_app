"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMUserRepository = void 0;
const data_source_1 = require("../Database/data-source");
const UserEntity_1 = require("../Entities/UserEntity");
const User_1 = require("../../Domain/User/User");
const CryptoLib_1 = __importDefault(require("../../Shared/Utils/CryptoLib"));
class TypeORMUserRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    }
    toDomain(e) {
        return new User_1.User(e.UserID, e.CompanyID, e.Login, e.FirstName, e.LastName, e.Password, e.ExpirationDate, e.Metadata);
    }
    async create(data) {
        const crypto = new CryptoLib_1.default();
        const encrypted = crypto.encryptData(data.Password);
        const entityData = { ...data, Password: encrypted || '' };
        const saved = await this.repo.save(this.repo.create(entityData));
        return this.toDomain(saved);
    }
    async getById(id) {
        const e = await this.repo.findOneBy({ UserID: id });
        return e ? this.toDomain(e) : null;
    }
    async update(id, data) {
        const e = await this.repo.findOneBy({ UserID: id });
        if (!e)
            return null;
        Object.assign(e, data);
        if (data.Password) {
            const crypto = new CryptoLib_1.default();
            const encrypted = crypto.encryptData(data.Password);
            e.Password = encrypted || '';
        }
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
exports.TypeORMUserRepository = TypeORMUserRepository;
//# sourceMappingURL=TypeORMUserRepository.js.map