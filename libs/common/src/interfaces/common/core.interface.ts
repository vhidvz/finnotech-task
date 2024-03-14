import { Serializer } from './serializer.interface';
import { Entity } from './entity.interface';
import { Dto } from './dto.interface';

export interface Core {
  id: string;

  created_at: Date;
  updated_at?: Date;

  tags?: string[];
  description?: string;

  rand: string;
  timestamp: string;
}

export type CoreDto = Dto<Core>;
export type CoreEntity = Entity<Core>;
export type CoreSerializer = Serializer<Core>;
