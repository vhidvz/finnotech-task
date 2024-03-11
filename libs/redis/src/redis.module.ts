import type { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';

import { REDIS_OPTIONS } from './redis.const';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
