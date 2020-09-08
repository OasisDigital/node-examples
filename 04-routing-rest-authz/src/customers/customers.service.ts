import {
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(id: number): Promise<Customer | undefined> {
    return this.customersRepository.findOne(id);
  }

  async create(customerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer(customerDto.name);
    return this.customersRepository.save(customer);
  }

  async update(
    id: number,
    customerDto: UpdateCustomerDto
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException();
    }
    customer.name = customerDto.name;
    return this.customersRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.customersRepository.delete(
      id
    );
    console.log(result);
  }
}
