"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCostCenter = void 0;
class CreateCostCenter {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(description) {
        return this.repo.create(description);
    }
}
exports.CreateCostCenter = CreateCostCenter;
//# sourceMappingURL=CreateCostCenter.js.map