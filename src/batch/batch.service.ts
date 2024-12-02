import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'batch-job',
    timeZone: 'Asia/Seoul',
  })
  handleCron() {
    this.logger.debug('Called when the current second is 10');
  }
}
