import { createReducer, on, Action } from '@ngrx/store';

import * as ClicksActions from './clicks.actions';
import { initialState } from './clicks.state';

export const CLICKS_FEATURE_KEY = 'clicks';

const clicksReducer = createReducer(
    initialState,
    on(ClicksActions.loadClicks, (state) => ({ ...state })),
    on(ClicksActions.loadClicksSuccess, (state, { clicks }) => {
        return {
            ...state,
            ...clicks,
        };
    }),
    on(ClicksActions.updateNTPtoETP, (state, { customerType }) => {
        return {
            ...state,
            customerType: customerType,
        };
    }),
);

export function reducer(state, action: Action) {
    return clicksReducer(state, action);
}
