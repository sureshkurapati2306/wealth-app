import { createReducer, on, Action } from '@ngrx/store';

import * as ErrorsActions from './errors.actions';
import { ErrorsEntity } from '../models/errors.models';

export const ERRORS_FEATURE_KEY = 'errors';

export interface State extends ErrorsEntity {
    error: any // last known error (if any)
}

export const initialState: State = {
    // set initial required properties
    error: '',
};

const errorsReducer = createReducer(
    initialState,
    on(ErrorsActions.addGlobalError, (state, action) => ({ ...state, error: action })),
);

export function reducer(state: State | undefined, action: Action) {
    return errorsReducer(state, action);
}
