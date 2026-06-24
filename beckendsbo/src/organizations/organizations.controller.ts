import {
  Body,
  Controller,
  Get,
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
}