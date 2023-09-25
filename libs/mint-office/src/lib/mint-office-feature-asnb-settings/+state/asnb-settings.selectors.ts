import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAsnbSettingsReducer from './asnb-settings.reducer';

export const getAsnbSettingsState = createFeatureSelector<fromAsnbSettingsReducer.State>(
    fromAsnbSettingsReducer.asnbSettingsFeatureKey,
);

export const getFundSuspensMap = createSelector(getAsnbSettingsState, (state) => {
    return state.fundSuspensById;
});

export const getFundSuspensList = createSelector(getAsnbSettingsState, (state) => {
    return state.fundSuspensIds.map((id) => state.fundSuspensById[id]);
});

export const getFundTypeMap = createSelector(getAsnbSettingsState, (state) => {
    return state.fundTypesMap;
});

export const getOperationHours = createSelector(getAsnbSettingsState, (state) => {
    return state.operationHours;
});

export const getFundLibraryList = createSelector(getAsnbSettingsState, (state) => {
    return state.fundLibraryList;
});

export const getFundLibrary = createSelector(getAsnbSettingsState, (state) => {
    return state.fundLibrary;
});

export const getUrlList = createSelector(getAsnbSettingsState, (state) => {
    return state.urlList;
});

export const getSelectedUrl = createSelector(getAsnbSettingsState, (state) => {
    return state.selectedUrl;
});
