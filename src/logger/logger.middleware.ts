import { Request } from 'express';
import { Logger } from './logger.service';
import { Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction) {
    const { method, body, originalUrl, query } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode < HttpStatus.BAD_REQUEST) {
        const log =
          `${new Date().toLocaleString()} ` +
          `${statusCode} ` +
          `${method} ` +
          `${originalUrl} ` +
          `query: ${JSON.stringify(query)} ` +
          `body: ${JSON.stringify(body)} `;

        this.logger.log(log);
      }
    });

    next();
  }
}
