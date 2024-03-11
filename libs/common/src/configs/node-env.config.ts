export function NODE_ENV(env = 'development') {
  env = (process.env.NODE_ENV || env).toLowerCase();

  return {
    IS_DEV: env.startsWith('dev'),
    IS_TEST: env.startsWith('test'),
    IS_PROD: env.startsWith('prod'),
  };
}
