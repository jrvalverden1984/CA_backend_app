"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holiday = void 0;
class Holiday {
    constructor(HolidayID, Description, StartDate) {
        this.HolidayID = HolidayID;
        this.Description = Description;
        this.StartDate = StartDate;
    }
    updateDescription(newDesc) {
        if (!newDesc.trim())
            throw new Error('Description cannot be empty');
        this.Description = newDesc.trim();
    }
    updateStartDate(newDate) {
        this.StartDate = newDate;
    }
}
exports.Holiday = Holiday;
//# sourceMappingURL=Holiday.js.map