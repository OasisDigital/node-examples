import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User, UserWithoutPassword } from '../users/user.entity';
import { JwtPayload } from './types';

export interface LoginSuccess {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Check user credentials against database and return user info (or null if unauthorized)
  async validateUser(
    username: string,
    pass: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.checkUserValidToLogIn(
      username,
      pass
    );
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfoWithoutPassword } = user;
      return userInfoWithoutPassword;
    }
    return null;
  }

  async login(user: User): Promise<LoginSuccess> {
    if (!user.id) {
      throw new Error('user is missing id');
    }
    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
      sub: user.id, // JWT "subject"
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
