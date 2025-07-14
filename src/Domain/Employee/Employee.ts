export class Employee {
  constructor(
    public EmployeeID: number,
    public IdentificationNumber: string,
    public FirstName: string,
    public LastName: string,
    public DepartmentID: number,
    public JobRoleID: number,
    public CostCenterID: number,
    public ScheduleID: number,
    public HireDate: Date,
    public Overtime: boolean,
    public Salary: number,
    public IsActive: boolean,
    public Photo: Buffer | null            // opcional
  ) {}

  fullName() {
    return `${this.FirstName} ${this.LastName}`
  }
}
