import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as VisibilitySettingsActions from './visibility-settings.actions';
import { VisibilitySettingsEffects } from './visibility-settings.effects';
import { listSettings, settingGroups } from '../../core/models/visibility-settings.models';

describe('VisibilitySettingsEffects', () => {
    let actions: Observable<Action>;
    let effects: VisibilitySettingsEffects;
    let settingGroups: settingGroups;
    let listSettings: listSettings;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot()],
            providers: [
                VisibilitySettingsEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(VisibilitySettingsEffects);
    });

    describe('init$', () => {
        it('should work', () => {
            actions = hot('-a-|', { a: VisibilitySettingsActions.init({ utSettingGroupId: '' }) });

            const expected = hot('-a-|', {
                a: VisibilitySettingsActions.loadVisibilitySettingsSuccess({
                    settingGroups: settingGroups,
                    listSettings: listSettings
                }),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });
});
