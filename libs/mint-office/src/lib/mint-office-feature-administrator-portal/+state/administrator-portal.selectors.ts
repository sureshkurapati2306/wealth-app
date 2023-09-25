import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    ADMINISTRATOR_PORTAL_FEATURE_KEY,
    State,
} from './administrator-portal.reducer';

export const getAdministratorPortalState = createFeatureSelector<State>(
    ADMINISTRATOR_PORTAL_FEATURE_KEY,
);

export const getAdministratorPortalLoaded = createSelector(
    getAdministratorPortalState,
    (state: State) => state.loaded,
);

export const getAdministratorPortalError = createSelector(
    getAdministratorPortalState,
    (state: State) => state.error,
);

export const getSelectedId = createSelector(
    getAdministratorPortalState,
    (state: State) => state.selectedId,
);

export const getRole = createSelector(
    getAdministratorPortalState,
    (state: State) => state.role,
);

export const getAdministratorTable = createSelector(
    getAdministratorPortalState,
    (state: State) => state.administratorTable,
);
