import { HttpClient, HttpErrorResponse, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling/error-handling.service';

import { ErrorInterceptor } from './error.interceptor';

export class MockErrorHandlingService {
    GenericError() {
        return true;
    }
}

const next: any = {
    handle: () => {
      return Observable.create(subscriber => {
        subscriber.complete();
      });
    }
  };

describe('ErrorInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [  ErrorInterceptor,
            { provide: ErrorHandlingService, useClass: MockErrorHandlingService },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi: true,
              },
           
          ],
          imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({})
          ]
      });
      httpMock = TestBed.inject(HttpTestingController);  
      httpClient = TestBed.inject(HttpClient);
    });

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    const requestMock = new HttpRequest('GET', '/api');
    const errorResponse = new HttpErrorResponse({
        error: '404 error',
        status: 404, statusText: 'Not Found'
      });
    httpClient.get('/api').subscribe();
    const request = httpMock.expectOne("/api");
    request.error(new ErrorEvent('404 Error'), errorResponse);
    interceptor.intercept(requestMock,next);
    expect(interceptor).toBeTruthy();
  });
});

