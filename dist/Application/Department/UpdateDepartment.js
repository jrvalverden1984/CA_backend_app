"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartment = void 0;
class UpdateDepartment {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, description) {
        return this.repo.update(id, description);
    }
}
exports.UpdateDepartment = UpdateDepartment;
//# sourceMappingURL=UpdateDepartment.js.map