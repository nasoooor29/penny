/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import session from 'express-session';
import { env } from '@penny/shared-validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.use(
    session({
      secret: env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 8 hours
        maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
        secure: false, // Set to true if using HTTPS
      },
    })
  );

  app.enableCors({
    origin: '*', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
  });
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose', 'fatal']);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
