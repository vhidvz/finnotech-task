import { MakeOptional } from './generic.interface';

export type Dto<
  T extends {
    id?: string;

    created_at?: Date;

    rand?: string;
    timestamp?: string;
  },
> = MakeOptional<T, 'id' | 'created_at' | 'rand' | 'timestamp'>;
