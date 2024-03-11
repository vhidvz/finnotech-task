import { ExecutionContext } from '@nestjs/common';

export function getRequest<T = any>(context: ExecutionContext): T {
  const type = context.getType();

  switch (type) {
    case 'http': {
      return context.switchToHttp().getRequest();
    }
    default:
      throw new Error('Unknown context type');
  }
}

export function getResponse<T = any>(context: ExecutionContext): T {
  const type = context.getType();

  switch (type) {
    case 'http': {
      return context.switchToHttp().getResponse();
    }
    default:
      throw new Error('Unknown context type');
  }
}
