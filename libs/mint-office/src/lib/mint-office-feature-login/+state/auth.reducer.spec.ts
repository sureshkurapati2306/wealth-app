import { authReducer, initialState, State } from '../+state/auth.reducer';
import * as Actions from '../+state/auth.actions';


const mockData: State = {
    userDetail: {
      "grantType": "password",
      "username": "test1",
      "password": "testpassword",
      "authenticationId": 'test'
    },
    authData: {
      "access_token": "auth_token",
      "expires_in": new Date(300),
      "refresh_token": "auth_token",
      "refresh_expires_in": new Date(1800),
      "token_type": "Bearer",
      "jwt_session": null,
      "module_access": null
    },
    authKey: null,
    logout: {
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
    },
    loggedIn: false,
    errorMessage: ''
}
describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

describe('Auth action', () => {
  it('should start to load data from API', () => {
    const action = Actions.authStart({
      data: mockData.userDetail
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(false);
  });
});

describe('Auth Success action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loginSuccess({
      authData: mockData.authData
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(true);
    expect(result.authData).toEqual(mockData.authData);

  });
});

describe('Auth Failure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loginFailure({
      error: 'The error message'
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(false);
    expect(result.errorMessage).toEqual('The error message');

  });
});

describe('Logout action', () => {
  it('should do a logout', () => {
    const action = Actions.loadLogout({
      logout: mockData.logout
    });

    const result = authReducer(initialState, action);

    expect(result.logout).toEqual(mockData.logout);

  });
});
describe('Logout action success', () => {
  it('should do a logout action', () => {
    const action = Actions.loadLogoutSuccess({
      logout: mockData.logout
    });

    const result = authReducer(initialState, action);

    expect(result.logout).toEqual(mockData.logout);

  });
});

describe('Logout action failure', () => {
  it('should failed logout', () => {
    const action = Actions.loadLogoutFailure({
      error: 'The error message'
    });

    const result = authReducer(initialState, action);
    expect(result.errorMessage).toEqual('The error message');

  });
});