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
exports.InvitesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvitesService = class InvitesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateInvite(token) {
        const invite = await this.prisma.invite.findUnique({
            where: {
                token,
            },
            include: {
                organization: true,
            },
        });
        if (!invite) {
            throw new common_1.NotFoundException('Invite tidak ditemukan');
        }
        if (invite.expiredAt <
            new Date()) {
            throw new common_1.BadRequestException('Invite expired');
        }
        return invite;
    }
    async join(token, userId) {
        const invite = await this.prisma.invite.findUnique({
            where: {
                token,
            },
        });
        if (!invite) {
            throw new common_1.NotFoundException('Invite tidak ditemukan');
        }
        if (invite.status !== 'PENDING') {
            throw new common_1.BadRequestException('Invite sudah tidak valid');
        }
        if (invite.expiredAt < new Date()) {
            throw new common_1.BadRequestException('Invite sudah expired');
        }
        const memberRole = await this.prisma.role.findFirst({
            where: {
                organizationId: invite.organizationId,
                name: 'MEMBER',
            },
        });
        const existingMembership = await this.prisma.membership.findFirst({
            where: {
                userId,
                organizationId: invite.organizationId,
            },
        });
        if (existingMembership) {
            throw new common_1.BadRequestException('User sudah menjadi anggota');
        }
        if (!memberRole) {
            throw new common_1.NotFoundException('Role MEMBER tidak ditemukan');
        }
        const membership = await this.prisma.membership.create({
            data: {
                userId,
                organizationId: invite.organizationId,
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
    findMyInvites(userEmail) {
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
};
exports.InvitesService = InvitesService;
exports.InvitesService = InvitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvitesService);
//# sourceMappingURL=invites.service.js.map