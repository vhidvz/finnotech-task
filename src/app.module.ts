import { REDIS_CONFIG, SENTRY_CONFIG } from '@app/common/configs';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { HealthModule } from '@app/health';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HealthModule.forRoot(['disk', 'memory', 'mysql', 'redis']),
    RedisModule.forRoot(REDIS_CONFIG()),
    SentryModule.forRoot(SENTRY_CONFIG()),
  ],
})
export class AppModule {}
