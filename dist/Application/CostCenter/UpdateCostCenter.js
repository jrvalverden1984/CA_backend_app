"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCostCenter = void 0;
class UpdateCostCenter {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, description) {
        return this.repo.update(id, description);
    }
}
exports.UpdateCostCenter = UpdateCostCenter;
