import { FindManyOptions, FindOptionsWhere, Repository as RepositoryInterface } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Core, Entity } from '../interfaces';

export class Repository<T extends Entity<Core>> {
  constructor(readonly model: RepositoryInterface<T>) {}

  async create(entity: T) {
    return this.model.save(entity);
  }

  async update(id: string, entity: QueryDeepPartialEntity<T>) {
    return this.model.update(id, entity);
  }

  async find(filter: FindManyOptions<T>) {
    return this.model.find(filter);
  }

  async findOne(id: string) {
    return this.model.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async delete(id: string) {
    return this.model.delete(id);
  }
}
