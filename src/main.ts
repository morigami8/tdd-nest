import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './infrastructure/ common/filter/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adaptorHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(adaptorHost, new LoggerService()),
  );

  await app.listen(3000);
}
bootstrap();
