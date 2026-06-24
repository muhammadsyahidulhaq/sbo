"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let OrganizationsService = class OrganizationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const organization = await tx.organization.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    ownerId: userId,
                },
            });
            const ownerRole = await tx.role.create({
                data: {
                    organizationId: organization.id,
                    name: 'OWNER',
                    description: 'Pemilik organisasi',
                },
            });
            await tx.role.createMany({
                data: [
                    {
                        organizationId: organization.id,
                        name: 'ADMIN',
                        description: 'Administrator organisasi',
                    },
                    {
                        organizationId: organization.id,
                        name: 'MEMBER',
                        description: 'Anggota organisasi',
                    },
                ],
            });
            await tx.membership.create({
                data: {
                    userId,
                    organizationId: organization.id,
                    roleId: ownerRole.id,
                },
            });
            return organization;
        });
    }
    async findAll() {
        return this.prisma.organization.findMany({
            include: {
                owner: true,
            },
        });
    }
    async findMyOrganizations(userId) {
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
    async getMembers(organizationId) {
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
    async createInvite(organizationId, userId, email) {
        return this.prisma.invite.create({
            data: {
                organizationId,
                createdById: userId,
                email: email.toLowerCase(),
                token: (0, crypto_1.randomUUID)(),
                status: 'PENDING',
                expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        });
    }
    async getRoles(organizationId) {
        return this.prisma.role.findMany({
            where: {
                organizationId,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    async findOne(id) {
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
    async acceptInvite(inviteId, userId) {
        const invite = await this.prisma.invite.findUnique({
            where: { id: inviteId },
        });
        if (!invite) {
            throw new Error('Invite tidak ditemukan');
        }
        if (invite.status !== 'PENDING') {
            throw new Error('Invite sudah digunakan');
        }
        const role = await this.prisma.role.findFirst({
            where: {
                organizationId: invite.organizationId,
                name: 'MEMBER',
            },
        });
        if (!role) {
            throw new Error('Role MEMBER tidak ditemukan');
        }
        await this.prisma.membership.create({
            data: {
                userId,
                organizationId: invite.organizationId,
                roleId: role.id,
            },
        });
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
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map