import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donut } from './donut.entity';

import { DonutsController } from './donuts.controller';
import { DonutsService } from './donuts.service';

export const donutEntities = [Donut];

@Module({
  imports: [TypeOrmModule.forFeature(donutEntities)],
  controllers: [DonutsController],
  providers: [DonutsService],
})
export class DonutsModule {}
