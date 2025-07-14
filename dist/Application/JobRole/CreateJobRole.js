"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobRole = void 0;
class CreateJobRole {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(description) {
        return this.repo.create(description);
    }
}
exports.CreateJobRole = CreateJobRole;
