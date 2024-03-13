import { Service } from '@app/common/classes';
import { Injectable } from '@nestjs/common';

import { User } from './entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends Service<User> {
  constructor(readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }
}
