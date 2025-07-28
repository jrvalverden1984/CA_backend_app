"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedCostCenters = void 0;
class GetPaginatedCostCenters {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedCostCenters = GetPaginatedCostCenters;
//# sourceMappingURL=GetPaginatedCostCenters.js.map