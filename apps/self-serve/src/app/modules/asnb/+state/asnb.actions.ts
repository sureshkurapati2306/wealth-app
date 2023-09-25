import { createAction, props } from '@ngrx/store';
import { BankAccount } from '../../../core/model/customerDetail.model';
import {
    AsnbCheckout,
    AsnbCreateSubscriptionRequest,
    AsnbMember,
    AsnbRiskStatusApiResponse,
    AsnbSofSow,
    AsnbTransactionLimit,
    CartAccountDetails,
    CartPurchaseSummary,
    CartSource,
    ScheduledMaintenance,
    OperationHourResponse,
    AsnbIdType,
    AsnbRelationship,
    CommonDropDown,
    AsnbFavourite,
    AsnbAddFavourite,
    AsnbEligibleFunds,
    AsnbCashTransactionRequest,
} from '../models';
import { AsnbEntity } from './asnb.models';

export const init = createAction('[Asnb Page] Init');

export const loadAsnbSuccess = createAction(
    '[Asnb/API] Load Asnb Success',
    props<{ asnb: AsnbEntity[] }>(),
);

export const loadAsnbFailure = createAction(
    '[Asnb/API] Load Asnb Failure',
    props<{ error: any }>(),
);

export const loadCheckoutBankAccount = createAction('[Asnb/API] Load Asnb Bank Account');

export const loadCheckoutOTPFailure = createAction(
    '[Asnb/API] Load Asnb OTP Failure',
    props<{ otpError: any }>(),
);

export const loadCheckoutBankAccountSuccess = createAction(
    '[Asnb/API] Load Asnb Bank Account Success',
    props<{ checkoutBankAccount: Partial<BankAccount>[] }>(),
);

export const loadCheckoutBankAccountFailure = createAction(
    '[Asnb/API] Load Bank Account  Failure',
    props<{ error: any }>(),
);

//Cart Purchase Summary
export const loadCheckoutPurchaseSummary = createAction(
    '[Asnb/API] Load Asnb Cart Purchase Summary',
);

export const loadCheckoutPurchaseSummarySuccess = createAction(
    '[Asnb/API] Load Asnb Cart Purchase Summary Success',
    props<{ checkoutPurchaseSummary: CartPurchaseSummary }>(),
);

export const loadCheckoutPurchaseSummaryFailure = createAction(
    '[Asnb/API] Load Asnb Cart Purchase Summary Failure',
    props<{ error: any }>(),
);

//account details
export const loadCheckoutAccountDetails = createAction('[Asnb/API] Load Asnb Cart Account Details');

export const loadCheckoutAccountDetailsSuccess = createAction(
    '[Asnb/API] Load Asnb Cart Account Details Success',
    props<{ checkoutUserData: CartAccountDetails }>(),
);

export const loadCheckoutAccountDetailsFailure = createAction(
    '[Asnb/API] Load Asnb Cart Account Details Failure',
    props<{ error: any }>(),
);

//Source details
export const loadCheckoutSource = createAction('[Asnb/API] Load Asnb Cart Source Details');

export const loadCheckoutSourceSuccess = createAction(
    '[Asnb/API] Load Asnb Cart Source Details Success',
    props<{ checkoutSOWSOF: CartSource }>(),
);

export const loadCheckoutSourceFailure = createAction(
    '[Asnb/API] Load Asnb Cart Source Details Failure',
    props<{ error: any }>(),
);

//cash transaction
export const loadPastTransaction = createAction(
    '[Asnb/API] Load Asnb Past Transaction',
    props<{ options: AsnbCashTransactionRequest }>(),
);

export const loadPastTransactionSuccess = createAction(
    '[Asnb/API] Load Asnb Past Transaction Success',
    props<{ payload: any }>(),
);

export const loadPastTransactionFailure = createAction(
    '[Asnb/API] Load Asnb Past Transaction Failure',
    props<{ error: any }>(),
);
export const asnbTopUp = createAction(
    '[Asnb/API] Asnb Top Up',
    props<{ fundName: string; amount: number; fundId: string }>(),
);

