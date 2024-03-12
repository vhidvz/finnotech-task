import { FindManyOptions } from 'typeorm';

import { Core, Entity } from '../interfaces';
import { Repository } from './repository.class';

export class CategoriesService<T extends Entity<Core>> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: any) {
    return this.repository.create(entity);
  }

  async find(filter: FindManyOptions<any>) {
    return this.repository.find(filter);
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async update(id: string, entity: any) {
    return this.repository.update(id, entity);
  }
}
