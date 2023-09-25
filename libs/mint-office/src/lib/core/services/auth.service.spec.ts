import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Environment } from '../models/environment.model';

import { AuthService } from './auth.service';

const mockData = {
  "grantType": "password",
  "username": "test1",
  "password": "testpassword"
}

const logoutData = {
  "logout": {
    "cifNumber": "988923",
    "clientId": "8678",
    "clientIdType": "Test1"
  },
  "audit": {
    "clientId": "8678",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1"
  }
}
const sessionId = 12345;

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'environment', useValue: environment
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login() success path', (done) => {

    jest.spyOn(httpClient, 'post').mockReturnValue(of(
      {
        "grantType": "password",
        "username": "test1",
        "password": "testpassword"
      }
    ));

    service.login(mockData).subscribe(data =>{
      console.log('data ', data);
      expect(data).toEqual(mockData);
      done();
    });

  });

  it('should call login() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.login(mockData)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

  it('should call logout() success path', (done) => {

    jest.spyOn(httpClient, 'post').mockReturnValue(of(
      logoutData
    ));

    service.logout(logoutData).subscribe(data =>{
      expect(data).toEqual(logoutData);
      done();
    });

  });

  it('should call logout() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.logout(logoutData)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

  it('should call delSession() success path', (done) => {

    jest.spyOn(httpClient, 'delete').mockReturnValue(of(
      sessionId
    ));

    service.delSession(sessionId).subscribe(data =>{
      expect(data).toEqual(sessionId);
      done();
    });

  });

  it('should call delSession() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(errorResponse));

    service.delSession(sessionId)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });
});
