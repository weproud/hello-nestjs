import { Body, Controller, Post } from '@nestjs/common';
import { OllamaRequest } from './dto/ollama.request';
import { OllamaService } from './ollama.service';

@Controller('api/v1/ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post()
  async generate(@Body() request: OllamaRequest) {
    return await this.ollamaService.generate(request);
  }
}
