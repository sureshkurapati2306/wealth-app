import { createAction, props } from '@ngrx/store';
import { AdministratorTable, ListUser, UserRole } from '../../core/models/administrator-portal.models';

export const administratorPortalInit = createAction('[AdministratorPortal/API Call] Init',
    props<{ pageIndex: number, search?: string }>(),);

export const loadAdministratorPortalSuccess = createAction(
    '[AdministratorPortal/API Return] Load AdministratorPortal Success',
    props<{ role: UserRole[], administratorTable: AdministratorTable }>(),
);

export const loadAdministratorPortalFailure = createAction(
    '[AdministratorPortal/API Return] Load AdministratorPortal Failure',
    props<{ error: any }>(),
);

export const DeleteUser = createAction(
    '[DeleteUser/API Call] DeleteUser',
    props<{ username: string, role: string }>(),
);

export const loadDeleteUserSuccess = createAction(
    '[DeleteUser/API Return] Load DeleteUser Success',
    props<{ row: ListUser }>(),
);

export const loadDeleteUserFailure = createAction(
    '[DeleteUser/API Return] Load DeleteUser Failure',
    props<{ error: any }>(),
);

export const CreateUser = createAction(
    '[CreateUser/API Call] CreateUser',
    props<{ username: string, role: string }>(),
);

export const loadCreateUserSuccess = createAction(
    '[CreateUser/API Return] Load CreateUser Success',
    props<{ row: ListUser }>(),
);

export const loadCreateUserFailure = createAction(
    '[CreateUser/API Return] Load CreateUser Failure',
    props<{ error: any }>(),
);

export const UpdateUser = createAction(
    '[UpdateUser/API Call] UpdateUser',
    props<{ username: string, role: string }>(),
);

export const loadUpdateUserSuccess = createAction(
    '[UpdateUser/API Return] Load UpdateUser Success',
    props<{ row: ListUser }>(),
);

export const loadUpdateUserFailure = createAction(
    '[UpdateUser/API Return] Load UpdateUser Failure',
    props<{ error: any }>(),
);

export const resetAdministratorPortalState = createAction(
    '[Reset] Reset Administrator Portal State'
);
