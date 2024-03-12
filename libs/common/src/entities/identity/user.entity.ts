import { Entity as EntityInterface, User as UserInterface } from '@app/common/interfaces';
import { Status } from '@app/common/enums';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '../common';

@Entity('users')
export class User extends CoreEntity implements EntityInterface<UserInterface> {
  @Column({ default: Status.Inactive })
  status: Status;

  @Column()
  email?: string;

  @Column()
  password?: string;
}
