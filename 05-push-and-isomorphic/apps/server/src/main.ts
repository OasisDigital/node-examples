/**
 * Minimal Nest bootstrap process
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening on port ' + port);
  });
}

bootstrap();
