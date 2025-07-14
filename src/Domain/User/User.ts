export class User {
  constructor(public readonly id: string, public name: string, public email: string) {}

  changeName(newName: string): void {
    this.name = newName;
  }
}