import { createReducer, on } from '@ngrx/store';
import * as WhitelistingUserActions from './whitelisting-user.actions';
import { WhitelistingTable } from '../../core/models/user-whitelisting.models';

export const WHITELISTING_USER_FEATURE_KEY = 'whitelistinguser'

export interface State {
  whitelistingTable: WhitelistingTable | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  whitelistingTable: null,
  loading: false,
  error: null,
};

function startLoading(state: State): State {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

function errorLoading(state : State, error: any ): State {
  return {
    ...state,
    error: null,
  };
}

export const whitelistingUserReducer = createReducer(
  initialState,
  on(WhitelistingUserActions.loadWhitelistingList, (state) => startLoading(state)),
  on(WhitelistingUserActions.loadWhitelistingListSuccess, (state, { whitelistingTable }) => ({
    ...state,
    whitelistingTable,
    loading: false,
  })),
  on(WhitelistingUserActions.loadWhitelistingListFailure, (state, { error }) => errorLoading(state, error )),
  on(WhitelistingUserActions.deleteWhitelistingUser, (state) => startLoading(state)),
  on(WhitelistingUserActions.deleteWhitelistingUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(WhitelistingUserActions.deleteWhitelistingUserFailure, (state, { error }) => errorLoading(state, error ))
);