export const loadSofSowList = createAction('[Asnb/API] Load Asnb SOF and SOW List');

export const loadSofSowListSuccess = createAction(
    '[Asnb/API] Load Asnb SOF and SOW List Success',
    props<{ payload: AsnbSofSow[] }>(),
);

export const loadSofSowListFailure = createAction(
    '[Asnb/API] Load Asnb SOF and SOW List Failure',
    props<{ error: any }>(),
);

export const loadAsnbFundDetails = createAction(
    '[ASNBFund/list] Load ASNB Fund Details',
    props<{ options: any }>(),
);

export const loadAsnbFundDetailsSuccess = createAction(
    '[ASNBFund/list] Load ASNB Fund Details Success',
    props<{ payload: any }>(),
);

export const loadAsnbMinorFundDetails = createAction(
    '[ASNBFund/list] Load ASNB Minor Fund Details',
    props<{ options: any }>(),
);

export const loadAsnbMinorFundDetailsSuccess = createAction(
    '[ASNBFund/list] Load ASNB Minor Fund Details Success',
    props<{ payload: any }>(),
);

export const loadAsnbFundDetailsFailure = createAction(
    '[ASNBFund/list] Load ASNB Fund Details Failure',
    props<{ error: any }>(),
);

export const loadUserRiskStatus = createAction('[ASNBFund/list] Load User Risk Status');

export const loadUserRiskStatusSuccess = createAction(
    '[ASNBFund/list] Load User Risk Status Success',
    props<{ payload: AsnbRiskStatusApiResponse }>(),
);

export const loadUserRiskStatusFailure = createAction(
    '[ASNBFund/list] Load User Risk Status Failure',
    props<{ error: any }>(),
);

//action to update checkout state
export const updateCheckoutState = createAction(
    '[ASNBFund/list] Update Checkout State',
    props<{ payload: AsnbCheckout }>(),
);

//actions for create order api
export const createOrder = createAction(
    '[ASNBFund/list] Create Order',
    props<{ payload: AsnbCheckout }>(),
);

export const createOrderSuccess = createAction(
    '[ASNBFund/list] Create Order Success',
    props<{ payload: AsnbCheckout }>(),
);

export const createOrderFailure = createAction(
    '[ASNBFund/list] Create Order Failure',
    props<{ error: any }>(),
);

//actions for subscription
export const createSubscription = createAction(
    '[ASNBFund/list] Create Subscription',
    props<{ payload: AsnbCreateSubscriptionRequest }>(),
);

export const createSubscriptionSuccess = createAction(
    '[ASNBFund/list] Create Subscription Success',
    props<{ payload: AsnbCheckout }>(),
);

export const createSubscriptionFailure = createAction(
    '[ASNBFund/list] Create Subscription Failure',
    props<{ error: any }>(),
);

export const clearCheckoutState = createAction('[ASNBFund/list] Clear Checkout State');

export const loadTransactionLimit = createAction('[ASNBFund/list] Load Transaction Limit');

export const loadTransactionLimitSuccess = createAction(
    '[ASNBFund/list] Load Transaction Limit Success',
    props<{ payload: AsnbTransactionLimit }>(),
);

export const loadTransactionLimitFailure = createAction(
    '[ASNBFund/list] Load Transaction Limit Failure',
    props<{ error: any }>(),
);

export const fetchDashboardInfoOwnAccount = createAction(
    '[ASNBFund/list] Fetch Dashboard Info for Own Account',
);

export const fetchDashboardInfoMinorAccount = createAction(
    '[ASNBFund/list] Fetch Dashboard Info for Minor Account',
);

export const updateDashboardInfoOwnAccount = createAction(
    '[ASNBFund/list] Update Dashboard Info for Own Account',
);

export const updateDashboardInfoMinorAccount = createAction(
    '[ASNBFund/list] Update Dashboard Info for Minor Account',
);

export const updateDashboardInfoFavouriteList = createAction(
    '[ASNBFavourite/list] Update Dashboard Info for Favourite List',
);

