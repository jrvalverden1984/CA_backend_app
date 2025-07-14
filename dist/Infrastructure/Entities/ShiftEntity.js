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
exports.ShiftEntity = void 0;
const typeorm_1 = require("typeorm");
let ShiftEntity = class ShiftEntity {
};
exports.ShiftEntity = ShiftEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ShiftID' }),
    __metadata("design:type", Number)
], ShiftEntity.prototype, "ShiftID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 180 }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "Start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "RangeStartIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "RangeStartOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "End", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "RangeEndIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ShiftEntity.prototype, "RangeEndOut", void 0);
exports.ShiftEntity = ShiftEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Shift', schema: 'Payroll' })
], ShiftEntity);
