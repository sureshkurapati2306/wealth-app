import { Action } from '@ngrx/store';

import * as AdministratorPortalActions from './administrator-portal.actions';
import { AdministratorTable, ListUser, UserRole } from '../../core/models/administrator-portal.models';
import { State, initialState, reducer } from './administrator-portal.reducer';

describe('AdministratorPortal Reducer', () => {
    let userRole: UserRole[];
    let administratorTable: AdministratorTable;

    describe('valid AdministratorPortal actions', () => {
        it('loadAdministratorPortalSuccess should return the list of known AdministratorPortal', () => {
            const action = AdministratorPortalActions.loadAdministratorPortalSuccess({
                role: userRole,
                administratorTable: administratorTable
            });

            const result: State = reducer(initialState, action);

            expect(result.loaded).toBe(true);
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
