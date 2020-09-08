import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { User } from './user.entity';
import { Role } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleAuthGuard } from '../auth/roles/role-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSvc: UsersService) {}

  // Unguarded so we can easily create a user in case we accidentally delete them all
  @Post()
  createOrder(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersSvc.create(createUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Role('admin')
  removeOrder(@Param('id') id: number): Promise<void> {
    return this.usersSvc.remove(id);
  }
}
