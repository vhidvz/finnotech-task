import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Request, Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as etag from 'etag';

import { date, getRequest, getResponse, logger, toString } from '../utils';

@Injectable()
export class ETagInterceptor implements NestInterceptor {
  private readonly log = logger(ETagInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType<GqlContextType>();
    if (!['graphql', 'http'].includes(type)) throw new Error('Unknown etag interceptor context type');

    const req = getRequest<Request>(context);
    const res = getResponse<Response>(context);

    return next.handle().pipe(
      map((data) => {
        if (typeof data !== 'object' || req.method.toUpperCase() !== 'GET') return data;

        const etagVal = etag(toString(data));
        res.setHeader('ETag', etagVal);

        this.log.get(this.intercept.name).info(date('etag with value %s generated'), etagVal);

        if (etagVal && req.header('if-none-match') === etagVal) {
          this.log.get(this.intercept.name).info(date('etag %s matched'), req.header('if-none-match'));

          res.status(HttpStatus.NOT_MODIFIED);
        } else return data;
      }),
    );
  }
}
