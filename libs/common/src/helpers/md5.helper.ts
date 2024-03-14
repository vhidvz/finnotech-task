import * as CryptoJS from 'crypto-js';

export class MD5 {
  static hash(text: string): string {
    return CryptoJS.MD5(text).toString();
  }
}
