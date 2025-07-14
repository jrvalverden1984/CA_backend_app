"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = require("../../Domain/User/User");
class CreateUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(id, name, email) {
        const user = new User_1.User(id, name, email);
        await this.userRepo.save(user);
    }
}
exports.CreateUser = CreateUser;
