import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    getMe(req: any): Promise<({
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
