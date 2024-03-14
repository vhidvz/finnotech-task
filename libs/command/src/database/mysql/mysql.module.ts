import { MYSQL_CONFIG, NODE_ENV } from '@app/common/configs';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { MysqlService } from './mysql.service';

@Module({})
export class MysqlModule {
  static register(options: ReturnType<typeof MYSQL_CONFIG>): DynamicModule {
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRoot({
          ...options,
          type: 'mysql',
          synchronize: !NODE_ENV().IS_PROD,
          entities: [join(__dirname, '../../../../../**/*.entity.ts')],
        }),
      ],
      providers: [MysqlService],
      exports: [MysqlService],
    };
  }
}
