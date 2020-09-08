import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../customers/customer.entity';
import { Donut } from '../donuts/donut.entity';

import { CreateOrderDto } from './dto';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order | undefined> {
    return this.ordersRepository.findOne(id);
  }

  async create(orderDto: CreateOrderDto): Promise<Order> {
    const orderItems: OrderItem[] = orderDto.orderItems.map(
      (item) =>
        new OrderItem({ id: item.donutId } as Donut, item.quantity)
    );
    const order = new Order(new Date(), orderItems, {
      id: orderDto.customerId,
    } as Customer);
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    if (order) {
      order.orderItems.forEach(async (item) => {
        if (item.id) {
          await this.orderItemsRepository.delete(item.id);
        }
      });
      await this.ordersRepository.delete(id);
    }
  }

  /**
   * This query returns the full Order with all OrderItems
   * for any Order containing at least one OrderItem with
   * a matching donut id
   * @param donutId
   */
  async findFullOrdersContainingDonut(
    donutId: number
  ): Promise<Order[]> {
    const orderItems = await this.orderItemsRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.donut', 'donut')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.donut', 'orderItemDonut')
      .leftJoinAndSelect('order.customer', 'customer')
      .where('orderItem.donut.id = :id', { id: donutId })
      .getMany();
    return orderItems
      .map((item) => item.order)
      .filter((order) => !!order) as Order[];
  }

  /**
   * This query returns all Orders containing an OrderItem with a matching Donut Id,
   * but it does not show all OrderItems for each Order.
   * OrderItems for other Donuts get filtered out.
   * @param donutId
   */
  async findOrdersForDonut(donutId: number): Promise<Order[]> {
    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.donut', 'orderItemDonut')
      .leftJoinAndSelect('order.customer', 'customer')
      .where('orderItems.donut.id = :id', { id: donutId })
      .getMany();
  }
}
