"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedEmployees = void 0;
class GetPaginatedEmployees {
    constructor(repo) {
        this.repo = repo;
    }
    execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedEmployees = GetPaginatedEmployees;
