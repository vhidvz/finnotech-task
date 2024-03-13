import { Repository as RepositoryInterface } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from '@app/common/classes';
import { Injectable } from '@nestjs/common';

import { User } from './entities';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(@InjectRepository(User) readonly model: RepositoryInterface<User>) {
    super(model);
  }
}
