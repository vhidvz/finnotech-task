import { DEFAULT_RAND_CODE_LENGTH } from '@app/common/consts';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from '@app/common/interfaces';
import { code } from '@app/common/utils';

export class Core implements CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ default: () => new Date() })
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column({ array: true })
  tags?: string[];

  @Column()
  description?: string;

  @Column({ default: () => code(DEFAULT_RAND_CODE_LENGTH) })
  rand?: string;

  @Column({ default: () => String(Date.now()) })
  timestamp?: string;
}
