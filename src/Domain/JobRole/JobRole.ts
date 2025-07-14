export class JobRole {
  constructor(
    public JobRoleID: number,
    public Description: string
  ) {}

  public updateDescription(newDescription: string): void {
    if (!newDescription || newDescription.trim() === '') {
      throw new Error('Description cannot be empty')
    }
    this.Description = newDescription.trim()
  }
}
