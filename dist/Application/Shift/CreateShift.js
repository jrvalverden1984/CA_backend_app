"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShift = void 0;
class CreateShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(data) {
        return this.repo.create(data);
    }
}
exports.CreateShift = CreateShift;
//# sourceMappingURL=CreateShift.js.map