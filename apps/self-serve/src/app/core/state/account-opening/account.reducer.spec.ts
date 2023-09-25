import { Store } from './account.reducer';

import * as AccountActions from './account.actions';
import { accountOpeningReducer } from './account.reducer';

describe('Account Opening Reducer', () => {
    const initialState: Store = {
        accountOpeningAPIParams: null,
        accountOpeningAPIResponseData: null,
        userDetailsAPIParams: null,
        userDetailsAPIResponseData: null,
        userDetailsSessionData: null,
        accountOpeningAuditAPIParams: null,
        accountOpeningAuditAPIResponse: null,
    };

    it('Should call GetAccountOpeningApiResponse', () => {
        const mockPayload = '';

        const action = new AccountActions.GetAccountOpeningApiResponse(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.accountOpeningAPIResponseData).toBe(mockPayload);
    });

    it('Should call GetUserDetailsApi', () => {
        const mockPayload = '1234';

        const action = new AccountActions.GetUserDetailsApi(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.accountOpeningAPIResponseData).toBe(
            initialState.accountOpeningAPIResponseData,
        );
    });

    it('Should call GetUserDetailFieldOptionsApiResponse', () => {
        const mockPayload = '';

        const action = new AccountActions.GetUserDetailFieldOptionsApiResponse(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.accountOpeningAPIResponseData).toBe(
            initialState.accountOpeningAPIResponseData,
        );
    });

    // it('should called GetUserDetailsApiResponse', () => {
    //     let settlementAccounts = [];
    //     const bankAccounts = [];
    //     let bankAccountObj;
    //     let accountObj;
    //     const mockPayload = '1234';

    //     const initialState: Store = {
    //         accountOpeningAPIParams: '',
    //         accountOpeningAPIResponseData: '',
    //         userDetailsAPIParams: '',
    //         userDetailsAPIResponseData: '',
    //         userDetailsSessionData: '',
    //         accountOpeningAuditAPIParams: '',
    //         accountDetailParams: '',
    //         accountDetailData: '',
    //     };

    //     const action = new AccountActions.GetUserDetailsApiResponse({
    //         mockPayload,
    //     });

    //     settlementAccounts = jest.fn()

    //     const result = accountOpeningReducer(initialState, action);

    //     expect(result).toEqual({
    //         ...initialState,
    //         userDetailsAPIResponseData: action.payload,
    //     });
    // });

    it('Should call GetUserDetailsSessionData', () => {
        const mockPayload = '';

        const action = new AccountActions.GetUserDetailsSessionData(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.userDetailsSessionData).toBeFalsy();
    });

    it('Should call GetUserDetailFieldOptionsApi', () => {
        const mockPayload = '';

        const action = new AccountActions.GetUserDetailFieldOptionsApi(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.userDetailsSessionData).toBe(initialState.userDetailsSessionData);
    });

    it('Should call PostAccountOpeningAuditApi', () => {
        const mockPayload = '';

        const action = new AccountActions.PostAccountOpeningAuditApi(mockPayload);

        const result = accountOpeningReducer(initialState, action);

        expect(result.accountOpeningAuditAPIParams).toBeFalsy();
    });

    // it('should return the previous state', () => {
    //     const action = {} as Action;

    //     const initialState: Store = {
    //         accountOpeningAPIParams: '',
    //         accountOpeningAPIResponseData: '',
    //         userDetailsAPIParams: '',
    //         userDetailsAPIResponseData: '',
    //         userDetailsSessionData: '',
    //         accountOpeningAuditAPIParams: '',
    //         accountDetailParams: '',
    //         accountDetailData: '',
    //     };

    //     const result = accountOpeningReducer(initialState, action);

    //     expect(result).toBe(initialState);
    // });
});
