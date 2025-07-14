"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMUserRepository = void 0;
const User_1 = require("../../Domain/User/User");
const data_source_1 = require("../Database/data-source");
const UserEntity_1 = require("../Entities/UserEntity");
class TypeORMUserRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    }
    async findById(id) {
        const user = await this.repo.findOneBy({ id });
        if (!user)
            return null;
        return new User_1.User(user.id, user.name, user.email);
    }
    async save(user) {
        const userEntity = this.repo.create(user);
        await this.repo.save(userEntity);
    }
}
exports.TypeORMUserRepository = TypeORMUserRepository;
