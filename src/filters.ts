import { Logger } from './logger/logger.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception, host: ArgumentsHost) {
    const { getRequest, getResponse } = host.switchToHttp();

    const { method, originalUrl } = getRequest();
    const response = getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()['message']
        : 'Internal server error';

    const errorLog =
      `${new Date().toLocaleString()} ` +
      `${statusCode} ` +
      `${method} ` +
      `${originalUrl} ` +
      `error: ${JSON.stringify({ statusCode, message })}`;

    this.logger.error(errorLog, HttpExceptionFilter.name);

    response.status(statusCode).json({ statusCode, message });
  }
}
