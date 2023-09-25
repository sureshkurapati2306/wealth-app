import { initialState, Store, logoutReducer } from './logout.reducer';
import * as LogoutAction from './logout.action';

describe('Logout Reducer ', () => {

    it('should return the previous state', () => {
        const action = {} as any;

        const result = logoutReducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should call [Logout] Post audit and customer details', () => {
        const action = new LogoutAction.LogoutTransaction();

        const result = logoutReducer(initialState, action);

        expect(result.availableFundsData).toBe(initialState.availableFundsData);

    });

     it('[Logout]Logout transaction success', () => {
        const action = new LogoutAction.LogoutTransactionSuccess(null);

        const result = logoutReducer(initialState, action);

        expect(result.availableFundsData).toBe(initialState.availableFundsData);

    });


    it('[Logout]Logout transaction error', () => {
        const action = new LogoutAction.LogoutTransactionError(null);

        const result = logoutReducer(initialState, action);

        expect(result.availableFundsData).toBe(initialState.availableFundsData);

    });


});
