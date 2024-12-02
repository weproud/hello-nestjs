import * as moment from 'moment-timezone';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;
const dailyOptions = {
  level: 'http',
  datePattern: 'YYYY-MM-DD',
  dirname: __dirname + '/../../logs', //저장할 URL
  filename: `app.%DATE%.log`,
  maxFiles: 30, //30일치 로그파일 저장
  zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  colorize: false,
  handleExceptions: true,
  json: false,
};

// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      // production 환경이라면 http, 개발환경이라면 모든 단계를 로그
      format:
        env === 'production'
          ? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
            winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('hellonestjs', {
                prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
              }),
            ),
    }),

    // info, warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: moment.tz('Asia/Seoul').format().toString(),
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${info.level} [${process.pid}]: ${info.message}`;
    }),
  ),
});
