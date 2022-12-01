import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  warn(context, message): void {
    super.warn(`[WARN] ${context} - ${message} `);
  }
  log(context: string, message: string): void {
    super.log(`[INFO] ${context} - ${message} `);
  }
  debug(context: string, message: string): void {
    console.log(`[DEBUG] ${context} - ${message} `);
  }
  error(context: string, message: string, trace: string): void {
    console.log(`[ERROR] ${message}`, context, trace);
  }
}
