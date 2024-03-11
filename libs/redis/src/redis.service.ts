import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

import { REDIS_OPTIONS } from './redis.const';

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject(REDIS_OPTIONS) options: RedisOptions) {
    super(options);
  }
}
