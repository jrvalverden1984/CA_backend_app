"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor() {
        this.users = new Map();
    }
    async findById(id) {
        return this.users.get(id) || null;
    }
    async save(user) {
        this.users.set(user.id, user);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
