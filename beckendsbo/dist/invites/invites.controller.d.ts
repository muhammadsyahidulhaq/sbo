import { InvitesService } from './invites.service';
export declare class InvitesController {
    private readonly invitesService;
    constructor(invitesService: InvitesService);
    getMyInvites(req: any): import("@prisma/client").Prisma.PrismaPromise<({
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
    validate(token: string): Promise<{
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
    join(token: string, req: any): Promise<{
        id: string;
        userId: string;
        organizationId: string;
        roleId: string;
        joinedAt: Date;
    }>;
}
