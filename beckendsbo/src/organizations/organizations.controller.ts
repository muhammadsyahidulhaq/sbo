import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
} from '@nestjs/swagger';

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
@Post()
create(
  @Req() req: any,
  @Body() dto: CreateOrganizationDto,
) {
  return this.organizationsService.create(
    req.user.userId,
    dto,
  );
}
@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
@Get('my')
findMyOrganizations(
  @Req() req: any,
) {
  return this.organizationsService
    .findMyOrganizations(
      req.user.userId,
    );
}


@UseGuards(JwtAuthGuard)
@Get(':id/members')
getMembers(
  @Param('id') id: string,
) {
  return this.organizationsService.getMembers(
    id,
  );
}

@UseGuards(JwtAuthGuard)
@Post(':id/invites')
createInvite(
  @Param('id') organizationId: string,
  @Req() req: any,
  @Body() body: { email: string },
) {
  return this.organizationsService.createInvite(
    organizationId,
    req.user.userId,
    body.email,
  );
}


@UseGuards(JwtAuthGuard)
@Get(':id/roles')
getRoles(
  @Param('id') id: string,
) {
  return this.organizationsService.getRoles(
    id,
  );
}
@UseGuards(JwtAuthGuard)
@Post('invites/:id/accept')
acceptInvite(
  @Param('id') inviteId: string,
  @Req() req: any,
) {
  return this.organizationsService.acceptInvite(
    inviteId,
    req.user.userId,
  );
}
@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(
  @Param('id') id: string,
) {
  return this.organizationsService.findOne(id);
}
}