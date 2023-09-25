import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DemoState } from '../state/error/state';
import { Store } from '@ngrx/store';
import { AddGlobalError } from '../state/error/error.action';
import { ErrorHandlingService } from '../services/error-handling/error-handling.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<DemoState>, private errorHandling: ErrorHandlingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                this.store.dispatch(new AddGlobalError(error));
                this.errorHandling.GenericError(error);

                return throwError(error);
            }),
        );
    }
}
