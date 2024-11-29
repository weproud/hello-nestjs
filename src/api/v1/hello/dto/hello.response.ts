import { ApiProperty } from '@nestjs/swagger';

export class HelloResponse {
  @ApiProperty({
    description: 'Hello World from HelloService!',
  })
  message: string;
}
