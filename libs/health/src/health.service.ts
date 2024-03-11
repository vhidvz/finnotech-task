import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions,
  TypeOrmHealthIndicator,
  TypeOrmPingCheckSettings,
} from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { HEALTH_CHECK_OPTIONS } from './health.const';
import { Check, HealthCheckOptions } from './health.type';
import { REDIS_CONFIG } from '@app/common/configs';

@Injectable()
export class HealthService {
  constructor(
    private readonly diskIndicator: DiskHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
    private readonly typeOrmIndicator: TypeOrmHealthIndicator,

    @Inject(HEALTH_CHECK_OPTIONS)
    protected readonly healthCheckOptions: HealthCheckOptions,

    private readonly microIndicator: MicroserviceHealthIndicator,
  ) {}

  // Public Methods

  public check() {
    const indicators = [];

    ['disk', 'memory', 'mysql', 'redis'].forEach((check: Check) => {
      const exists = this.exists(check);

      if (exists) {
        if (typeof exists === 'string') {
          indicators.push(this[`${check}Status`]());
        } else {
          indicators.push(this[`${check}Status`](exists.key, exists.options as never));
        }
      }
    });

    return indicators.flat();
  }

  // Protected Methods

  protected mysqlStatus(key = 'mysql', options?: TypeOrmPingCheckSettings) {
    return () => this.typeOrmIndicator.pingCheck(key, options);
  }

  protected memoryStatus(key = 'memory', options = 300 * 1024 * 1024) {
    return [
      () => this.memoryIndicator.checkRSS(`${key}_rss`, options),
      () => this.memoryIndicator.checkHeap(`${key}_heap`, options),
    ];
  }

  protected diskStatus(key = 'disk', options = { thresholdPercent: 0.75, path: '/' }) {
    return () => this.diskIndicator.checkStorage(key, options);
  }

  protected redisStatus(
    key = 'redis',
    options: MicroserviceHealthIndicatorOptions<RedisOptions>['options'] = REDIS_CONFIG(),
  ) {
    return () =>
      this.microIndicator.pingCheck<RedisOptions>(key, {
        transport: Transport.REDIS,
        options,
      });
  }

  // Private Methods

  private exists(check: Check) {
    if (!this.healthCheckOptions?.length) return false;

    for (const option of this.healthCheckOptions) {
      if (typeof option === 'string') {
        if (option === check) return option;
      } else {
        for (const key of Object.keys(option)) {
          if (key === check) return option[key];
        }
      }
    }

    return false;
  }
}
