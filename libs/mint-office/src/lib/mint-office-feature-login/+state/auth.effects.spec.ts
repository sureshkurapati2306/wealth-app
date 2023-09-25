import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable, of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';
import { AuthService } from '../../core/services/auth.service';

import { AuthEffects } from './auth.effects';

import * as authReducer from './auth.reducer';

import * as Actions from '../+state/auth.actions';


class mockAuthService {
  login() { /* mock */ }
  logout() {/*mock*/ }
  delSession() {/*mock*/ }
}

const mockData: any = {
  "grantType": "password",
  "username": "test1",
  "password": "testpassword"
}

const mockLogout = {
  logout: {
    "cifNumber": "988923",
    "clientId": "8678",
    "clientIdType": "Test1"
  },
  audit: {
    "clientId": "8678",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1"
  }
}

const mockState: authReducer.State = {
  userDetail: mockData,
  authData: null,
  loggedIn: true,
  logout: null,
  authKey: null,
  errorMessage: ''
}

const sessionId = 12345;

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;
  let httpClient: HttpClient;
  let store: MockStore<any>;
  let authService: AuthService;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState: mockState }),
        { provide: 'environment', useValue: environment },
        {
          provide: AuthService, useClass: mockAuthService
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    httpClient = TestBed.inject(HttpClient);

    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should do a success login', (done) => {
    const spy = jest.spyOn(authService, 'login').mockReturnValue(of(mockData));

    actions = of(Actions.authStart({
      data: {
        "grantType": "password",
        "username": "test1",
        "password": "testpassword",
        "authenticationId": 'test'
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.login$
      .subscribe(action => {
        expect(action).toEqual(Actions.loginSuccess({
          authData: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should do a failure login', (done) => {

    const spy = jest.spyOn(authService, 'login').mockReturnValue(throwError('Mock error'));

    // create an actions stream and immediately dispatch a POST action
    actions = of(Actions.authStart({
      data: {
        "grantType": "password",
        "username": "test1",
        "password": "testpassword",
        "authenticationId": 'test'
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.login$
      .subscribe(action => {
        expect(action).toEqual(Actions.loginFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });

  });

  it('should do a success logout', (done) => {
    const spy = jest.spyOn(authService, 'logout').mockReturnValue(of(mockLogout));

    actions = of(Actions.loadLogout({
      logout: mockLogout
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.logout$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadLogoutSuccess({
          logout: mockLogout
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should do a failure logout', (done) => {

    const spy = jest.spyOn(authService, 'logout').mockReturnValue(throwError('Mock error'));

    // create an actions stream and immediately dispatch a POST action
    actions = of(Actions.loadLogout({
      logout: mockLogout
    }));


    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.logout$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadLogoutFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });

  });

  it('should do a success delete session', (done) => {
    const spy = jest.spyOn(authService, 'delSession').mockReturnValue(of(sessionId));

    actions = of(Actions.delSession({
      sessionId: sessionId
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.delSession$
      .subscribe(action => {
        expect(action).toEqual(Actions.delSessionSuccess({
          success: sessionId
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should do a failure delete session', (done) => {

    const spy = jest.spyOn(authService, 'delSession').mockReturnValue(throwError('Mock error'));

    // create an actions stream and immediately dispatch a POST action
    actions = of(Actions.delSession({
      sessionId: sessionId
    }));


    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.delSession$
      .subscribe(action => {
        expect(action).toEqual(Actions.delSessionFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });

  });
});
