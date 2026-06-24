import { PrismaService } from '../prisma/prisma.service';
export declare class InvitesService {
    private prisma;
    constructor(prisma: PrismaService);
    validateInvite(token: string): Promise<{
        organization: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            logoUrl: string | null;
            ownerId: string;
            updatedAt: Date;
        };
    } & {
        id: string;
        token: string;
        organizationId: string;
        createdById: string;
        email: string;
        status: import("@prisma/client").$Enums.InviteStatus;
        expiredAt: Date;
        createdAt: Date;
    }>;
    join(token: string, userId: string): Promise<{
        id: string;
        organizationId: string;
        joinedAt: Date;
        userId: string;
        roleId: string;
    }>;
    findMyInvites(userEmail: string): import("@prisma/client").Prisma.PrismaPromise<({
        organization: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            logoUrl: string | null;
            ownerId: string;
            updatedAt: Date;
        };
    } & {
        id: string;
        token: string;
        organizationId: string;
        createdById: string;
        email: string;
        status: import("@prisma/client").$Enums.InviteStatus;
        expiredAt: Date;
        createdAt: Date;
    })[]>;
}
