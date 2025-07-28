"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCenter = void 0;
class CostCenter {
    constructor(CostCenterID, Description) {
        this.CostCenterID = CostCenterID;
        this.Description = Description;
    }
    updateDescription(newDescription) {
        if (!newDescription || newDescription.trim() === '') {
            throw new Error('Description cannot be empty');
        }
        this.Description = newDescription.trim();
    }
}
exports.CostCenter = CostCenter;
//# sourceMappingURL=CostCenter.js.map