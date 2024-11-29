import { Injectable } from '@nestjs/common';
import { HelloResponse } from './dto/hello.response';

@Injectable()
export class HelloService {
  getHello(): HelloResponse {
    return { message: 'Hello World from HelloService!' };
  }
}
