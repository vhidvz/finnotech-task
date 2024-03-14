import { DynamicModule, Module } from '@nestjs/common';
import { MYSQL_CONFIG } from '@app/common/configs';
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
          entities: [join(__dirname, '../../../common/entities/**/*.entity.ts')],
        }),
      ],
      providers: [MysqlService],
      exports: [MysqlService],
    };
  }
}
