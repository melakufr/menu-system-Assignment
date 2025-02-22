if (!process.env.IS_TS_NODE) {//require only in dev mode
  require('module-alias/register');
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use app.module.ts / pino logger
  app.useLogger(app.get(Logger));

  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
