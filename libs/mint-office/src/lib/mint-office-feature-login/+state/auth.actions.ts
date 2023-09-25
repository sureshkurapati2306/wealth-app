import { createAction, props } from '@ngrx/store';
import { Auth, AuthData, AuthKey} from '../../core/models/auth.model';

export const getKey = createAction(
    '[Key/API] Get Key',
);

export const getKeySuccess = createAction(
    '[Key/API] Get Key Success',
    props<{ authKey: AuthKey}>(),
);

export const getKeyFailure = createAction(
    '[Key/API] Get Key Failure',
    props<{ error: any }>(),
);

export const authStart = createAction(
    '[Auth/API] Login Start',
    props<{ data: Auth }>(),
);

export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{ authData: AuthData}>(),
);

export const loginFailure = createAction(
    '[Auth/API] Login Failure',
    props<{ error: any }>(),
);

export const delSession = createAction(
    '[delSession/API] Load delSession',
    props<{ sessionId: number }>(),
);

export const delSessionSuccess = createAction(
    '[delSession/API] Load delSession Success',
    props<{ success: any }>(),
);

export const delSessionFailure = createAction(
    '[delSession/API] Load delSession Failure',
    props<{ error: any }>(),
);
