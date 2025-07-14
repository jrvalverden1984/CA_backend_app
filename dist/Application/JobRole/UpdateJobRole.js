"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobRole = void 0;
class UpdateJobRole {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, description) {
        return this.repo.update(id, description);
    }
}
exports.UpdateJobRole = UpdateJobRole;
