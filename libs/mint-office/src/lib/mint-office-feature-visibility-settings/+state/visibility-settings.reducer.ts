import { createReducer, on, Action } from '@ngrx/store';

import * as VisibilitySettingsActions from './visibility-settings.actions';
import { Image, ListSettings, SettingGroups } from '../../core/models/visibility-settings.models';

export const VISIBILITY_SETTINGS_FEATURE_KEY = 'visibilitySettings';

export interface State {
    settingGroups: SettingGroups;
    listSettings: ListSettings;
    status: string | 'pending' | 'loading' | 'success' | 'error';
    headerImgStatus?: string;
    error?: string | null; // last known error (if any)
    image?: Image;
}

export const initialState: State = {
    // set initial required properties
    settingGroups: null,
    listSettings: null,
    status: 'pending'
};

const visibilitySettingsReducer = createReducer(
    initialState,
    on(VisibilitySettingsActions.VisibilitySettingsInit, (state) => ({
        ...state, status: 'loading'
    })),
    on(VisibilitySettingsActions.loadVisibilitySettingsSuccess, (state, { settingGroups, listSettings }) => ({
        ...state,
        settingGroups: settingGroups,
        listSettings: listSettings,
        status: 'success'
    })),
    on(VisibilitySettingsActions.loadListSettings, (state) => ({
        ...state, status: 'loading'
    })),
    on(VisibilitySettingsActions.loadUpdateToggle, (state) => ({
        ...state, status: 'loading'
    })),
    on(VisibilitySettingsActions.loadListSettingsSuccess, (state, { listSettings }) => ({
        ...state,
        listSettings: listSettings,
        status: 'success'
    })),
    on(VisibilitySettingsActions.loadSaveImage, (state) => ({
        ...state, headerImgStatus: 'loading'
    })),
    on(VisibilitySettingsActions.loadSaveImageSuccess, (state, { image }) => ({
        ...state,
        image: image,
        headerImgStatus: 'success'
    })),
    on(VisibilitySettingsActions.loadVisibilitySettingsFailure, (state, { error }) => ({
        ...state,
        headerImgStatus: 'error',
        error,
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return visibilitySettingsReducer(state, action);
}
