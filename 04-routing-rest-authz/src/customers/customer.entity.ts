import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  // orderItems won't be loaded unless specified in the query
  // https://typeorm.io/#/relations-faq/how-to-load-relations-in-entities
  @OneToMany(() => Order, (order) => order.customer)
  orders?: Order[];

  constructor(name: string) {
    this.name = name;
  }
}
