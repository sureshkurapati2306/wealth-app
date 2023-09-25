import { createAction, props } from '@ngrx/store';
import { UrlMaintenanceApiResponse } from '../../core/models/asnb.model';

export const loadAsnbSettingss = createAction('[AsnbSettings] Load AsnbSettingss');

export const loadFundSuspensionList = createAction('[Asnb/API] Load Fund Suspension List');

export const loadFundSuspensionListSuccess = createAction(
    '[Asnb/API] Load Fund Suspension List Success',
    props<{ payload: any }>(),
);

export const loadFundSuspensionListFailure = createAction(
    '[Asnb/API] Load Fund Suspension List Failure',
    props<{ error: any }>(),
);

export const loadOperationHours = createAction('[Asnb/API] Load Operation Hours');

export const loadOperationHoursSuccess = createAction(
    '[Asnb/API] Load Operation Hours Success',
    props<{ payload: any }>(),
);

export const loadOperationHoursFailure = createAction(
    '[Asnb/API] Load Operation Hours Failure',
    props<{ error: any }>(),
);

export const loadFundLibraryList = createAction('[Asnb/API] Load Fund Library List');

export const loadFundLibraryListSuccess = createAction(
    '[Asnb/API] Load Fund Library List Success',
    props<{ payload: any }>(),
);

export const loadFundLibraryListFailure = createAction(
    '[Asnb/API] Load Fund Library List Failure',
    props<{ error: any }>(),
);

export const loadFundLibrary = createAction(
    '[Asnb/API] Load Fund Library',
    props<{ fundId: number }>(),
);

export const loadFundLibrarySuccess = createAction(
    '[Asnb/API] Load Fund Library Success',
    props<{ payload: any }>(),
);

export const loadFundLibraryFailure = createAction(
    '[Asnb/API] Load Fund Library Failure',
    props<{ error: any }>(),
);

export const loadUrlList = createAction('[ASNB/API] Load URL List');

export const loadUrlListSuccess = createAction(
    '[ASNB/API] Load URL List Success',
    props<{ payload: UrlMaintenanceApiResponse[] }>(),
);

export const loadUrlListFailure = createAction(
    '[ASNB/API] Load URL List Failure',
    props<{ error: any }>(),
);

export const loadUrlDetails = createAction(
    '[ASNB/API] Load URL Details',
    props<{ urlCode: string }>(),
);

export const loadUrlDetailsSuccess = createAction(
    '[ASNB/API] Load URL Details Success',
    props<{ payload: UrlMaintenanceApiResponse }>(),
);

export const loadUrlDetailsFailure = createAction(
    '[ASNB/API] Load URL Details Failure',
    props<{ error: any }>(),
);
