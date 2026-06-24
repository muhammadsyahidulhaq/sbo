import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    me(userId: string): Promise<({
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
    }) | null>;
}
