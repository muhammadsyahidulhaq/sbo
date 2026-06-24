import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    [x: string]: any;
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
    getMe(userId: string): Promise<({
        memberships: ({
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
                        description: string | null;
                        organizationId: string;
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
