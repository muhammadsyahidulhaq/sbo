export declare class UsersService {
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
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
}
