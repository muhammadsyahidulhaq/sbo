import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { InvitesService } from './invites.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')

@ApiTags('Invites')
@Controller('invites')
export class InvitesController {
  constructor(
    private readonly invitesService: InvitesService,
  ) {}

@UseGuards(JwtAuthGuard)
   @Get('my')
getMyInvites(@Req() req: any) {
  return this.invitesService.findMyInvites(
    req.user.email,
  );
}
@UseGuards(JwtAuthGuard)
  @Get(':token')
  validate(
    @Param('token') token: string,
  ) {
    return this.invitesService.validateInvite(
      token,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post(':token/join')
  join(
    @Param('token') token: string,
    @Req() req: any,
  ) {
    return this.invitesService.join(
      token,
      req.user.userId,
    );
  }
 


}