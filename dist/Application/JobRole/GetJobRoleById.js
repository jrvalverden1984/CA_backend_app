"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJobRoleById = void 0;
class GetJobRoleById {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetJobRoleById = GetJobRoleById;
