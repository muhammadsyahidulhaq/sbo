import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ) {
    const hashedPassword =
      await bcrypt.hash(password, 10);

    return this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login(
    email: string,
    password: string,
  ) {
    const user =
      await this.usersService.findByEmail(
        email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'User tidak ditemukan',
      );
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!valid) {
      throw new UnauthorizedException(
        'Password salah',
      );
    }

    return {
      access_token:
        this.jwtService.sign({
          sub: user.id,
          email: user.email,
        }),
    };
  }
    async me(userId: string) {
    return this.usersService.findById(userId);
  }
}