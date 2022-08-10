import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger();
  logger.setContext(bootstrap.name);

  process.on('uncaughtException', (err: Error) => {
    const log = `${new Date().toLocaleString()} Uncaught exception: ${JSON.stringify(
      err.stack || err,
    )}`;

    logger.warn(log, bootstrap.name);
  });

  process.on('unhandledRejection', (err: Error) => {
    const log = `${new Date().toLocaleString()} Unhandled rejection: ${JSON.stringify(
      err.stack || err,
    )}`;

    logger.warn(log, bootstrap.name);
  });

  const docFile = readFileSync('./doc/api.yaml', 'utf-8');
  SwaggerModule.setup('doc', app, parse(docFile));

  await app.listen(process.env.APP_PORT);
}
bootstrap();
