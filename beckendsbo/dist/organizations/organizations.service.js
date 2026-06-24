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
    async findOne(id) {
        return this.prisma.organization.findUnique({
            where: { id },
            include: {
                owner: true,
            },
        });
    }
    async getMembers(organizationId) {
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
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map