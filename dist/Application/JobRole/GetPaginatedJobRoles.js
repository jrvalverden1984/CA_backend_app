"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedJobRoles = void 0;
class GetPaginatedJobRoles {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedJobRoles = GetPaginatedJobRoles;
//# sourceMappingURL=GetPaginatedJobRoles.js.map