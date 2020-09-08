import { Test, TestingModule } from '@nestjs/testing';
import { DonutsService } from './donuts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Donut } from './donut.entity';
import { Repository } from 'typeorm';

describe('DonutsService', () => {
  let service: DonutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonutsService,
        {
          provide: getRepositoryToken(Donut),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DonutsService>(DonutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
