"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayEntity = void 0;
const typeorm_1 = require("typeorm");
let HolidayEntity = class HolidayEntity {
};
exports.HolidayEntity = HolidayEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'HolidayID' }),
    __metadata("design:type", Number)
], HolidayEntity.prototype, "HolidayID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 180 }),
    __metadata("design:type", String)
], HolidayEntity.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HolidayEntity.prototype, "StartDate", void 0);
exports.HolidayEntity = HolidayEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Holiday', schema: 'Payroll' })
], HolidayEntity);
