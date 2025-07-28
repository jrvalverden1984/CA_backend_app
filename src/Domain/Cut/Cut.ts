export class Cut {
  constructor(
    public CutID: number,
    public Description: string,
    public StartDate: Date,
    public EndDate: Date,
    public IsModifiable: boolean
  ) {}
}
