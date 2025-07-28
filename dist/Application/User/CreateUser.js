"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
class CreateUser {
    constructor(repo) {
        this.repo = repo;
    }
    execute(data) {
        return this.repo.create(data);
    }
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map