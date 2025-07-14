"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1752171467960 = void 0;
class CreateUsers1752171467960 {
    constructor() {
        this.name = 'CreateUsers1752171467960';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUsers1752171467960 = CreateUsers1752171467960;
