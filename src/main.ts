/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('log-node')();

import {
  ETagInterceptor,
  NamingConventionsInterceptor,
  XPoweredByInterceptor,
  XRequestIdInterceptor,
} from '@app/common/interceptors';
import { setupSwagger, prototyping } from '@app/common/utils';
import { NODE_ENV } from '@app/common/configs';
import { NestFactory } from '@nestjs/core';
import { initTracing } from 'tracing';
import helmet from 'helmet';

import { AppModule } from './app.module';

prototyping();
async function bootstrap() {
  if (NODE_ENV().IS_PROD) await initTracing();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.getHttpAdapter().getInstance().set('etag', false);

  app.use(helmet({ contentSecurityPolicy: false }));

  app.useGlobalInterceptors(
    new ETagInterceptor(),
    new XPoweredByInterceptor(),
    new XRequestIdInterceptor(),
    new NamingConventionsInterceptor(),
  );

  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);

  const url = await app.getUrl();
  console.log(`Application Started Successfully`);
  console.log(`Swagger UI is running on: ${url}/api`);
  console.log(`Prometheus is running on: ${url}/metrics`);
  console.log(`Health check is running on: ${url}/status`);
  console.log(`OpenApi Spec is running on: ${url}/api-json`);
}
bootstrap();
