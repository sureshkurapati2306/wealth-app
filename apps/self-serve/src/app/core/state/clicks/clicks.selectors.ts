import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CLICKS_FEATURE_KEY } from './clicks.reducer';
import { ClicksState } from './clicks.state';

const getClicksState = createFeatureSelector<ClicksState>(CLICKS_FEATURE_KEY);

export const getClicksCustomerInfo = createSelector(getClicksState, (state) => {
    return state;
});
