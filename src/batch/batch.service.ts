import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'batch-job',
    timeZone: 'Asia/Seoul',
  })
  handleCron() {
    console.log('Called when the current second is 10');
  }
}
