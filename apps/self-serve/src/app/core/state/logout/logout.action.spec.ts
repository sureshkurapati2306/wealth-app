import {
  LOGOUT_TRANSACTION_API,
  LogoutTransaction,
  LOGOUT_TRANSACTION__SUCCESS,
  LogoutTransactionSuccess,
  LOGOUT_TRANSACTION__ERROR,
  LogoutTransactionError,


} from './logout.action';

describe('Logout' , ()=> {
  it('should create an action PostLogout', () => {
    const action = new LogoutTransaction();

    expect({ ...action }).toEqual({
      type: LOGOUT_TRANSACTION_API
    });
  });

  it('should create an action StoreLogoutApiResponse', () => {
    const payload = '';
    const action = new LogoutTransactionSuccess(payload);

    expect({ ...action }).toEqual({
      type: LOGOUT_TRANSACTION__SUCCESS,
       payload,
    });
  });
  it('should create an action StoreLogoutApiResponseError', () => {
    const payload = '';
    const action = new LogoutTransactionError(payload);

    expect({ ...action }).toEqual({
      type: LOGOUT_TRANSACTION__ERROR,
       payload,
    });
  });

})


