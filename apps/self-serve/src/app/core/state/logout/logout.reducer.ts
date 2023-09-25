
import * as LogoutAction from './logout.action';

export interface Store {
  availableFundsData : any;
  values : any;
}

export const initialState: Store = {
  availableFundsData : '',
  values : ''
}

export function logoutReducer(
  state = initialState,
  action: LogoutAction.Actions
) {
  switch (action.type) {
    case LogoutAction.LOGOUT_TRANSACTION_API:
      return {
        ...state
      }
      case LogoutAction.LOGOUT_TRANSACTION__SUCCESS: {
        const logoutSuccessResponse = action.payload;
        return {
          ...state,
          logoutSuccessData: logoutSuccessResponse,
        };
      }
      case LogoutAction.LOGOUT_TRANSACTION__ERROR: {
        const logoutError = action.payload;

        return {
          ...state,
          logoutErrorData: logoutError,
        };
      }

      default:
      return state;
    }
}
