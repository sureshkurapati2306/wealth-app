import { Action } from '@ngrx/store';
import * as ClicksActions from './clicks.actions';
import { reducer } from './clicks.reducer';
import { initialState } from './clicks.state';

describe('Clicks Reducer', () => {
    const clicks = {
        cifNumber: 'string',
        customerIDNumber: 'string',
        customerIDType: 'string',
        debitCardNumber: 'string',
        customerIDTypeDesc: 'string',
        ipAddress: 'string'
    };

    describe('valid loadClicksSuccess actions', () => {
        it('loadClicksSuccess should return clicks info', () => {
            const action = ClicksActions.loadClicksSuccess({
                clicks,
            });

            const result = reducer(initialState, action);

            expect(result).toMatchObject(clicks);
        });
    });

    describe('[Clicks/API] Load Clicks', () => {
        it('should call load api to set init state', () => {
            const action = ClicksActions.loadClicks({ code: 'CODE' });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
            });
        });
    });

    describe('[Clicks/API] Load Clicks Success', () => {
        it('should set the clicks info property in state', () => {
            const action = ClicksActions.loadClicksSuccess({
                clicks: {
                    customerIDNumber: 'string',
                    customerIDType: 'string',
                    customerIDTypeDesc: 'string',
                    ipAddress: 'string'
                },
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                ...action.clicks,
            });
        });
    });

    describe('[Clicks/API] Update NTP user to ETP', () => {
        it('should updateNTPtoETP', () => {
            const action = ClicksActions.updateNTPtoETP({ customerType: null });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
            });
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
