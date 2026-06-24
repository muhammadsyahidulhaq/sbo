import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<({
        memberships: ({
            role: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                organizationId: string;
                description: string | null;
            };
            organization: {
                memberships: ({
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        password: string;
                        avatarUrl: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    role: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        organizationId: string;
                        description: string | null;
                    };
                } & {
                    id: string;
                    userId: string;
                    organizationId: string;
                    roleId: string;
                    joinedAt: Date;
                })[];
            } & {
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
            userId: string;
            organizationId: string;
            roleId: string;
            joinedAt: Date;
        })[];
    } & {
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMe(req: any): Promise<({
        memberships: {
            id: string;
            userId: string;
            organizationId: string;
            roleId: string;
            joinedAt: Date;
        }[];
    } & {
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
