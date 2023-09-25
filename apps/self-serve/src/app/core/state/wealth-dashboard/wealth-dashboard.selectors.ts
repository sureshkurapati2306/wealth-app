import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWealthDashboard from './wealth-dashboard.reducer';

export const selectWealthDashboardState = createFeatureSelector<fromWealthDashboard.State>(
    fromWealthDashboard.wealthDashboardFeatureKey,
);

export const selectAccountSummary = createSelector(selectWealthDashboardState, (state) => {
    return state.accountSummary;
});

export const selectRiskProfileEnquiry = createSelector(selectWealthDashboardState, (state) => {
    return state.riskProfile;
});

export const selectLoadingState = createSelector(selectWealthDashboardState, (state) => {
    return state.status;
});

export const selectLastUpdatedDate = createSelector(selectWealthDashboardState, (state) => {
    return state?.accountSummary?.lastUpdated;
});

export const selectASNBAssetSummary = createSelector(selectWealthDashboardState, (state) => {
    return state?.accountSummary?.assetLiabilities.filter(
        (item) => item.alDesc === 'Amanah Saham Nasional Berhad',
    );
});

export const settingsDataSuccess = createSelector(selectWealthDashboardState, (state) => {
    return state.settings;
});

export const selectAccSummaryAndRiskProfileStatusCalled = createSelector(
    selectWealthDashboardState,
    (state) => {
        return state.compositeAccSummaryCalled && state.riskprofileEnquiryCalled;
    },
);

export const selectUtAccountAndCasaIndicator = createSelector(
    selectWealthDashboardState,
    (state) => {
        return {
            accounts: state.utAccount,
            casaIndicator: state.casaIndicator,
        };
    },
);

export const selectIsASNBWhitelisted = createSelector(selectWealthDashboardState, (state) => {
    return state.asnbWhiteListed;
});

export const selectIsASNBAccountLinked = createSelector(selectWealthDashboardState, (state) => {
    return state.asnbAccountExist;
});

export const getASNBUserAccountStatus = createSelector(selectWealthDashboardState, (state) => {
    return state.userAccountStatus;
});

export const getASNBDowntimeScheduledMaintenance = createSelector(
    selectWealthDashboardState,
    (state) => {
        if (state) {
            return state.ASNBDowntimeScheduledMaintenance;
        }
    },
);
