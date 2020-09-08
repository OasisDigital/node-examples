import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from '../customers/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  orderItems: OrderItem[];

  @ManyToOne(() => Customer, { eager: true })
  customer: Customer;

  constructor(
    date: Date,
    orderItems: OrderItem[],
    customer: Customer
  ) {
    this.date = date;
    this.orderItems = orderItems;
    this.customer = customer;
  }
}
