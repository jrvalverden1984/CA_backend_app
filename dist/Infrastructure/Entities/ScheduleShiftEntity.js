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
exports.ScheduleShiftEntity = void 0;
const typeorm_1 = require("typeorm");
const ScheduleEntity_1 = require("./ScheduleEntity");
const ShiftEntity_1 = require("./ShiftEntity");
let ScheduleShiftEntity = class ScheduleShiftEntity {
};
exports.ScheduleShiftEntity = ScheduleShiftEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ScheduleShiftID' }),
    __metadata("design:type", Number)
], ScheduleShiftEntity.prototype, "ScheduleShiftID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ScheduleShiftEntity.prototype, "ScheduleID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ScheduleShiftEntity.prototype, "ShiftID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ScheduleEntity_1.ScheduleEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ScheduleID', referencedColumnName: 'ScheduleID', foreignKeyConstraintName: 'FK_ScheduleShift' }),
    __metadata("design:type", ScheduleEntity_1.ScheduleEntity)
], ScheduleShiftEntity.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ShiftEntity_1.ShiftEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ShiftID', referencedColumnName: 'ShiftID', foreignKeyConstraintName: 'FK_ScheduleShift_1' }),
    __metadata("design:type", ShiftEntity_1.ShiftEntity)
], ScheduleShiftEntity.prototype, "shift", void 0);
exports.ScheduleShiftEntity = ScheduleShiftEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ScheduleShift', schema: 'Payroll' })
], ScheduleShiftEntity);
//# sourceMappingURL=ScheduleShiftEntity.js.map