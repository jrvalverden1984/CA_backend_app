"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedDepartments = void 0;
class GetPaginatedDepartments {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedDepartments = GetPaginatedDepartments;
//# sourceMappingURL=GetPaginatedDepartments.js.map