import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LlamaModule } from './api/llama/llama.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { validation } from './utils/validation';
import { HelloModule } from './api/hello/hello.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validation,
      cache: true,
    }),
    LlamaModule,
    HelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
