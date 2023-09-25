import { createReducer, on } from '@ngrx/store';
import { Auth, AuthData, AuthKey} from '../../core/models/auth.model';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
    userDetail: Auth;
    authData: AuthData,
    authKey: AuthKey,
    loggedIn: boolean;
    errorMessage: string;
}

export const initialState: State = {
    userDetail:null,
    loggedIn: false,
    authData: null,
    authKey: null,
    errorMessage: ''
  };

export const authReducer = createReducer(
    initialState,

    on(AuthActions.getKey, (state) => {
        return {
            ...state
        }
    }),
    on(AuthActions.getKeySuccess, (state, action) =>
        {
            return {
                ...state,
                authKey: action.authKey,
            }
        }
    ),
    on(AuthActions.loginFailure, (state, action) => {
        return {
            ...state,
            errorMessage: action.error
        }
    }),

    on(AuthActions.authStart, (state, action) => {
        return {
            ...state,
            userDetail: action.data,
            loggedIn: false,
            errorMessage: ''
        }
    }),
    on(AuthActions.loginSuccess, (state, action) =>
        {
            return {
                ...state,
                authData: action.authData,
                loggedIn: true,
                errorMessage: ''
            }
        }
    ),
    on(AuthActions.loginFailure, (state, action) => {
        return {
            ...state,
            loggedIn: false,
            errorMessage: action.error
        }
    }),

);
