import { CoreSerializer as CoreSerializerInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CoreSerializer implements CoreSerializerInterface {
  @Expose()
  id: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at?: Date;

  @Expose()
  tags?: string[];

  @Expose()
  description?: string;

  @Expose()
  rand: string;

  @Expose()
  timestamp: string;
}
