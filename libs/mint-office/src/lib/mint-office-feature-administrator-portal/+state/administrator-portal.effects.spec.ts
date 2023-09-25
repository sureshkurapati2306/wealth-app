import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as AdministratorPortalActions from './administrator-portal.actions';
import { AdministratorPortalEffects } from './administrator-portal.effects';
import { AdministratorTable, UserRole } from '../../core/models/administrator-portal.models';

describe('AdministratorPortalEffects', () => {
    let actions: Observable<Action>;
    let effects: AdministratorPortalEffects;
    let userRole: UserRole[];
    let administratorTable: AdministratorTable;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot()],
            providers: [
                AdministratorPortalEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(AdministratorPortalEffects);
    });

    describe('init$', () => {
        it('should work', () => {
            actions = hot('-a-|', { a: AdministratorPortalActions.administratorPortalInit({pageIndex: 1}) });

            const expected = hot('-a-|', {
                a: AdministratorPortalActions.loadAdministratorPortalSuccess({
                    role: userRole,
                    administratorTable: administratorTable
                }),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });
});
