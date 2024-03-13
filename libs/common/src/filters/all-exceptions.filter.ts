import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { NODE_ENV } from '../configs';
import { date, logger, toJSON } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly log = logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const type = host.getType();

    this.log
      .get(this.catch.name)
      .error(
        date(`exception type ${type} occurred with error %j`),
        exception?.['message'] ? exception.message : exception,
      );

    this.log
      .get(this.catch.name)
      .debug(
        date(`exception type ${type} occurred with stack %j`),
        exception?.['stack'] ? exception.stack : exception,
      );

    switch (type) {
      case 'http': {
        const res = host.switchToHttp().getResponse();

        const details = toJSON(exception?.details ?? exception.message);
        const status =
          exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const data = details?.data ?? exception;
        const name = details?.name ?? exception?.name;
        const stack = details?.stack ?? exception?.stack;
        const message = details?.message ?? exception?.message;

        return !!res
          .status(details?.status ?? status)
          .json(NODE_ENV().IS_DEV ? { name, message, stack, data } : { name, message })
          .end();
      }
      default:
        throw new Error('Unknown exception filter context type');
    }
  }
}
