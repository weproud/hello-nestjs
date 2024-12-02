import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GuardService } from './guard.service';

@Controller('api/v1/guards')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Get('/anonymous')
  async getAnonymous(): Promise<string> {
    return await this.guardService.anomymous();
  }

  @UseGuards(AuthGuard)
  @Get('/auth')
  async getAuth(): Promise<string> {
    return await this.guardService.auth();
  }
}
