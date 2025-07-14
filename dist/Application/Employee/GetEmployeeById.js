"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmployeeById = void 0;
class GetEmployeeById {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetEmployeeById = GetEmployeeById;
