"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDepartmentById = void 0;
class GetDepartmentById {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetDepartmentById = GetDepartmentById;
//# sourceMappingURL=GetDepartmentById.js.map