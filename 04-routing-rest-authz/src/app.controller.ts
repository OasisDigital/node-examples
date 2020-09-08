import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService, LoginSuccess } from './auth/auth.service';
import { User } from './users/user.entity';

interface RequestWithUserAdded extends Request {
  user: User;
}

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  healthCheck(): string {
    return 'Donut Shop is open';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() req: RequestWithUserAdded
  ): Promise<LoginSuccess> {
    if (!req.user) {
      throw new BadRequestException();
    }
    return this.authService.login(req.user);
  }
}
