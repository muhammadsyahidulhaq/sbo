import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = []; // 🔥 FIX UTAMA

  async create(data: Omit<User, 'id'>) {
    const user: User = {
      id: randomUUID(),
      ...data,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }
}