import { Action } from '@ngrx/store';

import * as ErrorsActions from './errors.actions';
import { State, initialState, reducer } from './errors.reducer';

describe('Errors Reducer', () => {

    describe('global Errors actions', () => {
        it('should add global Errors', () => {
            const action = ErrorsActions.addGlobalError({ error: '' });

            const result: State = reducer(initialState, action);

            expect(result.error).toBe('');
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
