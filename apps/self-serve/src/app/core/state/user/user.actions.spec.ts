import { User } from '../../model/user.model';
import {
  AddUser,
  ADD_USER,
  ClearDashboardData,
  CLEAR_DASHBOARD_DATA,
  GetDashboard,
  GET_DASHBOARD_DATA,
  StoreDashboardData,
  StoreDashboardDataSuccess,
  StoreDashboardScreenData,
  STORE_DASHBOARD_DATA,
  STORE_DASHBOARD_DATA_SUCCESS,
  STORE_DASHBOARD_SCREEN_DATA,
  UpdateUser,
  UPDATE_USER,
  StoreUnitTrustAccountList,
  SelectedUnitTrustAccount,
  UPDATE_SELECTED_UNIT_TRUST_ACCOUNT,
  UPDATE_UNIT_TRUST_ACCOUNT_LIST
} from './user.actions';
import * as UserAction from './user.actions';

describe('AddUser', () => {
  const userData = new User(
    'Test',
    'CK1000',
    'SOLO_PROP',
    12121212121212,
    1,
    '4 Sept 2020, 10:30AM',
    'WJ-85',
    'P',
    'N',
    'N',
    'N',
    '2222222222222222',
    'N',
    "N",
    'N',
    "N",
    'N',
  );
  it('user should create an action GetDashboard', () => {
    const payload = '';
    const action = new GetDashboard(payload);

    expect({ ...action }).toEqual({
      type: GET_DASHBOARD_DATA,
      payload,
    });
  });
  it('user should create an action AddUser', () => {
    const payload = userData;
    const action = new AddUser(payload);

    expect({ ...action }).toEqual({
      type: ADD_USER,
      payload,
    });
  });

  it('user should create an action UpdateUser', () => {
    const payload = userData;
    const action = new UpdateUser(payload);

    expect({ ...action }).toEqual({
      type: UPDATE_USER,
      payload,
    });
  });

  it('user should create an action ClearDashboardData', () => {
    const payload = '';
    const action = new ClearDashboardData(payload);

    expect({ ...action }).toEqual({
      type: CLEAR_DASHBOARD_DATA,
      payload,
    });
  });

  it('user should create an action StoreDashboardData', () => {
    const payload = '1';
    const action = new StoreDashboardData(payload);

    expect({ ...action }).toEqual({
      type: STORE_DASHBOARD_DATA,
      payload,
    });
  });

  it('user should create an action StoreDashboardData', () => {
    const action = new StoreDashboardDataSuccess();

    expect({ ...action }).toEqual({
      type: STORE_DASHBOARD_DATA_SUCCESS,
    });
  });

  it('user should create an action ClearDashboardData', () => {
    const payload = '';
    const action = new ClearDashboardData(payload);

    expect({ ...action }).toEqual({
      type: CLEAR_DASHBOARD_DATA,
      payload,
    });
  });

  it('user should create an action StoreDashboardScreenData', () => {
    const payload = '';
    const action = new StoreDashboardScreenData(payload);

    expect({ ...action }).toEqual({
      type: STORE_DASHBOARD_SCREEN_DATA,
      payload,
    });
  });

  it('user should create an action StoreUnitTrustAccountList', () => {
    const payload = [];
    const action = new StoreUnitTrustAccountList(payload);

    expect({ ...action }).toEqual({
      type: UPDATE_UNIT_TRUST_ACCOUNT_LIST,
      payload,
    });
  });

  it('user should create an action StoreDashboardScreenData', () => {
    const payload = "";
    const action = new SelectedUnitTrustAccount(payload);

    expect({ ...action }).toEqual({
      type: UPDATE_SELECTED_UNIT_TRUST_ACCOUNT,
      payload,
    });
  });



  it('user should create an action UpdateUserName', () => {
    const payload = "";
    const action = new UserAction.UpdateUserName( payload);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_USER_NAME,
      payload
    });
  });
  it('should create an action Store user type action', () => {
    const payload = '1';
    const action = new UserAction.StoreUserTypeResponse(payload);

    expect({ ...action }).toEqual({
      type: UserAction.STORE_USER_TYPE_RESPONSE,
      payload,
    });
  });
  it('should create an action Store Get user type action', () => {
    const payload = '1';
    const action = new UserAction.GetUserType(payload);

    expect({ ...action }).toEqual({
      type: UserAction.GET_USER_TYPE,
      payload,
    });
  });

  it('should Update User Details type action', () => {
    const customerIdType = "01";
    const action = new UserAction.UpdateUserDetails(customerIdType);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_USER_TYPE,
      customerIdType
    });
  });

  it('should create an action Store Get user type action', () => {
    const payload = '1';
    const action = new UserAction.GetUserType(payload);

    expect({ ...action }).toEqual({
      type: UserAction.GET_USER_TYPE,
      payload,
    });
  });



  it('should create an action Store Get user type action', () => {
    const payload = '1';
    const action = new UserAction.GetUserType(payload);

    expect({ ...action }).toEqual({
      type: UserAction.GET_USER_TYPE,
      payload,
    });
  });


  it('should create an action Store Risk Profile Status type action', () => {
    const payload = 'Expired';
    const action = new UserAction.StoreRiskProfileStatus(payload);

    expect({ ...action }).toEqual({
      type: UserAction.STORE_RISK_PROFILE_STATUS,
      payload,
    });
  });

  it('should create an action Update User Mobile Number action', () => {
    const payload = '01122334455';
    const action = new UserAction.UpdateUserMobileNumber(payload);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_USER_MOBILE_NUMBER,
      payload,
    });
  });

  it('should create an action Update User Risk Profile action', () => {
    const payload = 'ABC';
    const action = new UserAction.UpdateRiskProfile(payload);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_RISK_PROFILE,
      payload,
    });
  });

  it('should create an action Update Customer ID Type action', () => {
    const payload = 'ABC';
    const action = new UserAction.UpdateCustomerIdType(payload);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_CUSTOMER_ID_TYPE,
      payload,
    });
  });

  it('should Store Session Id', () => {
    const payload = "1010101";
    const action = new UserAction.StoreSessionResponse(payload);

    expect({ ...action }).toEqual({
      type: UserAction.STORE_SESSION_RESPONSE,
      payload
    });
  });

  it('should Get Session Id Response', () => {
    const payload = "1010101";
    const action = new UserAction.GetSessionIDResponse(payload);

    expect({ ...action }).toEqual({
      type: UserAction.STORE_SESSION_DATA,
      payload
    });
  });



  it('should Update CIMB Staff Indicator', () => {
    const payload = 1;
    const action = new UserAction.UpdateCIMBStaffIndicator(payload);

    expect({ ...action }).toEqual({
      type: UserAction.UPDATE_CIMB_STAFF_INDICATOR,
      payload,
    });
  });


});

