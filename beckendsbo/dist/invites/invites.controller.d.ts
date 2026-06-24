import { InvitesService } from './invites.service';
export declare class InvitesController {
    private readonly invitesService;
    constructor(invitesService: InvitesService);
    validate(token: string): Promise<{
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
    join(token: string, req: any): Promise<{
        id: string;
        organizationId: string;
        joinedAt: Date;
        userId: string;
        roleId: string;
    }>;
    getMyInvites(req: any): import("@prisma/client").Prisma.PrismaPromise<({
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
