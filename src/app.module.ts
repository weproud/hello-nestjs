import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { GuardModule } from './api/v1/guard/guard.module';
import { HelloModule } from './api/v1/hello/hello.module';
import { OllamaModule } from './api/v1/ollama/ollama.module';
import { UserModule } from './api/v1/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { validation } from './utils/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
      validationSchema: validation,
      cache: true,
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('hello-nestjs', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    BatchModule,
    HelloModule,
    UserModule,
    GuardModule,
    OllamaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
