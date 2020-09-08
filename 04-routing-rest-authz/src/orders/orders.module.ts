import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

export const orderEntities = [Order, OrderItem];

@Module({
  imports: [TypeOrmModule.forFeature(orderEntities)],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
