import * as AuthAction from './auth.actions';

export interface Store {
  token: string;
  clicksCode: string;
  downtime: any;
}

export const initialState: Store = {
  token: null,
  clicksCode: null,
  downtime: null
};

export function authReducer(state = initialState, action: AuthAction.Actions) {
  switch (action.type) {
    case AuthAction.ADD_AUTH_DATA: {
      return {
        ...state,
        token: action.token,
        clicksCode: action.clicksCode,
        downtime: action.downtime
      };
    }
    case AuthAction.UPDATE_DOWNTIME: {
      return {
        ...state,
        downtime: action.downtime
      };
    }
    default:
      return state;
  }
}
