import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserWithoutPassword } from 'src/users/user.entity';

import { jwtConstants } from './constants';
import { JwtPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserWithoutPassword> {
    // Passport first verifies the JWT's signature and decodes the JSON, so we
    // don't have the opportunity to botch that part.
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
