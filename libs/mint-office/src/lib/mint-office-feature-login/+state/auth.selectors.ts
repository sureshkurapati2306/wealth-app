import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  State } from './auth.reducer';

import jwt_decode from "jwt-decode";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<State>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  if(state) {
    return state.loggedIn ? true : false;
  }
 
});

export const getToken = createSelector(getAuthState, (state) => {
  if(state) {
    return state?.authData ? state?.authData?.jwt_session.sessionNo : null;
  }
});

export const getJwt_session = createSelector(getAuthState, (state) => {
  if(state) {
    return state?.authData ? state?.authData?.jwt_session : null;
  }
});

export const getModuleAccess = createSelector(getAuthState, (state) => {
  if(state) {
    return state?.authData?.module_access;
  }
});

export const getUserDetail = createSelector(getAuthState, (state) => {
  if(state) {
    const token = state?.authData.access_token;
    const decode_token: any = jwt_decode(token);
    const userName = decode_token.preferred_username;
    return userName;
  }
});

export const getGroupName = createSelector(getAuthState, (state) => {
  if(state) {
    const token = state?.authData.access_token;
    const decode_token: any = jwt_decode(token);
    const groupName = decode_token.groupId;
    return groupName;
  }
});

export const getErrorMessage = createSelector(getAuthState, (state: any) => {
  if(state) {
    if (state.errorMessage?.error?.status == 400 || state.errorMessage?.error?.status == 401) {
      return 'LAN ID and/or password is invalid. Please try again.'
    }
  }
});

export const getkey = createSelector(getAuthState, (state: any) => {
  if(state) {
    return state.authKey
  }
});
