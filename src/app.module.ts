import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LlamaModule } from './api/llama/llama.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { validation } from './utils/validation';
import { HelloModule } from './api/v1/hello/hello.module';
import { Hello2Module } from './api/hello2/hello2.module';
import { Hello3Module } from './api/hello3/hello3.module';

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
    Hello2Module,
    Hello3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
