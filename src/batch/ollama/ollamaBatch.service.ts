import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OllamaService } from 'src/api/v1/ollama/ollama.service';

@Injectable()
export class OllamaBatchService {
  private readonly logger = new Logger(OllamaBatchService.name);

  constructor(private readonly ollamaService: OllamaService) {}

  @Cron('0 */2 * * * *', {
    name: 'ollama-batch-job',
    timeZone: 'Asia/Seoul',
  })
  async handleCron() {
    this.logger.debug('handleCron');
    const response = await this.ollamaService.generate({
      prompt: '강아지가 먹이를 먹는다.',
    });

    console.log(response);
  }
}
