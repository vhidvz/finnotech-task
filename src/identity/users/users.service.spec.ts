import { DatabaseModule, DatabaseService } from '@app/command/database';
import { NODE_ENV, MYSQL_CONFIG } from '@app/common/configs';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from './entities';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let entity: User;
  let dataSource: DataSource;
  let service: UsersService;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          entities: [User],
          ...MYSQL_CONFIG(),
          synchronize: !NODE_ENV().IS_PROD,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersRepository, UsersService],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    await databaseService.clean();
    await databaseService.seed();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    expect(dataSource).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('should create a new entity', async () => {
    const result = await service.create({ name: 'unit test' });
    expect(result).toStrictEqual(
      expect.objectContaining({
        data: {
          id: expect.any(String),
          name: 'unit test',
        },
      }),
    );

    entity = result.data;
  });

  it('should update an entity', async () => {
    const result = await service.update(entity.id, { name: 'updated' });
    expect(result.data.affected).toBe(1);
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result.data.length).toBeGreaterThan(0);
  });

  it('should return one category', async () => {
    const result = await service.findOne(entity.id);
    expect(result).toStrictEqual(
      expect.objectContaining({
        data: {
          id: expect.any(String),
          name: 'updated',
        },
      }),
    );
  });

  it('should delete one category', async () => {
    const result = await service.delete(entity.id);
    expect(result.data.affected).toBe(1);
  });

  afterAll(async () => {
    await dataSource.destroy();

    await databaseService.clean();
    await databaseService.seed();
    await databaseService.mysqlService.dataSource.destroy();
  });
});
