import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HelloResponse } from './dto/hello.response';
import { HelloService } from './hello.service';

@ApiTags('Hello API')
@Controller('api/v1/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @ApiOperation({ summary: 'Hello 생성 API', description: 'Hello를 생성한다.' })
  @ApiCreatedResponse({ description: 'Hello를 생성한다.', type: HelloResponse })
  @Get()
  getHello(): HelloResponse {
    return this.helloService.getHello();
  }
}
