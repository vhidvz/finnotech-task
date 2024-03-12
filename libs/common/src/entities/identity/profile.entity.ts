import { Entity as EntityInterface, Profile as ProfileInterface } from '@app/common/interfaces';
import { Gender, ProfileType, State } from '@app/common/enums';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '../common';

@Entity('profiles')
export class Profile extends CoreEntity implements EntityInterface<ProfileInterface> {
  @Column()
  type: ProfileType;

  @Column({ default: State.Pending })
  state: State;

  @Column({ default: Gender.Unknown })
  gender: Gender;

  @Column()
  nickname?: string;

  @Column()
  last_name?: string;

  @Column()
  first_name?: string;

  @Column()
  verified_at?: Date;
}
