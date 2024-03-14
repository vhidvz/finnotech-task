import { MakeRequired } from './generic.interface';

export type Serializer<
  T extends {
    id?: string;

    created_at?: Date;

    rand?: string;
    timestamp?: string;
  },
> = MakeRequired<T, 'id' | 'created_at' | 'rand' | 'timestamp'>;
