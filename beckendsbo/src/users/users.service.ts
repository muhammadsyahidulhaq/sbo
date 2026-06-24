import { Get, Injectable, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
    include: {
      memberships: {
        include: {
          organization: {
            include: {
              memberships: {
                include: {
                  user: true,
                  role: true,
                },
              },
            },
          },
          role: true,
        },
      },
    },
  });
}

  async create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  @Get('me')
async getMe(@Req() req: any) {
  const userId = req.user.userId;

  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    include: {
      memberships: true,
    },
  });

  return user;
}
}