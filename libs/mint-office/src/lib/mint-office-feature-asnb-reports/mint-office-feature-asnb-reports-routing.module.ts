import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureAsnbReportsComponent } from './mint-office-feature-asnb-reports.component';
import { TableHeaderPanelComponent } from './table-header-panel/table-header-panel.component';
import { MintOfficeUiNoSearchResultComponent } from '../mint-office-ui-no-search-result/mint-office-ui-no-search-result.component';
import { MintOfficeUiNoResultComponent } from '../mint-office-ui-no-result/mint-office-ui-no-result.component';
import { TransactionsFilterComponent } from './transactions-tab/transactions-filter/transactions-filter.component';
import { TransactionsTableComponent } from './transactions-tab/transactions-table/transactions-table.component';
import { LinkAccountFilterComponent } from './link-account-tab/link-account-filter/link-account-filter.component';
import { LinkAccountTableComponent } from './link-account-tab/link-account-table/link-account-table.component';
import { FavouriteFilterComponent } from './favourite-tab/favourite-filter/favourite-filter.component';
import { FavouriteTableComponent } from './favourite-tab/favourite-table/favourite-table.component';


const routes: Routes = [{ path: '', component: MintOfficeFeatureAsnbReportsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MintOfficeFeatureAsnbReportsRoutingModule {}

export const BACK_OFFICE_COMPONENTS = [
    MintOfficeFeatureAsnbReportsComponent,
    TransactionsFilterComponent,
    TransactionsTableComponent,
    MintOfficeUiNoSearchResultComponent,
    MintOfficeUiNoResultComponent,
    LinkAccountFilterComponent,
    LinkAccountTableComponent,
    TableHeaderPanelComponent,
    FavouriteFilterComponent,
    FavouriteTableComponent,
];
