/*import * as fromAccount from './account.actions';

describe('loadAccounts', () => {
  it('should return an action', () => {
    expect(fromAccount.loadAccounts().type).toBe('[Account] Load Accounts');
  });
});
*/

// import { User } from '../../model/user.model';
import {
    GET_ACCOUNT_OPENING_API,
    GET_ACCOUNT_OPENING_API_RESPONSE,
    GET_USER_DETAILS_API,
    GET_USER_DETAILS_API_RESPONSE,
    GET_USER_DETAILS_SESSION_DATA,
    GET_USER_DETAIL_FIELD_OPTIONS_API_RESPONSE,
    POST_UTACCOUNT_AUDIT,
    POST_UTACCOUNT_AUDIT_RESPONSE,
    PostAccountOpeningAuditApiResponse,
    PostAccountOpeningAuditApi,
    GetAccountOpeningApi,
    GetAccountOpeningApiResponse,
    GetUserDetailsApi,
    GetUserDetailsApiResponse,
    GetUserDetailFieldOptionsApi,
    GetUserDetailFieldOptionsApiResponse,
    GetUserDetailsSessionData,
} from './account.actions';

// import { Dashboard } from '../../model/dashboard.model';

describe('loadAccounts API Data', () => {
    it('should create an action GetAccountOpeningApi', () => {
        const payload = '';
        const action = new GetAccountOpeningApi(payload);

        expect({ ...action }).toEqual({
            type: GET_ACCOUNT_OPENING_API,
            payload,
        });
    });
    it('should create an action GetAccountOpeningApiResponse', () => {
        const payload = '1';
        const action = new GetAccountOpeningApiResponse(payload);

        expect({ ...action }).toEqual({
            type: GET_ACCOUNT_OPENING_API_RESPONSE,
            payload,
        });
    });

    it('should create an action GetUserDetailsApi', () => {
        const payload = '1';
        const action = new GetUserDetailsApi(payload);

        expect({ ...action }).toEqual({
            type: GET_USER_DETAILS_API,
            payload,
        });
    });

    it('should create an action GetUserDetailsApi', () => {
        const payload = new GetUserDetailsApi('CABCD');
        const action = new GetAccountOpeningApiResponse(payload);

        expect({ ...action }).toEqual({
            type: GET_ACCOUNT_OPENING_API_RESPONSE,
            payload,
        });
    });

    it('should create an action GetUserDetailFieldOptionsApi', () => {
        const payload = new GetUserDetailFieldOptionsApi('CABCD');
        const action = new GetUserDetailFieldOptionsApiResponse(payload);

        expect({ ...action }).toEqual({
            type: GET_USER_DETAIL_FIELD_OPTIONS_API_RESPONSE,
            payload,
        });
    });
    it('should create an action GetUserDetailsApiResponse', () => {
        const payload = '1';

        const action = new GetUserDetailsApiResponse(payload);

        expect({ ...action }).toEqual({
            type: GET_USER_DETAILS_API_RESPONSE,
            payload,
        });
    });

    it('should called GetUserDetailsSessionData', () => {
        const payload = '1234';
        const action = new GetUserDetailsSessionData(payload);

        expect({ ...action }).toEqual({
            type: GET_USER_DETAILS_SESSION_DATA,
            payload,
        });
    });

    it('should called PostAccountOpeningAuditApi ', () => {
        const payload = '1234';
        const action = new PostAccountOpeningAuditApi(payload);

        expect({ ...action }).toEqual({
            type: POST_UTACCOUNT_AUDIT,
            payload,
        });
    });

    it('should called PostAccountOpeningAuditApi with no value', () => {
        const payload = null;
        const action = new PostAccountOpeningAuditApi(payload);

        expect({ ...action }).toEqual({
            type: POST_UTACCOUNT_AUDIT,
            payload,
        });
    });

    it('should called PostAccountOpeningAuditApiResponse with value', () => {
        const payload = '1234';
        const action = new PostAccountOpeningAuditApiResponse(payload);

        expect({ ...action }).toEqual({
            type: POST_UTACCOUNT_AUDIT_RESPONSE,
            payload,
        });
    });

    it('should called PostAccountOpeningAuditApiResponse with no value', () => {
        const payload = null;
        const action = new PostAccountOpeningAuditApiResponse(payload);

        expect({ ...action }).toEqual({
            type: POST_UTACCOUNT_AUDIT_RESPONSE,
            payload,
        });
    });
});
