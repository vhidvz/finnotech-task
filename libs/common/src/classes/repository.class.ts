import { FindManyOptions, FindOptionsWhere, Repository as RepositoryInterface } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Core, Entity } from '../interfaces';

export class Repository<T extends Entity<Core>> {
  constructor(private readonly entity: RepositoryInterface<T>) {}

  async create(entity: T) {
    return this.entity.save(entity);
  }

  async update(id: string, entity: QueryDeepPartialEntity<T>) {
    return this.entity.update(id, entity);
  }

  async find(filter: FindManyOptions<T>) {
    return this.entity.find(filter);
  }

  async findOne(id: string) {
    return this.entity.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async delete(id: string) {
    return this.entity.delete(id);
  }
}
