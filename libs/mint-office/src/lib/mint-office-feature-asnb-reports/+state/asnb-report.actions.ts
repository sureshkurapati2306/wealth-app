import { createAction, props } from '@ngrx/store';
import { 
    AsnbSearchFields,
    AsnbSearchLinkAccount,
    AsnbSearchFavourite
} from '../../core/models/asnb.model';

export const loadTransactions = createAction(
    '[Asnb/API] Load Transaction List',
    props<{ payload: AsnbSearchFields }>(),
);

export const loadTransactionsSuccess = createAction(
    '[Asnb/API] Load Transaction List Success',
    props<{ payload: any; filter: AsnbSearchFields }>(),
);

export const loadTransactionsFailure = createAction(
    '[Asnb/API] Load Transaction List Failure',
    props<{ error: any }>(),
);

export const clearTransactions = createAction('[Asnb/API] Clear Transaction List');

export const loadLinkAccount = createAction(
    '[Asnb/API] Load Link Account List',
    props<{ payload: AsnbSearchLinkAccount }>(),
);

export const loadLinkAccountSuccess = createAction(
    '[Asnb/API] Load Link Account List Success',
    props<{ payload: any; filter: AsnbSearchLinkAccount }>(),
);

export const loadLinkAccountFailure = createAction(
    '[Asnb/API] Load Link Account List Failure',
    props<{ error: any }>(),
);

export const clearLinkAccount = createAction('[Asnb/API] Clear Link Account List');

export const loadFavourite = createAction(
    '[Asnb/API] Load Favourite List',
    props<{ payload: AsnbSearchFavourite }>(),
);

export const loadFavouriteSuccess = createAction(
    '[Asnb/API] Load Favourite List Success',
    props<{ payload: any; filter: AsnbSearchFavourite }>(),
);

export const loadFavouriteFailure = createAction(
    '[Asnb/API] Load Favourite List Failure',
    props<{ error: any }>(),
);

export const clearFavourite = createAction('[Asnb/API] Clear Favourite List');
