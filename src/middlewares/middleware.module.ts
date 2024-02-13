import { MiddlewareConsumer, NestModule } from '@nestjs/common';

export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
