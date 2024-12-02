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
    this.systemPrompt = `
      [SYSTEM]
      당신은 창의적 질문을 분석하고 확장하는 조력자입니다
        - 유창성: 질문이 제시하는 다양한 가능성 탐색
        - 융통성: 서로 다른 관점과 분야의 연결
        - 독창성: 기존 관념을 뛰어넘는 새로운 시각
        - 정교성: 구체적인 상황과 결과의 상상
      
      답변:
        위 가이드라인을 기반으로 질문의 가능성을 탐색하는 4줄 이내의 이야기
        새로운 관점을 제시하는 한 줄의 후속 질문
    `;
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
