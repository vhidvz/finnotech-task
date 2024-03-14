import { DEFAULT_RAND_CODE_LENGTH, ROOT_EMAIL, ROOT_PASS, ROOT_USER_ID } from '@app/common/consts';
import { User } from '@app/common/interfaces';
import { Bcrypt } from '@app/common/helpers';
import { Status } from '@app/common/enums';
import { code } from '@app/common/utils';

export const users: User[] = [
  {
    id: ROOT_USER_ID,
    status: Status.Active,
    email: ROOT_EMAIL,
    password: Bcrypt.hash(ROOT_PASS),
    rand: String(code(DEFAULT_RAND_CODE_LENGTH)),
    timestamp: String(Date.now()),
    created_at: new Date(),
  },
];
