import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

export const customerEntities = [Customer];

@Module({
  imports: [TypeOrmModule.forFeature(customerEntities)],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
