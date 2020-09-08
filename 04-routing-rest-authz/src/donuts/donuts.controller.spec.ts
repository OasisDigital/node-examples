import { Test, TestingModule } from '@nestjs/testing';
import { DonutsController } from './donuts.controller';
import { DonutsService } from './donuts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Donut } from './donut.entity';
import { Repository } from 'typeorm';

describe('Donuts Controller', () => {
  let controller: DonutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonutsService,
        {
          provide: getRepositoryToken(Donut),
          useClass: Repository,
        },
      ],
      controllers: [DonutsController],
    }).compile();

    controller = module.get<DonutsController>(DonutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
