import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    VISIBILITY_SETTINGS_FEATURE_KEY,
    State,
} from './visibility-settings.reducer';

export const getVisibilitySettingsState = createFeatureSelector<State>(
    VISIBILITY_SETTINGS_FEATURE_KEY,
);

export const getVisibilitySettingsError = createSelector(
    getVisibilitySettingsState,
    (state: State) => state.error,
);

export const getSettingGroups = createSelector(
    getVisibilitySettingsState,
    (state: State) => {
        return state.settingGroups;
    }
);

export const getListSettings = createSelector(
    getVisibilitySettingsState,
    (state: State) => {
        return state.listSettings;
    }
);

export const getHeaderImgStatus = createSelector(
    getVisibilitySettingsState,
    (state: State) => {
        return state.headerImgStatus;
    }
);
