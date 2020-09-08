import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleAuthGuard } from '../auth/roles/role-auth.guard';
import { Role } from '../auth/roles/role.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersSvc: OrdersService) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<Order> {
    return this.ordersSvc.create(createOrderDto);
  }

  @Get()
  listOrders(): Promise<Order[]> {
    return this.ordersSvc.findAll();
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<Order | undefined> {
    return this.ordersSvc.findOne(id);
  }

  @Delete(':id')
  @UseGuards(RoleAuthGuard)
  @Role('admin')
  removeOrder(@Param('id') id: number): Promise<void> {
    return this.ordersSvc.remove(id);
  }

  @Get('donut/:donutId')
  getOrdersForDonut(
    @Param('donutId') donutId: number,
    @Query('showAll') showFullOrder: string
  ): Promise<Order[] | undefined> {
    return showFullOrder === 'true'
      ? this.ordersSvc.findFullOrdersContainingDonut(donutId)
      : this.ordersSvc.findOrdersForDonut(donutId);
  }
}
