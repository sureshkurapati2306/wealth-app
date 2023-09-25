// import { Fund } from '../../model/fund.model';
import {
  ADD_AUTH_DATA,
  AddAuthData,
  CallAuthenticateApi,
  CALL_AUTHENTICATE_API,
  AUTHENTICATE_SUCCESS,
  AuthenticateSuccess,
  AuthenticateFail,
  AUTHENTICATE_FAIL,
  // STORE_CLICKS_CODE,
  // StoreClicksCode
} from './auth.actions';

describe('Auth Action Test', () => {

  it('should create an action AddAuthData', () => {
    const action = new AddAuthData("token123", 'abc', 'downtime');

    expect({ ...action }).toEqual({
      type: ADD_AUTH_DATA,
      token: "token123",
      clicksCode: 'abc',
      downtime : "downtime"
    });
  });


  it('should create an action CallAuthenticateApi', () => {
    const action = new CallAuthenticateApi("abc","abc");

    expect({ ...action }).toEqual({
       type: CALL_AUTHENTICATE_API,
       username : "abc",
       password : "abc"
    });
  });

     it('should create an action AuthenticateSuccess', () => {
    const action = new AuthenticateSuccess("abc");

    expect({ ...action }).toEqual({
       type: AUTHENTICATE_SUCCESS,
      payload : "abc"
    });
  });

    it('should create an action AuthenticateFail', () => {
    const action = new AuthenticateFail("abc");

    expect({ ...action }).toEqual({
       type: AUTHENTICATE_FAIL,
      payload : "abc"
    });
  });

  // it('should create an action AddAuthData', () => {
  //   const action = new StoreClicksCode("abc");

  //   expect({ ...action }).toEqual({
  //      type: STORE_CLICKS_CODE,
  //     payload : "abc"
  //   });
  // });


});
