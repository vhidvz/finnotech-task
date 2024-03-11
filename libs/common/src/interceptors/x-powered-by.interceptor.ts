import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { Response } from 'express';

import { getResponse } from '../utils';

@Injectable()
export class XPoweredByInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();
    if (!['graphql', 'http'].includes(type)) throw new Error('Unknown powered by interceptor context type');

    const res = getResponse<Response>(context);

    /**
     * Author: Vahid V. <vhid.vz@gmail.com>
     *
     * Wenex is the skeleton of a well-structured general-purpose platform
     * with a microservice design that brings new technologies to improve
     * your enterprise and team to be as fast and efficient as possible,
     * the platform is empowered through an SDK.
     *
     * Ref: https://github.com/wenex-org
     */
    res.setHeader('X-Powered-By', 'wenex');

    return next.handle();
  }
}
