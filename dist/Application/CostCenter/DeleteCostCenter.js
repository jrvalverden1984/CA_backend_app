"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCostCenter = void 0;
class DeleteCostCenter {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteCostCenter = DeleteCostCenter;
