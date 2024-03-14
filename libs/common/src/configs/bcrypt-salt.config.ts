export function BCRYPT_SALT() {
  return process.env.BCRYPT_SALT || 10;
}
