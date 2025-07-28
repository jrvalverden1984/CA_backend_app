"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployee = void 0;
class CreateEmployee {
    constructor(repo) {
        this.repo = repo;
    }
    execute(data) {
        return this.repo.create(data);
    }
}
exports.CreateEmployee = CreateEmployee;
//# sourceMappingURL=CreateEmployee.js.map