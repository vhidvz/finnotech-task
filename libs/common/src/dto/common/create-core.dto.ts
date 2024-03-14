import { IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CoreDto } from '@app/common/interfaces';

@Exclude()
export class CreateCore implements CoreDto {
  @ApiHideProperty()
  id?: string;

  @ApiHideProperty()
  created_at?: Date;

  @ApiHideProperty()
  updated_at?: Date;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiHideProperty()
  rand?: string;

  @ApiHideProperty()
  timestamp?: string;
}
