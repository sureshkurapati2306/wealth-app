import { User } from '../../model/user.model';
import { UTAccount } from '../../model/ut_account.model';
import * as UserAction from './user.actions';
import { Store, userReducer } from './user.reducer';

describe('User Reducer', () => {
    const initialState: Store = {
        user: new User(
            '',
            '481124715058',
            'N',
            750702105695,
            1,
            '',
            '',
            'N',
            'N',
            'N',
            'AGGRESIVE',
            '',
            'N',
            'N',
            'N',
            '1',
        ),
        loadInitialData: false,
        loadCount: -1,
        dashboardData: '',
        dashboardScreenData: '',
        unitTrustAccount: '',
        unitTrustAccountList: [],
        customer_name: '',
        userTypeData: '',
        userType: '',
        userCodeResponse: '',
        riskProfileStatus: '',
        customerSessionData: '',
        getSessionData: '',
        deleteSessionResponse: '',
        customerIdType: '3',
        riskProfile: 'AGGRESIVE',
        sessionNo: null,
        createSessionResponse: false,
        loginTime: null,
        userTypeSuccessData: '',
    };

    const dashboardDataTest: Store = {
        user: new User(
            '',
            '481124715058',
            'N',
            750702105695,
            1,
            '',
            '',
            'N',
            'N',
            'N',
            'AGGRESIVE',
            '',
            'N',
            'N',
            'N',
            '1',
        ),
        loadInitialData: false,
        loadCount: -1,
        dashboardData: 'dummy dashboard data',
        dashboardScreenData: '',
        unitTrustAccount: '',
        unitTrustAccountList: [],
        customer_name: '',
        userTypeData: '',
        userType: '',
        userCodeResponse: '',
        riskProfileStatus: '',
        customerSessionData: '',
        getSessionData: '',
        deleteSessionResponse: '',
        customerIdType: '3',
        riskProfile: 'AGGRESIVE',
        sessionNo: null,
        createSessionResponse: false,
        loginTime: null,
        userTypeSuccessData: '',
    };

    const utTestData: Store = {
        user: new User(
            '',
            '481124715058',
            'N',
            750702105695,
            1,
            '',
            '',
            'N',
            'N',
            'N',
            'AGGRESIVE',
            '',
            'N',
            'N',
            'N',
            '1',
        ),
        loadInitialData: false,
        loadCount: -1,
        dashboardData: '',
        dashboardScreenData: '',
        unitTrustAccount: '',
        unitTrustAccountList: [{ default_ind: 'test', ut_account_no: 'test' }],
        customer_name: '',
        userTypeData: '',
        userType: '',
        userCodeResponse: '',
        riskProfileStatus: '',
        customerSessionData: '',
        getSessionData: '',
        deleteSessionResponse: '',
        customerIdType: '3',
        riskProfile: 'AGGRESIVE',
        sessionNo: null,
        createSessionResponse: false,
        loginTime: null,
        userTypeSuccessData: '',
    };

    describe(' UserAction.ADD_USER actions', () => {
        it('should call UserAction.ADD_USER ', () => {
            const action = new UserAction.AddUser(initialState.user);
            const result = userReducer(initialState, action);
            expect(initialState).toMatchObject(result);
        });
    });

    describe(' UserAction.UPDATE_USER actions', () => {
        it('should call UserAction.ADD_USER', () => {
            const action = new UserAction.UpdateUser(initialState.user);
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('STORE_DASHBOARD_DATA actions', () => {
        it('should call UserAction.STORE_DASHBOARD_DATA', () => {
            const action = new UserAction.StoreDashboardData('dummy dashboard data');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(dashboardDataTest);
        });
    });

    describe('CLEAR_DASHBOARD_DATA actions', () => {
        it('should call UserAction.CLEAR_DASHBOARD_DATA', () => {
            const action = new UserAction.ClearDashboardData('');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('STORE_DASHBOARD_SCREEN_DATA actions', () => {
        it('should call UserAction.STORE_DASHBOARD_SCREEN_DATA', () => {
            const action = new UserAction.StoreDashboardScreenData('');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('UPDATE_UNIT_TRUST_ACCOUNT_LIST actions', () => {
        it('should call UserAction.UPDATE_UNIT_TRUST_ACCOUNT_LIST', () => {
            const utAccount: UTAccount = { default_ind: 'test', ut_account_no: 'test' };
            const request = [];
            request.push(utAccount);
            const action = new UserAction.StoreUnitTrustAccountList(request);
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(utTestData);
        });
    });

    describe('UPDATE_SELECTED_UNIT_TRUST_ACCOUNT actions', () => {
        it('should call UserAction.UPDATE_SELECTED_UNIT_TRUST_ACCOUNT', () => {
            const action = new UserAction.SelectedUnitTrustAccount('');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_USER_NAME actions', () => {
        it('should call UserAction.UPDATE_USER_NAME', () => {
            const action = new UserAction.UpdateUserName('');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('STORE_SESSION_RESPONSE actions', () => {
        it('should call UserAction.STORE_SESSION_RESPONSE', () => {
            const request = { payload: { chkSessionValue: true, sessionNo: 1 } };
            const action = new UserAction.StoreSessionResponse(request);
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_SESSION_RESPONSE actions with null action', () => {
        it('should call UserAction.STORE_SESSION_RESPONSE', () => {
            const action = new UserAction.StoreSessionResponse(null);
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_SESSION_DATA actions', () => {
        it('should call UserAction.STORE_SESSION_DATA', () => {
            const action = new UserAction.GetSessionIDResponse('');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('STORE_USER_TYPE_RESPONSE actions', () => {
        it('should call UserAction.STORE_USER_TYPE_RESPONSE', () => {
            const action = new UserAction.StoreUserTypeResponse('');
            const result = userReducer(initialState, action);
            expect(result).toMatchObject(initialState);
        });
    });

    describe('UPDATE_USER_TYPE actions', () => {
        it('should call UserAction.UPDATE_USER_TYPE', () => {
            const action = new UserAction.UpdateUserDetails('01');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_RISK_PROFILE_STATUS actions', () => {
        it('should call UserAction.STORE_RISK_PROFILE_STATUS', () => {
            const action = new UserAction.StoreRiskProfileStatus(null);
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_USER_MOBILE_NUMBER actions', () => {
        it('should call UserAction.UPDATE_USER_MOBILE_NUMBER', () => {
            const action = new UserAction.UpdateUserMobileNumber('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_RISK_PROFILE actions', () => {
        it('should call UserAction.UPDATE_RISK_PROFILE', () => {
            const action = new UserAction.UpdateRiskProfile('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_CUSTOMER_ID_TYPE actions', () => {
        it('should call UserAction.UPDATE_CUSTOMER_ID_TYPE', () => {
            const action = new UserAction.UpdateUserMobileNumber('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_CIMB_STAFF_INDICATOR actions', () => {
        it('should call UserAction.UPDATE_CIMB_STAFF_INDICATOR', () => {
            const action = new UserAction.UpdateCIMBStaffIndicator('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_SOLE_PROP_INDICATOR actions', () => {
        it('should call UserAction.UPDATE_SOLE_PROP_INDICATOR', () => {
            const action = new UserAction.UpdateUserSoleProp('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_CIMB_STAFF_INDICATOR actions', () => {
        it('should call UserAction.UPDATE_CIMB_STAFF_INDICATOR', () => {
            const action = new UserAction.UpdateCIMBStaffIndicator('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_USER_LOGINTIME actions', () => {
        it('should call UserAction.STORE_USER_LOGINTIME', () => {
            const action = new UserAction.StoreUserLoginTime(1659989510372);
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('GET_USER_TYPE actions', () => {
        it('should call UserAction.GET_USER_TYPE', () => {
            const action = new UserAction.GetUserType('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('UPDATE_CUSTOMER_ID_TYPE actions', () => {
        it('should call UserAction.UPDATE_CUSTOMER_ID_TYPE', () => {
            const action = new UserAction.UpdateCustomerIdType('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_FOREIGNER_IND actions', () => {
        it('should call UserAction.STORE_FOREIGNER_IND', () => {
            const action = new UserAction.StoreForeignerInd('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });

    describe('STORE_OCCUPATION_IND actions', () => {
        it('should call UserAction.STORE_OCCUPATION_IND', () => {
            const action = new UserAction.StoreOccupationInd('payload');
            const result = userReducer(initialState, action);
            expect(result).toBeTruthy();
        });
    });
});
