"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShema1719100000000 = void 0;
class CreateShema1719100000000 {
    async up(qr) {
        await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`);
    }
    async down(qr) {
        await qr.query(`select 'NO SE PUEDE ELIMINAR EL SHEMA'`);
    }
}
exports.CreateShema1719100000000 = CreateShema1719100000000;
