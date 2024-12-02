import { Module } from '@nestjs/common';
import { OllamaModule } from 'src/api/v1/ollama/ollama.module';
import { BatchService } from './batch.service';
import { OllamaBatchService } from './ollama/ollamaBatch.service';

@Module({
  imports: [OllamaModule],
  providers: [BatchService, OllamaBatchService],
  exports: [BatchService, OllamaBatchService],
})
export class BatchModule {}
