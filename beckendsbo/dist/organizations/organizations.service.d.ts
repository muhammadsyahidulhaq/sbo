import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
export declare class OrganizationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrganizationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logoUrl: string | null;
        ownerId: string;
    }>;
    findAll(): Promise<({
        owner: {
            id: string;
            email: string;
            name: string;
            password: string;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logoUrl: string | null;
        ownerId: string;
    })[]>;
    findMyOrganizations(userId: string): Promise<({
        organization: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            logoUrl: string | null;
            ownerId: string;
        };
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            organizationId: string;
        };
    } & {
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    })[]>;
    getMembers(organizationId: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            avatarUrl: string | null;
        };
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            organizationId: string;
        };
    } & {
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    })[]>;
    createInvite(organizationId: string, userId: string, email: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        organizationId: string;
        token: string;
        status: import("@prisma/client").$Enums.InviteStatus;
        expiredAt: Date;
        createdById: string;
    }>;
    getRoles(organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        organizationId: string;
    }[]>;
    findOne(id: string): Promise<({
        owner: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logoUrl: string | null;
        ownerId: string;
    }) | null>;
    acceptInvite(inviteId: string, userId: string): Promise<{
        message: string;
    }>;
}
