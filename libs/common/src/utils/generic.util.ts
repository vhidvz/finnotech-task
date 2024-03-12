import { HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';

export const code = (len: number) => {
  if (len < 1) throw new HttpException('length of code cannot be lower than one', HttpStatus.BAD_REQUEST);

  const max = parseInt(`9${'9'.repeat(len - 1)}`, 10);
  const min = parseInt(`1${'0'.repeat(len - 1)}`, 10);

  return crypto.randomInt(min, max);
};
