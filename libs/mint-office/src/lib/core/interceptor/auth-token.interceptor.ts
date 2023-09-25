import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../meta-reducer/index'
import { getToken } from '../../mint-office-feature-login/+state/auth.selectors';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select(getToken).pipe(
            take(1),
            map(token => {
                return token;
            }),
            exhaustMap((token: any) => {
              if (!token) {
                return next.handle(req);
              }
              const modifiedReq = req.clone({
                headers: new HttpHeaders()
                .set('Authorization','Bearer '+ token)
              });
              return next.handle(modifiedReq);
            })
          );
    }
}
