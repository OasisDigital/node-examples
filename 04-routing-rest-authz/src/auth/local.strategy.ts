import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserWithoutPassword } from '../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // Extend a PassportStrategy, then implement validate().
  async validate(
    username: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.authService.validateUser(
      username,
      password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
