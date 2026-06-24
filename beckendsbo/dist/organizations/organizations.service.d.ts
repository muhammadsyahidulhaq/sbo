import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
export declare class OrganizationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrganizationDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    findAll(): Promise<({
        owner: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    })[]>;
    findMyOrganizations(userId: string): Promise<({
        organization: {
            id: string;
            name: string;
            description: string | null;
            logoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        };
        role: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
        };
    } & {
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        owner: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }) | null>;
    getMembers(organizationId: string): Promise<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            avatarUrl: string | null;
        };
        role: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
        };
    } & {
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    })[]>;
}
