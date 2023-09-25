import { createReducer, on } from '@ngrx/store';
import * as AsnbReportActions from './asnb-report.actions';
import {
    AsnbSearchFields,
    TransactionReportItem,
    SearchAccountLink,
    AsnbLinkAccountResponse,
    AsnbSearchFavourite,
    AsnbFavouriteResponse
} from '../../core/models/asnb.model';

export const asnbReportFeatureKey = 'asnbReport';

export interface State {
    transactionFilter: AsnbSearchFields;
    transactionList: TransactionReportItem[];
    status: string;
    hasSearched: boolean;
    linkAccountFilter: SearchAccountLink;
    linkAccountList: AsnbLinkAccountResponse[];
    linkAccountStatus: string;
    linkAccountHasSearched: boolean;
    favouriteFilter: AsnbSearchFavourite;
    favouriteList: AsnbFavouriteResponse[];
    favouriteStatus: string;
    favouriteHasSearched: boolean;
}

export const initialState: State = {
    transactionFilter: {},
    transactionList: [],
    status: 'pending',
    hasSearched: false,
    linkAccountFilter: {},
    linkAccountList: [],
    linkAccountStatus: 'pending',
    linkAccountHasSearched: false,
    favouriteFilter: {},
    favouriteList: [],
    favouriteStatus: 'pending',
    favouriteHasSearched: false,
};

export const reducer = createReducer(
    initialState,

    on(AsnbReportActions.loadTransactions, (state) => {
        return {
            ...state,
            status: 'loading',
            error: '',
        };
    }),

    on(AsnbReportActions.loadTransactionsSuccess, (state, action) => {
        return {
            ...state,
            status: 'success',
            transactionList: action.payload,
            transactionFilter: action.filter,
            hasSearched: true,
            error: '',
        };
    }),

    on(AsnbReportActions.loadTransactionsFailure, (state, action) => {
        return {
            ...state,
            status: 'error',
            error: action.error,
        };
    }),

    on(AsnbReportActions.clearTransactions, (state) => {
        return {
            ...state,
            hasSearched: false,
            transactionList: [],
        };
    }),

    on(AsnbReportActions.loadLinkAccount, (state) => {
        return {
            ...state,
            linkAccountStatus: 'loading',
            error: '',
        };
    }),

    on(AsnbReportActions.loadLinkAccountSuccess, (state, action) => {
        return {
            ...state,
            status: 'success',
            linkAccountList: action.payload,
            linkAccountFilter: action.filter,
            linkAccountHasSearched: true,
            error: '',
        };
    }),

    on(AsnbReportActions.loadLinkAccountFailure, (state, action) => {
        return {
            ...state,
            linkAccountStatus: 'error',
            error: action.error,
        };
    }),

    on(AsnbReportActions.clearLinkAccount, (state) => {
        return {
            ...state,
            linkAccountHasSearched: false,
            linkAccountList: [],
        };
    }),

    on(AsnbReportActions.loadFavourite, (state) => {
        return {
            ...state,
            favouriteStatus: 'loading',
            error: '',
        };
    }),

    on(AsnbReportActions.loadFavouriteSuccess, (state, action) => {
        return {
            ...state,
            status: 'success',
            favouriteList: action.payload,
            favouriteFilter: action.filter,
            favouriteHasSearched: true,
            error: '',
        };
    }),

    on(AsnbReportActions.loadFavouriteFailure, (state, action) => {
        return {
            ...state,
            favouriteStatus: 'error',
            error: action.error,
        };
    }),

    on(AsnbReportActions.clearFavourite, (state) => {
        return {
            ...state,
            favouriteHasSearched: false,
            favouriteList: [],
        };
    }),
);
