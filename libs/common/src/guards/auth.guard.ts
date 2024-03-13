import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { toKebabCase } from 'naming-conventions-modeler';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AES } from '../helpers';
import { JwtToken } from '../interfaces';
import { IS_PUBLIC } from '../metadatas';
import { AuthProvider } from '../providers';
import { date, getRequest, logger } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly log = logger(AuthGuard.name);

  constructor(
    private auth: AuthProvider,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) return true;

    const req = getRequest<{
      ip: string;
      token: JwtToken;
      query: { token?: string };
      headers: Record<string, string>;
    }>(context);

    req.token = await this.decrypt(req.headers, req.query);

    this.log.get(toKebabCase(this.canActivate.name)).info(date(`authentication token data is %j`), req.token);

    return true;
  }

  async decrypt(headers: Record<string, any>, query: { token?: string }) {
    const token = query.token || headers.authorization?.split(/\s+/g).pop();
    return await this.auth.authentication.verify({ token }, headers);
  }
}
