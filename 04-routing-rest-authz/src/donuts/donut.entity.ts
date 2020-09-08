import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from '../orders/order-item.entity';

@Entity()
export class Donut {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // orderItems won't be loaded unless specified in the query
  // https://typeorm.io/#/relations-faq/how-to-load-relations-in-entities
  @OneToMany(() => OrderItem, (orderItem) => orderItem.donut)
  orderItems?: OrderItem[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
