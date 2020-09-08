import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

export const userEntities = [User];

@Module({
  imports: [TypeOrmModule.forFeature(userEntities)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
