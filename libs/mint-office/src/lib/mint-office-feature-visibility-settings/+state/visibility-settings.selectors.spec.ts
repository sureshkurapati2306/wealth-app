import { State } from './visibility-settings.reducer';
import * as VisibilitySettingsSelectors from './visibility-settings.selectors';

describe('VisibilitySettings Selectors', () => {
    const ERROR_MSG = 'No Error Available';

    let state: State;

    beforeEach(() => {
        state = {
            settingGroups: null,
            listSettings: null,
            status: 'pending'
        };
    });

    describe('VisibilitySettings Selectors', () => {
        it('getSettingGroups() should return the group list', () => {
            const result = VisibilitySettingsSelectors.getSettingGroups(state);

            expect(result).toBe(true);
        });

        it('getListSettings() should return the setting list', () => {
            const result = VisibilitySettingsSelectors.getListSettings(state);

            expect(result).toBe(true);
        });

        it('getVisibilitySettingsError() should return the current "error" state', () => {
            const result = VisibilitySettingsSelectors.getVisibilitySettingsError(state);

            expect(result).toBe(ERROR_MSG);
        });
    });
});
