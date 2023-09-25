import { initialState, Store, authReducer } from './auth.reducer';
import * as AuthAction from './auth.actions';

const mockReturnData = {
    token: null,
    clicksCode: null,
    downtime: null,
};

describe('Auth Reducer ', () => {
    it('should return the previous state', () => {
        const action = {} as any;

        const result = authReducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should call [Auth] Add Auth Data', () => {
        const action = new AuthAction.AddAuthData(null, null, null);

        const result = authReducer(initialState, action);

        expect(result.token).toBe(initialState.token);
        expect(result.clicksCode).toBe(initialState.clicksCode);
        expect(result.downtime).toBe(initialState.downtime);
    });

    it('should call [Auth] Update Downtime', () => {
        const action = new AuthAction.UpdateDowntime(null);

        const result = authReducer(initialState, action);

        expect(result).toEqual(mockReturnData);
    });
});
