import { Action } from '@ngrx/store';

import * as VisibilitySettingsActions from './visibility-settings.actions';
import { State, initialState, reducer } from './visibility-settings.reducer';
import { listSettings, settingGroups } from '../../core/models/visibility-settings.models';

describe('VisibilitySettings Reducer', () => {
    let settingGroups: settingGroups;
    let listSettings: listSettings;

    describe('valid VisibilitySettings actions', () => {
        it('loadVisibilitySettingsSuccess should return the list of known VisibilitySettings', () => {
            const action = VisibilitySettingsActions.loadVisibilitySettingsSuccess({
                settingGroups: settingGroups,
                listSettings: listSettings
            });

            const result: State = reducer(initialState, action);

            expect(result.settingGroups).toBe(true);
            expect(result.listSettings).toBe(true);
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
