import { ConsoleLogger, Injectable, Scope, LogLevel } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import * as fs from 'fs';

enum LoggerType {
  HTTP_LOG = 'http_log',
  HTTP_ERROR = 'http_error',
  APP_ERROR = 'app_error',
}

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  currentFileName: string | null = null;
  loggerType: LoggerType = LoggerType.HTTP_LOG;
  loggingLevel: number = Number(process.env.LOGGING_LEVEL);

  constructor() {
    super();
  }

  setContext(context: string) {
    super.setContext.apply(this, [context]);

    if (context === LoggerMiddleware.name) {
      this.loggerType = LoggerType.HTTP_LOG;
    } else if (context === 'HttpExceptionFilter') {
      this.loggerType = LoggerType.HTTP_ERROR;
    } else {
      this.loggerType = LoggerType.APP_ERROR;
    }
  }

  log(message: string, context?: string) {
    if (this.loggingLevel > 0) {
      super.log.apply(this, [message, context || this.context]);

      this.addNewLog(message);
    }
  }

  error(message: string, context?: string) {
    if (this.loggingLevel > 1) {
      super.error.apply(this, [message, context || this.context]);

      this.addNewLog(message);
    }
  }

  warn(message: string, context?: string) {
    if (this.loggingLevel > 2) {
      super.warn.apply(this, [message, context || this.context]);

      this.addNewLog(message);
    }
  }

  private writeToFile(log: string, toNewFile = true) {
    if (toNewFile) {
      this.currentFileName = `./logs/${this.loggerType}_${Date.now()}.log`;
    }

    fs.appendFile(this.currentFileName, `${log}\n`, 'utf8', (err) => {
      if (err) {
        super.error.apply(this, [err.message, this.context]);
      }
    });
  }

  private addNewLog(message: string) {
    if (this.currentFileName === null) {
      this.writeToFile(message);
      return;
    }

    fs.stat(this.currentFileName, (err, stats) => {
      if (err) {
        super.error.apply(this, [err.message, this.context]);
        return;
      }

      if (stats.size > Number(process.env.LOGGING_FILE_SIZE)) {
        this.writeToFile(message);
        return;
      }

      this.writeToFile(message, false);
    });
  }
}
