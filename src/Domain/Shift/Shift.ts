export class Shift {
  constructor(
    public ShiftID: number,
    public Description: string,
    public Start: Date,
    public RangeStartIn: Date,
    public RangeStartOut: Date,
    public End: Date,
    public RangeEndIn: Date,
    public RangeEndOut: Date
  ) {}

  updateDescription(desc: string) {
    if (!desc.trim()) throw new Error('Description cannot be empty')
    this.Description = desc.trim()
  }
}
