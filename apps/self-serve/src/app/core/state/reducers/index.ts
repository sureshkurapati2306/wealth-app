import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as DashbordReducer from '../dashbord/dashboard.reducer';
import * as CartReducer from '../cart/cart.reducer';
import * as UserReducer from '../user/user.reducer';
import * as AuthReducer from '../auth/auth.reducer';
import * as AvailableFundsReducer from '../availableFunds/availableFunds.reducer';
import * as LogoutReducer from '../logout/logout.reducer';
import * as AccountOpeningReducer from '../account-opening/account.reducer';
import * as ErrorReducer from '../error/error.reducer';
import * as clicksReducer from '../clicks/clicks.reducer';
import * as clickState from '../clicks/clicks.state';
import * as CifInquiryReducer from '../cifInquiry/cifInquiry.reducer';
import * as LandingPageReducer from '../landing-page/landing-page.reducer'
import * as DialogPopupReducer from '../../../layouts/dashboard-layout/dialog-popup/+state/dialog-popup.reducer'

export const storeFeatureKey = 'store';

export interface AppState {
    dashbordReducers: DashbordReducer.Store;
    cartReducer: CartReducer.Store;
    userReducer: UserReducer.Store;
    authReducer: AuthReducer.Store;
    availableFundsReducer: AvailableFundsReducer.Store;
    accountOpeningReducer: AccountOpeningReducer.Store;
    logoutReducer: LogoutReducer.Store;
    errorReducer: ErrorReducer.Store;
    clicks: clickState.ClicksState;
    cifInquiryReducer: CifInquiryReducer.Store;
    landingPageReducer: LandingPageReducer.State;
    DialogPopupReducer: DialogPopupReducer.DialogPopupState
}

export const appReducer: ActionReducerMap<AppState> = {
    dashbordReducers: DashbordReducer.dashbordReducer,
    cartReducer: CartReducer.cartReducer,
    userReducer: UserReducer.userReducer,
    authReducer: AuthReducer.authReducer,
    availableFundsReducer: AvailableFundsReducer.availableFundsReducer,
    accountOpeningReducer: AccountOpeningReducer.accountOpeningReducer,
    logoutReducer: LogoutReducer.logoutReducer,
    errorReducer: ErrorReducer.errorReducer,
    clicks: clicksReducer.reducer,
    cifInquiryReducer: CifInquiryReducer.cifInquiryReducer,
    landingPageReducer: LandingPageReducer.reducer,
    DialogPopupReducer: DialogPopupReducer.dialogPopupReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
