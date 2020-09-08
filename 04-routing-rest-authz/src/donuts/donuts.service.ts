import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Donut } from './donut.entity';
import { CreateDonutDto, UpdateDonutDto } from './dto';

@Injectable()
export class DonutsService {
  constructor(
    @InjectRepository(Donut)
    private donutsRepository: Repository<Donut>
  ) {}

  findAll(): Promise<Donut[]> {
    return this.donutsRepository.find();
  }

  findOne(id: number): Promise<Donut | undefined> {
    return this.donutsRepository.findOne(id);
  }

  async create(donutDto: CreateDonutDto): Promise<Donut> {
    const donut = new Donut(donutDto.name, donutDto.description);
    return this.donutsRepository.save(donut);
  }

  async update(id: number, donutDto: UpdateDonutDto): Promise<Donut> {
    const donut = await this.findOne(id);
    if (!donut) {
      throw new NotFoundException();
    }
    donut.name = donutDto.name;
    donut.description = donutDto.description;
    return this.donutsRepository.save(donut);
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.donutsRepository.delete(
      id
    );
    console.log(result);
  }
}
