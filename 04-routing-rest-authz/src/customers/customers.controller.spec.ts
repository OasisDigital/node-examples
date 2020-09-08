import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Customers Controller', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
      controllers: [CustomersController],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
