import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

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

async findOne(id: string) {
  return this.prisma.organization.findUnique({
    where: { id },
    include: {
      owner: true,
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
      user: true,
      role: true,
    },
  });
}
}