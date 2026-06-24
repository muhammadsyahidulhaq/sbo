import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvitesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async validateInvite(
    token: string,
  ) {
    const invite =
      await this.prisma.invite.findUnique({
        where: {
          token,
        },
        include: {
          organization: true,
        },
      });

    if (!invite) {
      throw new NotFoundException(
        'Invite tidak ditemukan',
      );
    }

    if (
      invite.expiredAt <
      new Date()
    ) {
      throw new BadRequestException(
        'Invite expired',
      );
    }

    return invite;
  }

  async join(
  token: string,
  userId: string,
) {
  const invite =
    await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });

    if (!invite) {
  throw new NotFoundException(
    'Invite tidak ditemukan',
  );
}

if (invite.status !== 'PENDING') {
  throw new BadRequestException(
    'Invite sudah tidak valid',
  );
}

if (invite.expiredAt < new Date()) {
  throw new BadRequestException(
    'Invite sudah expired',
  );
}
  

  const memberRole =
    await this.prisma.role.findFirst({
      where: {
        organizationId:
          invite.organizationId,
        name: 'MEMBER',
      },
    });
    const existingMembership =
  await this.prisma.membership.findFirst({
    where: {
      userId,
      organizationId:
        invite.organizationId,
    },
  });

if (existingMembership) {
  throw new BadRequestException(
    'User sudah menjadi anggota',
  );
}
  if (!memberRole) {
    throw new NotFoundException(
      'Role MEMBER tidak ditemukan',
    );
  }

  const membership =
    await this.prisma.membership.create({
      data: {
        userId,
        organizationId:
          invite.organizationId,
        roleId: memberRole.id,
      },
    });

  await this.prisma.invite.update({
    where: {
      id: invite.id,
    },
    data: {
      status: 'USED',
    },
  });

  return membership;
}

findMyInvites(userEmail: string) {
  return this.prisma.invite.findMany({
    where: {
      email: userEmail,
      status: 'PENDING',
    },
    include: {
      organization: true,
    },
  });
}
}