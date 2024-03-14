import { Serializer, User } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { Status } from '@app/common/enums';

import { CoreSerializer } from '../common';

@Exclude()
export class UserSerializer extends CoreSerializer implements Serializer<User> {
  @Expose()
  status: Status;

  @Expose()
  email: string;

  @Expose()
  password: string;
}
