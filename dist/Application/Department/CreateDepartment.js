"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartment = void 0;
class CreateDepartment {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(description) {
        return this.repo.create(description);
    }
}
exports.CreateDepartment = CreateDepartment;
//# sourceMappingURL=CreateDepartment.js.map