import { Status } from '@app/common/enums';

import { Core, Dto } from '../common';

export interface User extends Core {
  status: Status;

  email?: string;
  password?: string;
}

// ----------------------------------------
// Data Object Model Interface
// ----------------------------------------

export type UserDto = Dto<User>;
