import { PrismaService } from '../prisma/prisma.service';
export declare class InvitesService {
    private prisma;
    constructor(prisma: PrismaService);
    validateInvite(token: string): Promise<{
        organization: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            logoUrl: string | null;
            ownerId: string;
        };
    } & {
        id: string;
        email: string;
        createdAt: Date;
        organizationId: string;
        token: string;
        status: import("@prisma/client").$Enums.InviteStatus;
        expiredAt: Date;
        createdById: string;
    }>;
    join(token: string, userId: string): Promise<{
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    }>;
    findMyInvites(userEmail: string): import("@prisma/client").Prisma.PrismaPromise<({
        organization: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            logoUrl: string | null;
            ownerId: string;
        };
    } & {
        id: string;
        email: string;
        createdAt: Date;
        organizationId: string;
        token: string;
        status: import("@prisma/client").$Enums.InviteStatus;
        expiredAt: Date;
        createdById: string;
    })[]>;
}
