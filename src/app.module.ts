import { REDIS_CONFIG, SENTRY_CONFIG } from '@app/common/configs';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { HealthModule } from '@app/health';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';

import { UsersModule } from './identity';

@Module({
  imports: [
    RedisModule.forRoot(REDIS_CONFIG()),
    SentryModule.forRoot(SENTRY_CONFIG()),
    HealthModule.forRoot(['disk', 'memory', 'mysql', 'redis']),

    ...[UsersModule],
  ],
})
export class AppModule {}
