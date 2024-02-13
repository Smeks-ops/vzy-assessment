import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as NestLogger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: process.env.CORS_WHITELIST?.split(',') || '*',
    exposedHeaders: ['Authorization'],
  });

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('VZY assessment API server')
    .setDescription('VZY assessment API server documentation')
    .setVersion('2.0')
    .addTag('VZY assessment API server')
    .addBearerAuth()
    .build();

  const port = process.env.PORT || 3000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(port, '0.0.0.0', () => {
    const logger = new NestLogger();
    logger.log(`Server is running on port ${port}`);
  });

  // Handling unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.log(err);
    // Sentry.captureException(err);
  });
}
bootstrap();
