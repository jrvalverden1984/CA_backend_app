"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shift = void 0;
class Shift {
    constructor(ShiftID, Description, Start, RangeStartIn, RangeStartOut, End, RangeEndIn, RangeEndOut) {
        this.ShiftID = ShiftID;
        this.Description = Description;
        this.Start = Start;
        this.RangeStartIn = RangeStartIn;
        this.RangeStartOut = RangeStartOut;
        this.End = End;
        this.RangeEndIn = RangeEndIn;
        this.RangeEndOut = RangeEndOut;
    }
    updateDescription(desc) {
        if (!desc.trim())
            throw new Error('Description cannot be empty');
        this.Description = desc.trim();
    }
}
exports.Shift = Shift;
//# sourceMappingURL=Shift.js.map