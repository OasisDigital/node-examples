import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersSvc: CustomersService) {}

  @Post()
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    return this.customersSvc.create(createCustomerDto);
  }

  @Put(':id')
  updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    return this.customersSvc.update(id, updateCustomerDto);
  }

  @Get()
  listCustomers(): Promise<Customer[]> {
    return this.customersSvc.findAll();
  }

  @Get(':id')
  getCustomer(
    @Param('id') id: number
  ): Promise<Customer | undefined> {
    return this.customersSvc.findOne(id);
  }

  @Delete(':id')
  removeCustomer(@Param('id') id: number): Promise<void> {
    return this.customersSvc.remove(id);
  }
}
