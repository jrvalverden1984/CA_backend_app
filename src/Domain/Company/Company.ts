export class Company {
  constructor(
    public CompanyID: number,
    public Ruc: string,
    public Name: string,
    public ConnectionString: string
  ) {}

  public updateConnectionString(newConnectionString: string): void {
    if (!newConnectionString || newConnectionString.trim() === '') {
      throw new Error('Connection string cannot be empty')
    }
    this.ConnectionString = newConnectionString.trim()
  }

  public updateRuc(newRuc: string): void {
    if (!newRuc || newRuc.trim() === '') {
      throw new Error('Ruc cannot be empty')
    }
    this.Ruc = newRuc.trim()
  }

  public updateName(newName: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Name cannot be empty')
    }
    this.Name = newName.trim()
  }
  
}
