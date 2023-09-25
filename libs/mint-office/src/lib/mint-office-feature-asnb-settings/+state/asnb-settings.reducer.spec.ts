import { State, reducer, initialState } from './asnb-settings.reducer';

import { Action } from '@ngrx/store';
import * as AsnbSettingsActions from './asnb-settings.actions';

const mockState: State = { fundSuspensById: null, fundSuspensIds: [], status: 'pending' };
describe('AsnbSettings Reducer', () => {
    it('should return the previous state', () => {
        const action = {} as Action;

        const result = reducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should load fund suspension list from API', () => {
        const action = AsnbSettingsActions.loadFundSuspensionList();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    it('should load fund suspension list from API on success path', () => {
        const payload = [{ fsId: 1 /* other properties */ }, { fsId: 2 /* other properties */ }];

        const action = AsnbSettingsActions.loadFundSuspensionListSuccess({
            payload,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.fundSuspensById).toEqual({
            1: { fsId: 1 /* other properties */ },
            2: { fsId: 2 /* other properties */ },
        });
        expect(result.fundSuspensIds).toEqual([1, 2]);
        expect(result.error).toEqual('');
    });

    it('should load fund suspension error from API on failed path', () => {
        const action = AsnbSettingsActions.loadFundSuspensionListFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.error).toEqual('The error message');
    });
});
