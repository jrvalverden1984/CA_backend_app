"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCostCenterById = void 0;
class GetCostCenterById {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetCostCenterById = GetCostCenterById;
