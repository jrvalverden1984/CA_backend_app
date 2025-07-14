export class Department {
  constructor(
    public DepartmentID: number,
    public Description: string
  ) {}

  // Puedes agregar lógica de dominio aquí
  public updateDescription(newDescription: string): void {
    if (!newDescription || newDescription.trim() === '') {
      throw new Error('Description cannot be empty')
    }
    this.Description = newDescription.trim()
  }
}

