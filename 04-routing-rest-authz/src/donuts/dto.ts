export class CreateDonutDto {
  constructor(public name: string, public description: string) {}
}

export class UpdateDonutDto extends CreateDonutDto {}
