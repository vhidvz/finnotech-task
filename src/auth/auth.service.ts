import { Injectable } from '@nestjs/common';
import { logger } from '@app/common/utils';
import { RedisService } from '@app/redis';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly log = logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
}
