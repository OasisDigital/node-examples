import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Donut } from '../donuts/donut.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order?: Order;

  @ManyToOne(() => Donut, { eager: true })
  donut: Donut;

  @Column()
  quantity: number;

  constructor(donut: Donut, quantity: number) {
    this.donut = donut;
    this.quantity = quantity;
  }
}
