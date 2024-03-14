import * as bcrypt from 'bcryptjs';

import { BCRYPT_SALT } from '../configs';

export class Bcrypt {
  static hash(pass: string): string {
    return bcrypt.hashSync(pass, BCRYPT_SALT());
  }

  static compare(pass: string, hash: string): boolean {
    return bcrypt.compareSync(pass, hash);
  }
}