export const fetchDashboardInfoSuccess = createAction(
    '[ASNBFund/list] Fetch Dashboard Info Success',
);

//Scheduled Maintenance
export const loadScheduledMaintenance = createAction('[ASNBFund/list] Load Scheduled Maintenance');

export const loadScheduledMaintenanceSuccess = createAction(
    '[ASNBFund/list] Load Scheduled Maintenance Success',
    props<{ payload: ScheduledMaintenance }>(),
);

export const loadScheduledMaintenanceFailure = createAction(
    '[ASNBFund/list] Load Scheduled Maintenance Failure',
    props<{ error: any }>(),
);

export const updateSelectedMember = createAction(
    '[ASNBFund/list] Update Selected Member',
    props<{ payload: AsnbMember }>(),
);

//Eligible Funds
export const loadEligibleFunds = createAction(
    '[ASNBFund/list] Load Eligible Funds',
    props<{ payload: any }>(),
);

export const loadEligibleFundsSuccess = createAction(
    '[ASNBFund/list] Load Eligible Funds Success',
    props<{ payload: AsnbEligibleFunds }>(),
);

export const loadEligibleFundsFailure = createAction(
    '[ASNBFund/list] Load Eligible Funds Failure',
    props<{ error: any }>(),
);

export const loadOperationHourDetails = createAction('[ASNB/API] Load Operation Hour Details');

export const loadOperationHourDetailsSuccess = createAction(
    '[ASNB/API] Load Operation Hour Details Success',
    props<{ payload: OperationHourResponse }>(),
);

export const loadOperationHourDetailsFailure = createAction(
    '[ASNB/API] Load Operation Hour Details Failure',
    props<{ error: any }>(),
);

export const loadExternalUrlList = createAction('[ASNB/API] Load External URL List');

export const loadExternalUrlListSuccess = createAction(
    '[ASNB/API] Load External URL List Success',
    props<{ payload: Record<string, string> }>(),
);

export const loadExternalUrlListFailure = createAction(
    '[ASNB/API] Load External URL List Failure',
    props<{ error: any }>(),
);

export const loadIdTypeList = createAction('[ASNB/API] Load ID Type List');

export const loadIdTypeListSuccess = createAction(
    '[ASNB/API] Load ID Type List Success',
    props<{ payload: AsnbIdType[] }>(),
);

export const loadIdTypeListFailure = createAction(
    '[ASNB/API] Load ID Type List Failure',
    props<{ error: any }>(),
);

export const loadRelationshipList = createAction('[ASNB/API] Load Relationship List');

export const loadRelationshipListSuccess = createAction(
    '[ASNB/API] Load Relationship List Success',
    props<{ payload: AsnbRelationship[] }>(),
);

export const loadRelationshipListFailure = createAction(
    '[ASNB/API] Load Relationship List Failure',
    props<{ error: any }>(),
);

export const updateAddFavouriteState = createAction(
    '[ASNB/Favourite] Update Add Favourite State',
    props<{ payload: AsnbAddFavourite }>(),
);

export const clearAddFavouriteState = createAction('[ASNB/Favourite] Clear Add Favourite State');

export const loadTransferReasonList = createAction('[Asnb/API] Load Asnb Transfer Reason List');

export const loadTransferReasonListSuccess = createAction(
    '[Asnb/API] Load Asnb Transfer Reason List Success',
    props<{ payload: CommonDropDown[] }>(),
);

export const loadTransferReasonListFailure = createAction(
    '[Asnb/API] Load Asnb Transfer Reason List Failure',
    props<{ error: any }>(),
);

export const asnbFavouritePurchase = createAction(
    '[Asnb/Favourite] Asnb Favourite Purchase',
    props<{ payload: AsnbFavourite }>(),
);

export const clearAsnbFavouritePurchase = createAction(
    '[Asnb/Favourite] Asnb Clear Favourite Purchase',
);

export const loadFavouriteListSuccess = createAction('[Asnb/API] Load Favourite List Success');
