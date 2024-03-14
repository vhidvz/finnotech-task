import { IsOptional, IsString, MinLength } from 'class-validator';
import { Optional, UserDto } from '@app/common/interfaces';
import { PASS_MIN_LENGTH } from '@app/common/consts';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Status } from '@app/common/enums';

import { UpdateCore } from '../common';

@Exclude()
export class UpdateUser extends UpdateCore implements Optional<UserDto> {
  @ApiHideProperty()
  status?: Status;

  @ApiHideProperty()
  email?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MinLength(PASS_MIN_LENGTH)
  password?: string;
}
