import { UserEntity } from '@app/common/interfaces';
import { Status } from '@app/common/enums';
import { Column, Entity } from 'typeorm';

import { Core } from '../common';

@Entity('users')
export class User extends Core implements UserEntity {
  @Column({ default: Status.Inactive })
  status?: Status;

  @Column()
  email: string;

  @Column()
  password: string;
}
