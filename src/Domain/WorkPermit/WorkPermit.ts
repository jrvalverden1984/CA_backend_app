export class WorkPermit {
  constructor(
    public WorkPermitID: number,
    public Description: string,
    public EmployeeID: number,
    public MotivePermitID: number,
    public StartDate: Date,
    public EndDate: Date
  ) {}
}
