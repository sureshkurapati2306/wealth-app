import * as Selectors from './auth.selectors';
import * as authReducer from './auth.reducer';

const mockState: authReducer.State = {
    userDetail: {
        "grantType": "password",
        "username": "test1",
        "password": "testpassword",
        "authenticationId": "test"
    },
    authKey: null,
    authData: {
        "access_token": "auth_token",
        "expires_in": new Date(300),
        "refresh_token": "auth_token",
        "refresh_expires_in": new Date(1800),
        "token_type": "Bearer",
        "jwt_session": null,
        "module_access": null
    },
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
    loggedIn: true,
    errorMessage: 'Error'
}
describe('Auth Selectors', () => {
    it('should check if user is authenticated', () => {
        const result = Selectors.isAuthenticated.projector(mockState);
    
        expect(result).toBeTruthy();
    });

    it('should get an access token if user is authenticated', () => {
        const result = Selectors.getToken.projector(mockState);
    
        expect(result).toBeTruthy();
    });
    
    it('should get user detail if user is authenticated', () => {
        const result = Selectors.getUserDetail.projector(mockState);
    
        expect(result).toBeTruthy();
    });

    it('should get user group name if user is authenticated', () => {
        const result = Selectors.getGroupName.projector(mockState);
    
        expect(result).toBeTruthy();
    });

    it('should get user module access if user is authenticated', () => {
        const result = Selectors.getModuleAccess.projector(mockState);
    
        expect(result).toBeTruthy();
    });

    it('should throw an error message', () => {
        const result = Selectors.getErrorMessage.projector(mockState.errorMessage);
    
        expect(result).toBeUndefined();
    });
});
