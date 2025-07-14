export class Holiday {
  constructor(
    public HolidayID: number,
    public Description: string,
    public StartDate: Date
  ) {}

  updateDescription(newDesc: string) {
    if (!newDesc.trim()) throw new Error('Description cannot be empty')
    this.Description = newDesc.trim()
  }

  updateStartDate(newDate: Date) {
    this.StartDate = newDate
  }
}
