import { Injectable, Logger } from '@nestjs/common';
import { HelloResponse } from './dto/hello.response';

@Injectable()
export class HelloService {
  private readonly logger = new Logger(HelloService.name);

  getHello(): HelloResponse {
    this.logger.log('Say hello!');
    return { message: 'Hello World from HelloService!' };
  }
}
