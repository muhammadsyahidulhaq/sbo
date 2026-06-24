import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { v4 as uuid } from 'uuid';
import { randomUUID } from 'crypto';
@Injectable()
export class OrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
  userId: string,
  dto: CreateOrganizationDto,
) {
  return this.prisma.$transaction(
    async (tx) => {
      const organization =
        await tx.organization.create({
          data: {
            name: dto.name,
            description: dto.description,
            ownerId: userId,
          },
        });

      const ownerRole =
        await tx.role.create({
          data: {
            organizationId: organization.id,
            name: 'OWNER',
            description:
              'Pemilik organisasi',
          },
        });

      await tx.role.createMany({
        data: [
          {
            organizationId:
              organization.id,
            name: 'ADMIN',
            description:
              'Administrator organisasi',
          },
          {
            organizationId:
              organization.id,
            name: 'MEMBER',
            description:
              'Anggota organisasi',
          },
        ],
      });
      
      await tx.membership.create({
        data: {
          userId,
          organizationId:
            organization.id,
          roleId: ownerRole.id,
        },
      });

      return organization;
    },
  );
}

  async findAll() {
    return this.prisma.organization.findMany({
      include: {
        owner: true,
      },
    });
  }

  async findMyOrganizations(
  userId: string,
) {
  return this.prisma.membership.findMany({
    where: {
      userId,
    },
    include: {
      organization: true,
      role: true,
    },
  });
}

async getMembers(
  organizationId: string,
) {
  return this.prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
      role: true,
    },
  });
}



async createInvite(
    organizationId: string,
    userId: string,
    email: string,
  ) {
    return this.prisma.invite.create({
      data: {
        organizationId,
        createdById: userId,
        email: email.toLowerCase(),

        token: randomUUID(),
        status: 'PENDING',

        expiredAt: new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        ),
      },
    });
  }


async getRoles(
  organizationId: string,
) {
  return this.prisma.role.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

async findOne(id: string) {
  return this.prisma.organization.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
async acceptInvite(inviteId: string, userId: string) {
  // 1. ambil invite
  const invite = await this.prisma.invite.findUnique({
    where: { id: inviteId },
  });

  if (!invite) {
    throw new Error('Invite tidak ditemukan');
  }

  if (invite.status !== 'PENDING') {
    throw new Error('Invite sudah digunakan');
  }

  // 2. cari role MEMBER di organization ini
  const role = await this.prisma.role.findFirst({
    where: {
      organizationId: invite.organizationId,
      name: 'MEMBER',
    },
  });

  if (!role) {
    throw new Error('Role MEMBER tidak ditemukan');
  }

  // 3. buat membership
  await this.prisma.membership.create({
    data: {
      userId,
      organizationId: invite.organizationId,
      roleId: role.id, // ✅ FIX UTAMA
    },
  });

  // 4. update invite
  await this.prisma.invite.update({
    where: { id: inviteId },
    data: {
      status: 'USED',
    },
  });

  return {
    message: 'Berhasil join organisasi',
  };
}
}