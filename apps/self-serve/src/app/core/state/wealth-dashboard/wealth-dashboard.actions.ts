import {
    AccountSummary,
    AccountSummaryRequest,
    ASNBWhiteList,
    RiskProfile,
    RiskProfileRequest,
    Setting,
    UtAccount,
} from '@cimb/shared/models';
import { createAction, props } from '@ngrx/store';
import { AsnbApiResponse, ScheduledMaintenance } from '../../../modules/asnb/models';

export const loadAccountSummary = createAction(
    '[API] Load Account Summary',
    props<{ data: AccountSummaryRequest }>(),
);

export const loadAccountSummarySuccess = createAction(
    '[API] Load Account Summary Success',
    props<{ data: AccountSummary }>(),
);

export const loadAccountSummaryFailure = createAction(
    '[API] Load Account Summary Failure',
    props<{ error: string }>(),
);

export const riskProfileEnquiry = createAction(
    '[API] Load Risk Profile Enquiry Data',
    props<{ data: RiskProfileRequest }>(),
);

export const riskProfileEnquirySuccess = createAction(
    '[API] Load Risk Profile Enquiry Success',
    props<{ data: RiskProfile }>(),
);

export const riskProfileEnquiryFailure = createAction(
    '[API] Load Risk Profile Enquiry Failure',
    props<{ error: string }>(),
);

export const settingsData = createAction('[API] Load Settings Data');

export const settingsDataSuccess = createAction(
    '[API] Load Settings Data Success',
    props<{ data: Setting[] }>(),
);

export const settingsDataFailure = createAction(
    '[API] Load Settings Data Failure',
    props<{ error: string }>(),
);

export const storeUtAccount = createAction(
    '[Wealth Dashboard Update] Store Ut Account',
    props<{ data: UtAccount[] }>(),
);

export const storeCasaIndicator = createAction(
    '[Wealth Dashboard Update] Store CASA Indicator',
    props<{ data: string }>(),
);

export const asnbWhiteListEnquiry = createAction('[API] Load Asnb White List Enquiry Data');

export const asnbWhiteListEnquirySuccess = createAction(
    '[API] Load Asnb White List Enquiry Success',
    props<{ data: ASNBWhiteList }>(),
);

export const asnbWhiteListEnquiryFailure = createAction(
    '[API] Load Asnb White List Enquiry Failure',
    props<{ error: string }>(),
);

export const asnbLinkAccountEnquiry = createAction('[API] Load Asnb Link Account Enquiry Data');

export const asnbLinkAccountEnquirySuccess = createAction(
    '[API] Load Asnb Link Account Enquiry Success',
    props<{
        data: {
            accountExist: boolean;
        };
    }>(),
);

export const asnbLinkAccountEnquiryFailure = createAction(
    '[API] Load Asnb Link Account Enquiry Failure',
);

export const loadAsnbUserAccountStatus = createAction('[Asnb/API] Load Asnb User Account Status');

export const loadAsnbUserAccountStatusSuccess = createAction(
    '[Asnb/API] Load Asnb User Account Status Success',
    props<{ payload: AsnbApiResponse }>(),
);

export const loadAsnbUserAccountStatusFailure = createAction(
    '[Asnb/API] Load Asnb User Account Status Failure',
    props<{ error: any }>(),
);

export const updateLastUpdateTime = createAction(
    '[API] Update ASNB Last Update Time',
    props<{ timestamp: string }>(),
);


export const resetAsnbAccountAfterDelink = createAction('[ASNB Listing] Reset Account List State');


//Scheduled Maintenance
export const WDLoadScheduledMaintenance = createAction('[ASNBFund/list] Wealth Dashboard Load Scheduled Maintenance');

export const WDLoadScheduledMaintenanceSuccess = createAction(
    '[ASNBFund/list]  Wealth Dashboard Load Scheduled Maintenance Success',
    props<{ payload: ScheduledMaintenance }>(),
);

export const WDLoadScheduledMaintenanceFailure = createAction(
    '[ASNBFund/list]  Wealth Dashboard Load Scheduled Maintenance Failure',
    props<{ error: any }>(),
);
