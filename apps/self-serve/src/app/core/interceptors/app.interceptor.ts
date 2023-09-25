import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../state/reducers/';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  constructor( private store: Store<fromApp.AppState>) {}

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('authReducer').pipe(
      take(1),
      map(authState => {
        return authState.token;
      }),
      exhaustMap(token => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization','Bearer '+ token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
