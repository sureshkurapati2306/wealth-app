import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsnbDashboardComponent } from './components/asnb-dashboard/asnb-dashboard.component';
import { AsnbSubHeaderComponent } from './components/asnb-sub-header/asnb-sub-header.component';
import { AsnbInvestmentComponent } from './components/asnb-investment/asnb-investment.component';
import { AsnbFooterComponent } from './components/asnb-footer/asnb-footer.component';
import { AsnbTabDashboardComponent } from './components/asnb-tab-dashboard/asnb-tab-dashboard.component';
import {
    AsnbMembershipDropdownComponent,
    MobileDropdownComponent,
} from './components/asnb-membership-dropdown/asnb-membership-dropdown.component';
import { AsnbFundListComponent } from './components/asnb-fund-list/asnb-fund-list.component';
import { AsnbFundSectionComponent } from './components/asnb-fund-section/asnb-fund-section.component';
import { AsnbNoInvestmentComponent } from './components/asnb-no-investment/asnb-no-investment.component';
import { AsnbSourceOfFundWealthComponent } from './components/asnb-source-of-fund-wealth/asnb-source-of-fund-wealth.component';
import {
    CommonDropdownComponent,
    CommonMobileDropdownComponent,
} from './components/common-dropdown/common-dropdown.component';
import { AsnbProspectusSalesChargeComponent } from './components/asnb-prospectus-sales-charge/asnb-prospectus-sales-charge.component';
import { AsnbDelinkAccountComponent } from './components/asnb-delink-account/asnb-delink-account.component';
import { AsnbCheckoutComponent } from './components/asnb-checkout/asnb-checkout.component';
import { AsnbPurchaseRequestReceiptComponent } from './components/asnb-purchase-request-receipt/asnb-purchase-request-receipt.component';
import { AsnbAvailableFundsComponent } from './components/asnb-available-funds/asnb-available-funds.component';
import { AsnbAddFavouriteComponent } from './components/asnb-add-favourite/asnb-add-favourite.component';
import { AsnbFavouritePurchaseComponent } from './components/asnb-favourite-purchase/asnb-favourite-purchase.component';
import { AsnbAddFavouriteSummaryComponent } from './components/asnb-add-favourite-summary/asnb-add-favourite-summary.component';
import { AsnbReviewAddFavouriteComponent } from './components/asnb-review-add-favourite/asnb-review-add-favourite.component';
import { AsnbCardAccountDetailsComponent } from './components/asnb-card-account-details/asnb-card-account-details.component';
import { AsnbDowntimeMaintenanceComponent } from './components/asnb-downtime-maintenance/asnb-downtime-maintenance.component';

const routes: Routes = [
    { path: '', component: AsnbDashboardComponent },
    { path: 'asnb-checkout', component: AsnbCheckoutComponent },
    { path: 'purchase-summary', component: AsnbPurchaseRequestReceiptComponent },
    { path: 'asnb-available-funds', component: AsnbAvailableFundsComponent },
    { path: 'asnb-add-favourite', component: AsnbAddFavouriteComponent },
    { path: 'asnb-favourite-purchase', component: AsnbFavouritePurchaseComponent },
    { path: 'review-favourite', component: AsnbReviewAddFavouriteComponent },
    { path: 'add-favourite-summary', component: AsnbAddFavouriteSummaryComponent },
    { path: 'scheduled-maintenance', component: AsnbDowntimeMaintenanceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AsnbRoutingModule {}

export const ASNB_COMPONENTS = [
    AsnbDashboardComponent,
    AsnbSubHeaderComponent,
    AsnbInvestmentComponent,
    AsnbFooterComponent,
    AsnbTabDashboardComponent,
    AsnbMembershipDropdownComponent,
    MobileDropdownComponent,
    AsnbFundListComponent,
    AsnbFundSectionComponent,
    AsnbNoInvestmentComponent,
    AsnbSourceOfFundWealthComponent,
    CommonDropdownComponent,
    CommonMobileDropdownComponent,
    AsnbProspectusSalesChargeComponent,
    AsnbCheckoutComponent,
    AsnbPurchaseRequestReceiptComponent,
    AsnbDelinkAccountComponent,
    AsnbAvailableFundsComponent,
    AsnbFavouritePurchaseComponent,
    AsnbReviewAddFavouriteComponent,
    AsnbCardAccountDetailsComponent,
    AsnbDowntimeMaintenanceComponent,
];
