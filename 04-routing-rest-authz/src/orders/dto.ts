export class CreateOrderItemDto {
  constructor(public donutId: number, public quantity: number) {}
}

export class CreateOrderDto {
  constructor(
    public customerId: number,
    public orderItems: CreateOrderItemDto[]
  ) {}
}
