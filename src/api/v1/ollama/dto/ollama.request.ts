import { IsNotEmpty, IsString } from 'class-validator';

export class OllamaRequest {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  model?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
  max_tokens?: number;
}
