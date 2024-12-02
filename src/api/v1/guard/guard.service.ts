import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardService {
  async anonymous(): Promise<string> {
    return 'Anonymous';
  }

  async auth(): Promise<string> {
    return 'Auth';
  }
}
