import { createAction, props } from '@ngrx/store';

export const addGlobalError = createAction(
    '[GlobalError] Add',
    props<{ error: any }>(),
);
