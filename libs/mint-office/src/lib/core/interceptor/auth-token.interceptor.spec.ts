import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthTokenInterceptor } from './auth-token.interceptor';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from '../services/auth.service';

import { Environment } from '../models/environment.model';
import { IthmReportService } from '../services/ithm-report.service';

const mockData = {
  "grantType": "password",
  "username": "test1",
  "password": "testpassword"
}

describe('AuthTokenInterceptor', () => {
  let service: IthmReportService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }


  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthTokenInterceptor,
          IthmReportService,
          Actions,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true,
          },
          {
            provide: 'environment', useValue: environment
          }
        ],
        imports: [
          HttpClientTestingModule,
          StoreModule.forRoot({})
        ]
    });
    service = TestBed.get(IthmReportService);
    httpMock = TestBed.get(HttpTestingController);
  });

 

  it('should be created', () => {
    const interceptor: AuthTokenInterceptor = TestBed.inject(AuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  // it('should add an Authorization header', () => {
  //   service.getViolationReport().subscribe(response => {
  //     console.log('response ', response);
  //     expect(response).toBeTruthy();
  //   });
  
  //   const httpRequest = httpMock.expectOne(`${environment.apiUrl}authenticate/admin/report/violations`);
    
  //   expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  // });

  it('intercept: when no error, then subscribe returns successfully', () => {
    const testData = mockData;

    const token = "auth_token";
  
    service.getViolationReport().subscribe(
      (data) => {
        expect(data).toBeTruthy()
      },
      (error) => {
        console.log(error);
        fail('error should not have been called');
      }
    );
  
    const req = httpMock.expectOne(`${environment.apiUrl}authenticate/admin/report/violations`);

    req.flush(testData, {
      status: 200,
      statusText: 'OK',
      headers: new HttpHeaders()
        .set('Authorization','Bearer '+ token)
        .set('content-type', 'application/json')
    });
  });
});
