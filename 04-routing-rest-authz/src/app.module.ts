import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { DonutsModule, donutEntities } from './donuts/donuts.module';
import { OrdersModule, orderEntities } from './orders/orders.module';
import {
  CustomersModule,
  customerEntities,
} from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule, userEntities } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'donutshop.db',
      entities: [
        ...donutEntities,
        ...orderEntities,
        ...customerEntities,
        ...userEntities,
      ],
      synchronize: true,
    }),
    DonutsModule,
    OrdersModule,
    CustomersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
