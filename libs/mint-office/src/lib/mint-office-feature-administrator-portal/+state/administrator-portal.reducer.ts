import { createReducer, on, Action } from '@ngrx/store';

import * as AdministratorPortalActions from './administrator-portal.actions';
import { AdministratorTable, ListUser, UserRole } from '../../core/models/administrator-portal.models';

export const ADMINISTRATOR_PORTAL_FEATURE_KEY = 'administratorPortal';

export interface State {
    role?: UserRole[];
    administratorTable?: AdministratorTable;
    row?: ListUser;
    selectedId?: string | number; // which AdministratorPortal record has been selected
    loaded: boolean; // has the AdministratorPortal list been loaded
    error?: string | null; // last known error (if any)
}

export const initialState: State = {
    // set initial required properties
    loaded: false,
};

const administratorPortalReducer = createReducer(
    initialState,
    on(AdministratorPortalActions.administratorPortalInit, (state) => ({ ...state, loaded: false, error: null })),
    on(AdministratorPortalActions.loadAdministratorPortalSuccess, (state, { role, administratorTable }) => ({ 
        ...state, 
        role: role,
        administratorTable: administratorTable,
        loaded: true }),
    ),
    on(AdministratorPortalActions.loadAdministratorPortalFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(AdministratorPortalActions.DeleteUser, (state) => ({ ...state, loaded: false, error: null })),
    on(AdministratorPortalActions.loadDeleteUserSuccess, (state, { row }) => successState(state, row)),
    on(AdministratorPortalActions.loadDeleteUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(AdministratorPortalActions.CreateUser, (state) => ({ ...state, loaded: false, error: null })),
    on(AdministratorPortalActions.loadCreateUserSuccess, (state, { row }) => successState(state, row)),
    on(AdministratorPortalActions.loadCreateUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(AdministratorPortalActions.UpdateUser, (state) => ({ ...state, loaded: false, error: null })),
    on(AdministratorPortalActions.loadUpdateUserSuccess, (state, { row }) => successState(state, row)),
    on(AdministratorPortalActions.loadUpdateUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(AdministratorPortalActions.resetAdministratorPortalState, () => {
        return initialState
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return administratorPortalReducer(state, action);
}

export function successState(state, row) {
    return { 
        ...state, 
        row: row,
        loaded: true 
    }
}