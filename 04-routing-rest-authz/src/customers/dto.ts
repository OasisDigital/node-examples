export class CreateCustomerDto {
  constructor(public name: string) {}
}

export class UpdateCustomerDto extends CreateCustomerDto {}
