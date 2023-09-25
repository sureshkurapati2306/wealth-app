
import * as ErrorAction from './error.action';

export interface Store {
  error:any;
}

const initialState: Store = {
 error:''
}
export function errorReducer(
  state = initialState,
  action: ErrorAction.Actions
) {
  switch (action.type) {
    case ErrorAction.ADD_GLOBAL_ERROR: {
      return {
        ...state,
        error:action.payload
      }
    }

    default:
      return state;
  }

    
}
