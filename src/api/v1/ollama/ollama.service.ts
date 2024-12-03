import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ollama } from 'ollama';
import { OllamaRequest } from './dto/ollama.request';
import { OllamaResponse } from './dto/ollama.response';

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);
  private readonly ollama: Ollama;
  private readonly defaultModel: string;
  private readonly systemPrompt: string;

  constructor(private readonly configService: ConfigService) {
    this.logger.debug('Initializing OllamaService');
    this.ollama = new Ollama({
      host: this.configService.get<string>('OLLAMA_HOST'),
    });

    this.defaultModel =
      'hf.co/Bllossom/llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M';
    this.systemPrompt = `[SYSTEM] 자유롭게 대화를 진행해주세요, 한글로만 답변해주세요`;
  }

  async generate(request: OllamaRequest): Promise<OllamaResponse> {
    try {
      this.logger.debug(`Generating response for prompt: ${request.prompt}`);
      const formattedPrompt = this.formatPrompt(request.prompt);

      const startTime = Date.now();
      const response = await this.ollama.generate({
        model: request.model || this.defaultModel,
        prompt: formattedPrompt,
      });
      const duration = Date.now() - startTime;
      this.logger.debug(`Response generated in ${duration}ms`);

      console.log(response.response);

      return {
        ...response,
        created_at: response.created_at,
        duration_ms: duration,
      };
    } catch (error) {
      this.logger.error('Error generating response:', {
        error: error.message,
        stack: error.stack,
        host: this.configService.get<string>('OLLAMA_HOST'),
        model: request.model || this.defaultModel,
      });
      throw error;
    }
  }

  private formatPrompt(userPrompt: string): string {
    return `${this.systemPrompt}

      [USER]
      ${userPrompt}

      [ASSISTANT]`;
  }
}
