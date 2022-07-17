import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const docFile = readFileSync('./doc/api.yaml', 'utf-8');
  SwaggerModule.setup('doc', app, parse(docFile));

  await app.listen(process.env.PORT);
}
bootstrap();
