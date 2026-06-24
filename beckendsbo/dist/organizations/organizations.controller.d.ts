import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(req: any, dto: CreateOrganizationDto): Promise<{
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
    findMyOrganizations(req: any): Promise<({
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
}
