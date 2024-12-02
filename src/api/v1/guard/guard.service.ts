import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardService {
  async anomymous(): Promise<string> {
    return 'Anomymous';
  }

  async auth(): Promise<string> {
    return 'Auth';
  }
}
