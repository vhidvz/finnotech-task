import { MYSQL_CONFIG } from '@app/common/configs';
import { Module } from '@nestjs/common';

import { MysqlModule } from './mysql';
import { DatabaseService } from './database.service';

@Module({
  imports: [MysqlModule.register(MYSQL_CONFIG())],
  providers: [DatabaseService],
})
export class DatabaseModule {}
