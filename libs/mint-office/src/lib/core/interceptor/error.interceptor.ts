import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse,
    HttpEvent,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../meta-reducer/index';
import { Observable, throwError } from 'rxjs';
import { addGlobalError } from '../+state/errors.actions';
import { ErrorHandlingService } from '../services/error-handling.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<fromApp.AppState>,
        private errorHandling: ErrorHandlingService,
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.store.dispatch(addGlobalError(error));

                this.errorHandling.GenericError(error);

                return throwError(error);
            }),
        );
    }
}
