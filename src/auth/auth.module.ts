import { JWT_SECRET, REDIS_CONFIG, SMTP_CONFIG } from '@app/common/configs';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisModule } from '@app/redis';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfilesModule, UsersModule } from 'src/identity';

@Module({
  imports: [
    RedisModule.forRoot(REDIS_CONFIG()),
    MailerModule.forRoot(SMTP_CONFIG()),
    JwtModule.register({ secret: JWT_SECRET() }),

    ...[UsersModule, ProfilesModule],
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
