import { createReducer, on } from '@ngrx/store';
import * as MintOfficeActions from './mint-office.actions';

export const mintOfficeFeatureKey = 'mintOffice';

export interface MintOfficeState {
  cimbFooterClass: string;
}

export const initialState: MintOfficeState = {
  cimbFooterClass: ''
};


export const reducer = createReducer(
  initialState,

  on(MintOfficeActions.updateCimbFooterClass, (state, action) => {
    return {
      ...state,
      cimbFooterClass: action.className
    };
  }),

);
