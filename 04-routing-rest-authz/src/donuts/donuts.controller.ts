import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Donut } from './donut.entity';
import { DonutsService } from './donuts.service';
import { CreateDonutDto, UpdateDonutDto } from './dto';

@Controller('donuts')
export class DonutsController {
  constructor(private readonly donutsSvc: DonutsService) {}

  @Post()
  createDonut(
    @Body() createDonutDto: CreateDonutDto
  ): Promise<Donut> {
    return this.donutsSvc.create(createDonutDto);
  }

  @Put(':id')
  updateDonut(
    @Param('id') id: number,
    @Body() updateDonutDto: UpdateDonutDto
  ): Promise<Donut> {
    return this.donutsSvc.update(id, updateDonutDto);
  }

  @Get()
  listDonuts(): Promise<Donut[]> {
    return this.donutsSvc.findAll();
  }

  @Get(':id')
  getDonut(@Param('id') id: number): Promise<Donut | undefined> {
    return this.donutsSvc.findOne(id);
  }

  @Delete(':id')
  removeDonut(@Param('id') id: number): Promise<void> {
    return this.donutsSvc.remove(id);
  }
}
