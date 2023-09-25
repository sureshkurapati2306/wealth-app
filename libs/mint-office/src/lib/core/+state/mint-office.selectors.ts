import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMintOffice from './mint-office.reducer';

export const selectMintOfficeState = createFeatureSelector<fromMintOffice.MintOfficeState>(
  fromMintOffice.mintOfficeFeatureKey
);

export const getCimbFooterClassName = createSelector(
  selectMintOfficeState,
  state => {
    return state?.cimbFooterClass;
  }
);
