import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GuardService } from './guard.service';

@Controller('api/v1/guards')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Get('/anonymous')
  getAnonymous(): Promise<string> {
    return this.guardService.anonymous();
  }

  @UseGuards(AuthGuard)
  @Get('/auth')
  getAuth(): Promise<string> {
    return this.guardService.auth();
  }
}
