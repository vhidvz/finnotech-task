import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PASS_MIN_LENGTH } from '@app/common/consts';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { UserDto } from '@app/common/interfaces';
import { Status } from '@app/common/enums';

import { CreateCore } from '../common';

@Exclude()
export class CreateUser extends CreateCore implements UserDto {
  @ApiHideProperty()
  status?: Status;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(PASS_MIN_LENGTH)
  password: string;
}
