export class CreateUserDto {
  constructor(
    public username: string,
    public password: string,
    public role?: string
  ) {}
}
