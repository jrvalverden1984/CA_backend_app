export class Schedule {
  constructor(
    public ScheduleID: number,
    public Description: string,
    public ShortName: string,
    public MinuteBeforeInput: number,
    public MinuteAfterOutput: number,
    public MinuteDelay: number,
    public ShiftType: number,
    public MinuteLunch: number,
    public Start: Date,
    public RangeStartIn: Date,
    public RangeStartOut: Date,
    public End: Date,
    public RangeEndIn: Date,
    public RangeEndOut: Date
  ) {}
}
