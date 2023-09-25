import { createReducer, on } from '@ngrx/store';
import * as AsnbSettingsActions from './asnb-settings.actions';
import { FundLibraryTable, UrlMaintenanceTable } from '../../core/models/asnb.model';
export const asnbSettingsFeatureKey = 'asnbSettings';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {
    /**Logic here */
    fundTypesMap: any;
    fundSuspensById: any;
    fundSuspensIds: number[];
    operationHours: any;
    fundLibraryList: FundLibraryTable[];
    fundLibrary: FundLibraryTable | null;
    urlList: UrlMaintenanceTable[];
    selectedUrl: UrlMaintenanceTable | null;
    status: 'pending' | 'loading' | 'success' | 'error'; // Series of states for the state
    error?: string; // For any error messages,
}

export const initialState: State = {
    /**Logic here */
    fundTypesMap: null,
    fundSuspensById: null,
    operationHours: {},
    fundSuspensIds: [],
    fundLibraryList: [],
    fundLibrary: null,
    urlList: [],
    selectedUrl: null,
    status: 'pending',
};

const setLoadingState = (state: State): State => {
    return {
        ...state,
        status: 'loading',
        error: '',
    };
};

const setErrorState = <T extends { error: string }>(state: State, action: T): State => {
    return {
        ...state,
        status: 'error',
        error: action.error,
    };
};

export const reducer = createReducer(
    initialState,
    on(AsnbSettingsActions.loadFundSuspensionList, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadFundSuspensionListSuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            ...(action.payload?.lookupRes && {
                fundTypesMap: action.payload?.lookupRes.reduce((obj, item) => {
                    return { ...obj, [item.fundCode]: item };
                }, {}),
            }),
            fundSuspensById: action.payload?.fundSuspensionRes?.reduce(
                (obj: any, item: { fsId: number }) => {
                    return {
                        ...obj,
                        [item.fsId]: item,
                    };
                },
                {},
            ),
            fundSuspensIds: action.payload?.fundSuspensionRes?.map(
                (item: { fsId: number }) => item.fsId,
            ),
            error: '',
        };
    }),

    on(AsnbSettingsActions.loadFundSuspensionListFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(AsnbSettingsActions.loadOperationHours, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadOperationHoursSuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            operationHours: action.payload,
            error: '',
        };
    }),

    on(AsnbSettingsActions.loadOperationHoursFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(AsnbSettingsActions.loadFundLibraryList, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadFundLibraryListSuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            fundLibraryList: action.payload,
            error: '',
        };
    }),

    on(AsnbSettingsActions.loadFundLibraryListFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(AsnbSettingsActions.loadFundLibrary, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadFundLibrarySuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            fundLibrary: action.payload,
            error: '',
        };
    }),

    on(AsnbSettingsActions.loadFundLibraryFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(AsnbSettingsActions.loadUrlList, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadUrlListSuccess, (state, action): State => {
        const urlList = action.payload.map<UrlMaintenanceTable>((item) => ({
            id: item.urlId,
            shortCode: item.urlCode,
            label: item.urlTitle,
            link: item.urlDesc,
        }));
        return { ...state, status: 'success', error: '', urlList };
    }),

    on(AsnbSettingsActions.loadUrlListFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(AsnbSettingsActions.loadUrlDetails, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbSettingsActions.loadUrlDetailsSuccess, (state, action): State => {
        const { urlId, urlCode, urlTitle, urlDesc } = action.payload;
        const selectedUrl: UrlMaintenanceTable = {
            id: urlId,
            shortCode: urlCode,
            label: urlTitle,
            link: urlDesc,
        };
        return { ...state, status: 'success', error: '', selectedUrl };
    }),

    on(AsnbSettingsActions.loadUrlDetailsFailure, (state, action): State => {
        return { ...state, status: 'error', selectedUrl: null, error: action.error };
    }),
);
