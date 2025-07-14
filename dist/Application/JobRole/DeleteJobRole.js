"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteJobRole = void 0;
class DeleteJobRole {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteJobRole = DeleteJobRole;
